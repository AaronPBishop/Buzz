from .db import db
from .user_channels import User_Channel_Association
from sqlalchemy.orm import relationship

# ! Channel owner???


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey(
        "organizations.id"), nullable=False)

    #! Relationships
    channel_organization = relationship(
        "Organization", back_populates="organization_channel")
    channel_cm = relationship(
        "ChannelMessage", back_populates="cm_channel", cascade="all, delete")
    channel_user = relationship(
        "User_Channel_Association", back_populates="parent")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'organization_id': self.organization_id,
            'channel_users': [user.user_to_dict() for user in self.channel_user],
            'channel_cm': [cm.to_dict() for cm in self.channel_cm]
        }
