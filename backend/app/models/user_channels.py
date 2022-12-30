from .db import db
from sqlalchemy.orm import relationship


class User_Channel_Association(db.Model):
    __tablename__ = "user_channels"

    channel_id = db.Column(db.ForeignKey("channels.id"), primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)

    parent = relationship("Channel", back_populates="channel_user")
    child = relationship("User", back_populates="user_channel")

    def ch_to_dict(self):
        return {
            'channel_id': self.parent.id,
            'channel_name': self.parent.name,
            'channel_owner': self.parent.organization_id
        }

    def user_to_dict(self):
        return self.child.to_dict()
