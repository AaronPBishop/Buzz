from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class User_DmMessage_Channel(db.Model):
    __tablename__ = "user_dm_message_channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    dm_message_channel_id = db.Column(db.ForeignKey(add_prefix_for_prod('dm_message_channels.id')), primary_key=True)
    user_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)

    parent = relationship("DmMessage_Channel", back_populates="dm_message_channel_user")
    child = relationship("User", back_populates="user_dm_message_channel")

# ? Methods
    def dm_message_channel_to_dict(self):
        return {
            'dm_message_channel_id': self.parent.id,
            'organization_id': self.parent.organization_id
        }

    def user_to_dict(self):
        return self.child.to_dict()
