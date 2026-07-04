import jwt
import datetime
import random
from flask import request, g, current_app
from sqlalchemy import or_
from app.models.user import User, db
from app.utils.validators import validate_login_input, sanitize_email
from app.utils.response import send_success, send_error
from app.middleware.auth_middleware import TOKEN_BLACKLIST

def login():
    """
    Handles user login.
    POST /api/auth/login
    """
    try:
        data = request.get_json()
        
        # ── Step 1: Input Validation ─────────────────────────────
        validation_errors = validate_login_input(data)
        if validation_errors:
            return send_error("Validation failed.", errors=validation_errors, status_code=400)
            
        email = sanitize_email(data.get("email"))
        password = data.get("password")
        
        # ── Step 2: Fetch User from DB ───────────────────────────
        user = User.query.filter(or_(User.email == email, User.employee_id == email)).first()
        if not user:
            return send_error("Invalid email or password.", status_code=401)
            
        # ── Step 3: Check Account Status ─────────────────────────
        if not user.is_active:
            return send_error("Your account has been deactivated. Please contact your admin.", status_code=403)
            
        # ── Step 4: Verify Password ──────────────────────────────
        if not user.check_password(password):
            return send_error("Invalid email or password.", status_code=401)
            
        # ── Step 5: Generate JWT Token ───────────────────────────
        expires_in = current_app.config['JWT_EXPIRES_IN_HOURS']
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=expires_in)
        
        payload = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "name": user.name,
            "exp": expiration_time
        }
        
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm="HS256")
        
        # ── Step 6: Return Response ──────────────────────────────
        response_data = {
            "token": token,
            "expiresIn": f"{expires_in}h",
            "user": user.to_dict()
        }
        
        return send_success("Login successful.", response_data)
        
    except Exception as e:
        return send_error(f"An unexpected error occurred during login: {str(e)}", status_code=500)

def get_profile():
    """
    Gets logged in user's profile.
    GET /api/auth/profile
    """
    try:
        # User is already attached by the token_required middleware
        return send_success("Profile retrieved successfully.", {"user": g.user.to_dict()})
    except Exception as e:
        return send_error(f"Error retrieving profile: {str(e)}", status_code=500)

def logout():
    """
    Invalidates the current session token by blacklisting it.
    POST /api/auth/logout
    """
    try:
        # Token is already attached by the token_required middleware
        token = getattr(g, 'token', None)
        if token:
            TOKEN_BLACKLIST.add(token)
            
        return send_success("Logout successful.")
    except Exception as e:
        return send_error(f"Error during logout: {str(e)}", status_code=500)

def register():
    """
    Handles user registration.
    POST /api/auth/register
    """
    try:
        data = request.get_json()
        email = sanitize_email(data.get("email"))
        password = data.get("password")
        role = data.get("role", "Employee")
        
        if not email or not password:
            return send_error("Email and password are required.", status_code=400)
            
        if User.query.filter_by(email=email).first():
            return send_error("Email already registered.", status_code=409)
            
        employee_id = None
        if role == "Employee":
            employee_id = f"EMP-{random.randint(1000, 9999)}"
            while User.query.filter_by(employee_id=employee_id).first():
                employee_id = f"EMP-{random.randint(1000, 9999)}"
                
        new_user = User(
            name=email.split('@')[0],
            email=email,
            role=role,
            employee_id=employee_id
        )
        new_user.set_password(password)
        
        db.session.add(new_user)
        db.session.commit()
        
        # Log them in automatically
        expires_in = current_app.config['JWT_EXPIRES_IN_HOURS']
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=expires_in)
        
        payload = {
            "id": new_user.id,
            "email": new_user.email,
            "role": new_user.role,
            "name": new_user.name,
            "exp": expiration_time
        }
        
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm="HS256")
        
        response_data = {
            "token": token,
            "expiresIn": f"{expires_in}h",
            "user": new_user.to_dict()
        }
        
        return send_success("Registration successful.", response_data)
        
    except Exception as e:
        db.session.rollback()
        return send_error(f"Error during registration: {str(e)}", status_code=500)
