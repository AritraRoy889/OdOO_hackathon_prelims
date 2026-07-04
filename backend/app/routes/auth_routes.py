from flask import Blueprint
from app.controllers import auth_controller
from app.middleware.auth_middleware import token_required

# Create a blueprint for authentication routes
auth_bp = Blueprint('auth', __name__)

# Mount routes and bind to controller methods
auth_bp.route('/register', methods=['POST'])(auth_controller.register)
auth_bp.route('/login', methods=['POST'])(auth_controller.login)
auth_bp.route('/profile', methods=['GET'])(token_required(auth_controller.get_profile))
auth_bp.route('/logout', methods=['POST'])(token_required(auth_controller.logout))
