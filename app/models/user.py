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

    #! Relationships
    user_organization = relationship(
        "User_Org_Association", back_populates="child")
    user_cm = relationship(
        "ChannelMessage", back_populates="cm_user", cascade="all, delete")
    user_dmMessage = relationship(
        "DmMessage", back_populates="dmMessage_user", cascade="all, delete")
    user_channel = relationship(
        "User_Channel_Association", back_populates="child")
    user_dmMessage_channel = relationship(
        "User_DmMessage_Channel", back_populates="child")
    owned_channels = relationship("Channel", back_populates="channel_owner")
    owned_dmMessage_channels = relationship("DmMessage_Channel", back_populates="dmMessage_channel_owner")

    #? Methods
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.user_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'bio': self.bio,
            'profile_img': self.profile_img,
            'user_organizations': [org.org_to_dict() for org in self.user_organization]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'username': self.user_name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'bio': self.bio,
            'profile_img': self.profile_img,
        }
