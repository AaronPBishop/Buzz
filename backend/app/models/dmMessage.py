from .db import db
from sqlalchemy.orm import relationship


class DmMessage(db.Model):
    __tablename__ = 'dmMessages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    dmMessage_channel_id = db.Column(db.Integer, db.ForeignKey(
        "dmMessage_channels.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

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
            'dmMessage_images': [image.to_dict() for image in self.dmMessage_image]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.dmMessage_user.user_name,
            'message': self.message,
            'dmMessage_images': [image.to_dict() for image in self.dmMessage_image]
        }
