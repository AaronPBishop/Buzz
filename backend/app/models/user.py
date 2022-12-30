from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_dms import user_dms
from .user_channels import user_channels
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
        "Channel", secondary=user_channels ,back_populates="channel_user")
    user_dms = relationship(
        "DMS", secondary=user_dms, back_populates="dms_user")

    #! Methods
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
            'user_organizations': [org.org_to_dict() for org in self.user_organization],
            'user_channels': [channel.ch_to_dict() for channel in self.user_channel],
            'user_cms': [cm.to_dict() for cm in self.user_cm],
            'user_dms': [dms.to_dict() for dms in self.user_dms],
            'user_DmMessages': [DmMessage.to_dict() for DmMessage in self.user_dmMessage],
        }
