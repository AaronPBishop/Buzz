from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    last_update = db.Column(db.String())
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #! Relationships
    cm_channel = relationship("Channel", back_populates="channel_cm")
    cm_user = relationship("User", back_populates="user_cm")
    cm_image = relationship(
        "Image", back_populates="image_cm", cascade="all, delete")

    # ? Methods

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'user_name': self.cm_user.user_name,
            'first_name': self.cm_user.first_name,
            'last_name': self.cm_user.last_name,
            'last_update': self.last_update,
            'images': [image.to_dict() for image in self.cm_image]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'user_id': self.user_id,
            'user_name': self.cm_user.user_name,
            'last_update': self.last_update,
            'cm_images': [image.to_dict() for image in self.cm_image]
        }
