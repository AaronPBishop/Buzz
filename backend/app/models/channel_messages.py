from .db import db
from sqlalchemy.orm import relationship

class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    last_update = db.Column(db.String)

    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    #! Relationships
    cm_channel = relationship("Channel", back_populates="channel_cm")
    cm_user = relationship("User", back_populates="user_cm")
    cm_image = relationship(
        "Image", back_populates="image_cm", cascade="all, delete")

    #? Methods

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'user_name': self.cm_user.user_name,
            'cm_images': [image.to_dict() for image in self.cm_image]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'user_id': self.user_id,
            'user_name': self.cm_user.user_name,
            'cm_images': [image.to_dict() for image in self.cm_image]
        }
