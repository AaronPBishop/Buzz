from .db import db
from sqlalchemy.orm import relationship

class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    # Relationships
    cm_channel = relationship("Channel", back_populates="channel_cm")
    cm_user = relationship("User", back_populates="user_cm")
    cm_image = relationship("Image", back_populates="image_cm", cascade="all, delete")

# TODO: Revisit following method
    def to_dict(self):
        return {
            'id': self.id,
            'channel_name': self.channel_name
        }
