from flask import jsonify, request, g
from app.models.leave import LeaveRequest
from app.models.user import db
from datetime import datetime

def apply_leave():
    try:
        user_id = g.user.id
        data = request.get_json()
        
        leave_type = data.get('leave_type')
        from_date_str = data.get('from_date')
        to_date_str = data.get('to_date')
        reason = data.get('reason')
        days = data.get('days')

        if not all([leave_type, from_date_str, to_date_str, reason, days]):
            return jsonify({"success": False, "error": "All fields are required"}), 400

        from_date = datetime.strptime(from_date_str, '%Y-%m-%d').date()
        to_date = datetime.strptime(to_date_str, '%Y-%m-%d').date()

        new_leave = LeaveRequest(
            employee_id=user_id,
            leave_type=leave_type,
            from_date=from_date,
            to_date=to_date,
            days=days,
            reason=reason,
            status='Pending'
        )

        db.session.add(new_leave)
        db.session.commit()

        return jsonify({"success": True, "message": "Leave application submitted successfully", "leave": new_leave.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

def get_my_leaves():
    try:
        user_id = g.user.id
        leaves = LeaveRequest.query.filter_by(employee_id=user_id).order_by(LeaveRequest.applied_on.desc()).all()
        return jsonify({"success": True, "leaves": [l.to_dict() for l in leaves]}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

def get_all_leaves():
    try:
        leaves = LeaveRequest.query.order_by(LeaveRequest.applied_on.desc()).all()
        return jsonify({"success": True, "leaves": [l.to_dict() for l in leaves]}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

def update_leave_status(leave_id):
    try:
        data = request.get_json()
        status = data.get('status')

        if status not in ['Approved', 'Rejected']:
            return jsonify({"success": False, "error": "Invalid status"}), 400

        leave = LeaveRequest.query.get(leave_id)
        if not leave:
            return jsonify({"success": False, "error": "Leave request not found"}), 404

        leave.status = status
        db.session.commit()

        return jsonify({"success": True, "message": f"Leave {status.lower()} successfully", "leave": leave.to_dict()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "error": str(e)}), 500

