from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class User_Channel_Association(db.Model):
    __tablename__ = "user_channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    channel_id = db.Column(db.ForeignKey(add_prefix_for_prod('channels.id')), primary_key=True)
    user_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)

    parent = relationship("Channel", back_populates="channel_user")
    child = relationship("User", back_populates="user_channel")


# ? Methods
    def ch_to_dict(self):
        return {
            'channel_id': self.parent.id,
            'channel_name': self.parent.name,
            'organization_id': self.parent.organization_id
        }

    def user_to_dict(self):
        return self.child.to_dict()
