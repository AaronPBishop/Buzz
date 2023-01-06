from .db import db
from sqlalchemy.orm import relationship


class User_DmMessage_Channel(db.Model):
    __tablename__ = "user_dmMessage_channels"

    dmMessage_channel_id = db.Column(db.ForeignKey("dmMessage_channels.id"), primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)

    parent = relationship("DmMessage_Channel", back_populates="dmMessage_channel_user")
    child = relationship("User", back_populates="user_dmMessage_channel")

# ? Methods
    def dmMessage_channel_to_dict(self):
        return {
            'dmMessage_channel_id': self.parent.id,
            'organization_id': self.parent.organization_id
        }

    def user_to_dict(self):
        return self.child.to_dict()
