from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.models.user import db
from app.routes.auth_routes import auth_bp
from app.routes.leave_routes import leave_bp

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

def create_app(config_class=Config):
    """
    Application factory to create and configure the Flask app.
    """
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Configure CORS (allow React frontend port 5173 by default)
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGIN']}}, supports_credentials=True)
    
    # Initialize Limiter
    limiter = Limiter(
        get_remote_address,
        app=app,
        default_limits=["1000 per day", "200 per hour"],
        storage_uri="memory://"
    )
    
    # Initialize extensions
    db.init_app(app)
    
    # Apply specific limits to auth blueprint to prevent spam/DDoS
    limiter.limit("10 per minute")(auth_bp)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # Public health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({
            "success": True,
            "message": "HRMS Python Flask backend is running.",
            "status": "healthy",
            "db_uri": app.config['SQLALCHEMY_DATABASE_URI'].split('@')[-1] if '@' in app.config['SQLALCHEMY_DATABASE_URI'] else "SQLite"
        }), 200
        
    # Global HTTP error handlers to ensure JSON responses are returned
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "message": "Route not found."
        }), 404
        
    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "success": False,
            "message": "Method not allowed on this route."
        }), 405
        
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "success": False,
            "message": "An internal server error occurred."
        }), 500
        
    # Optional setup logic for SQLite dev mode only
    # Ensures developers can run and verify the auth module locally without manual schema creation
    if app.config['SQLALCHEMY_DATABASE_URI'].startswith('sqlite'):
        with app.app_context():
            from app.models.user import User
            from app.models.leave import LeaveRequest
            db.create_all()
            # Seed default admin user if database is completely empty
            if User.query.count() == 0:
                admin_user = User(
                    name="Ankita Sharma",
                    email="admin@hrms.com",
                    role="Admin",
                    department="Human Resources",
                    is_active=True
                )
                admin_user.set_password("admin123")
                db.session.add(admin_user)
                
                hr_user = User(
                    name="Rahul Verma",
                    email="hr@hrms.com",
                    role="HR",
                    department="Human Resources",
                    is_active=True
                )
                hr_user.set_password("admin123")
                db.session.add(hr_user)
                
                db.session.commit()
                print("[HRMS Dev Setup] Temporary SQLite database initialized and seeded with demo credentials (admin@hrms.com / hr@hrms.com).")
                
    return app
