from .db import db
from sqlalchemy.orm import relationship


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    channel_id = db.Column(db.Integer, db.ForeignKey(
        "channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    cm_channel = relationship("Channel", back_populates="channel_cm")
    cm_user = relationship("User", back_populates="user_cm")
    cm_image = relationship(
        "Image", back_populates="image_cm", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'cm_channels': [channel.to_dict() for channel in self.cm_channel],
            'cm_users': [user.to_dict() for user in self.cm_user],
            'cm_images': [image.to_dict() for image in self.cm_image]
        }
