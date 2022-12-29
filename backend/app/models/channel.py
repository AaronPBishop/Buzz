from .db import db
from .user_channels import user_channels
from sqlalchemy.orm import relationship


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey(
        "organizations.id"), nullable=False)

    # Relationships
    channel_organization = relationship(
        "Organization", back_populates="organization_channel")
    channel_cm = relationship(
        "ChannelMessage", back_populates="cm_channel", cascade="all, delete")
    channel_user = relationship(
        "User", secondary=user_channels, back_populates="user_channel")
    

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'organization_id': self.organization_id,
            'channel_users': [user.to_dict() for user in self.channel_user],
            'channel_cm': [cm.to_dict() for cm in self.channel_cm]
        }
