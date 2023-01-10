from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


class DmMessage(db.Model):
    __tablename__ = 'dmMessages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    created_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    last_update = db.Column(db.String())

    dmMessage_channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dmMessage_channels.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #! Relationships
    dmMessage_dmMessage_channel = relationship(
        "DmMessage_Channel", back_populates="dmMessage_channel_dmMessage")
    dmMessage_user = relationship("User", back_populates="user_dmMessage")
    dmMessage_image = relationship(
        "Image", back_populates="image_dmMessage", cascade="all, delete")

# ? Methods

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.dmMessage_user.user_name,
            'message': self.message,
            'dmMessage_channel_id': self.dmMessage_channel_id,
            'user_id': self.user_id,
            'last_update': self.last_update,
            'created_date': self.created_date,
            'dmMessage_images': [image.to_dict() for image in self.dmMessage_image]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.dmMessage_user.user_name,
            'message': self.message,
            'last_updated': self.last_update,
            'dmMessage_images': [image.to_dict() for image in self.dmMessage_image]
        }
