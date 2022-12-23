from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    bio = db.Column(db.String(400))
    profile_img = db.Column(db.String)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    user_organization = relationship("Organization", back_populates="organization_user")
    user_cm = relationship("ChannelMessage", back_populates="cm_user", cascade="all, delete")
    user_dmMessage = relationship("DmMessage", back_populates="dmMessage_user", cascade="all, delete")
    user_image = relationship("Image", back_populates="image_user", cascade="all, delete")

    # Methods
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'bio': self.bio,
            'profile_img': self.profile_img
        }
