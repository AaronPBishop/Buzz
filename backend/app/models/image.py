from .db import db
from sqlalchemy.orm import relationship

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(1000))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    channel_message_id = db.Column(db.Integer, db.ForeignKey("channel_messages.id"))
    dm_message_id = db.Column(db.Integer, db.ForeignKey("dm_messages.id"))

    # Relationships
    image_cm = relationship("ChannelMessage", back_populates="cm_image")
    image_user = relationship("User", back_populates="user_image")
    image_dmMessage = relationship("DmMessage", back_populates="dmMessage_image")

# TODO: Revisit following method
    def to_dict(self):
        return {
            'id': self.id,
            'channel_name': self.channel_name
        }
