from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class DmMessage(db.Model):
    __tablename__ = 'dm_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    last_update = db.Column(db.String())

    dm_message_channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dm_message_channels.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #! Relationships
    dm_message_dm_message_channel = relationship(
        "DmMessage_Channel", back_populates="dm_message_channel_dm_message")
    dm_message_user = relationship("User", back_populates="user_dm_message")
    dm_message_image = relationship(
        "Image", back_populates="image_dm_message", cascade="all, delete")

# ? Methods

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.dm_message_user.user_name,
            'first_name': self.dm_message_user.first_name,
            'last_name': self.dm_message_user.last_name,
            'message': self.message,
            'dm_message_channel_id': self.dm_message_channel_id,
            'user_id': self.user_id,
            'last_update': self.last_update,
            'created_date': self.created_date,
            'images': [image.to_dict() for image in self.dm_message_image]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.dm_message_user.user_name,
            'message': self.message,
            'last_updated': self.last_update,
            'dm_message_images': [image.to_dict() for image in self.dm_message_image]
        }
