from flask import Blueprint
from app.controllers.leave_controller import apply_leave, get_my_leaves, get_all_leaves, update_leave_status
from app.middleware.auth_middleware import token_required

leave_bp = Blueprint('leave_bp', __name__)

@leave_bp.route('/apply', methods=['POST'])
@token_required
def handle_apply_leave():
    return apply_leave()

@leave_bp.route('/my', methods=['GET'])
@token_required
def handle_get_my_leaves():
    return get_my_leaves()

@leave_bp.route('/all', methods=['GET'])
@token_required
def handle_get_all_leaves():
    return get_all_leaves()

@leave_bp.route('/<int:leave_id>/status', methods=['PUT'])
@token_required
def handle_update_leave_status(leave_id):
    return update_leave_status(leave_id)
