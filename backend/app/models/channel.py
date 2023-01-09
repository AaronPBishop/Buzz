from .db import db
from .user_channels import User_Channel_Association
from sqlalchemy.orm import relationship


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    is_public = db.Column(db.Boolean, nullable=False)

    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey(
        "organizations.id"), nullable=False)

    #! Relationships
    channel_owner = relationship("User", back_populates="owned_channels")
    channel_organization = relationship(
        "Organization", back_populates="organization_channel")
    channel_cm = relationship(
        "ChannelMessage", back_populates="cm_channel", cascade="all, delete")
    channel_user = relationship(
        "User_Channel_Association", back_populates="parent", cascade="all, delete")

    # ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'isPublic': self.is_public,
            'owner_id': self.channel_owner.id,
            'organization_id': self.organization_id,
            'channel_users': [user.child.user_name for user in self.channel_user],
            'channel_cm': [cm.to_dict() for cm in self.channel_cm]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'channel_users': [user.user_to_dict() for user in self.channel_user],
            'channel_cm': [cm.to_dict() for cm in self.channel_cm]
        }

    def org_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
