import bcrypt
from flask_sqlalchemy import SQLAlchemy

# Initialize db instance (to be bound to Flask app during startup)
db = SQLAlchemy()

class User(db.Model):
    """
    User DB Model mapping to the existing MySQL 'users' table.
    
    If the table already exists, SQLAlchemy maps directly to the columns defined.
    If database migrations exist, this table name should match.
    """
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.String(20), unique=True, nullable=True, index=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='Employee')
    department = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    join_date = db.Column(db.Date, nullable=True)
    
    def set_password(self, plaintext_password):
        """
        Hashes password using bcrypt.
        """
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(plaintext_password.encode('utf-8'), salt)
        self.password = hashed.decode('utf-8')
        
    def check_password(self, plaintext_password):
        """
        Verifies plaintext password against hashed password.
        """
        try:
            return bcrypt.checkpw(
                plaintext_password.encode('utf-8'), 
                self.password.encode('utf-8')
            )
        except Exception:
            return False
            
    def to_dict(self):
        """
        Serializes user to dictionary (excluding password for security).
        """
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "department": self.department,
            "is_active": self.is_active,
            "join_date": self.join_date.isoformat() if self.join_date else None
        }
