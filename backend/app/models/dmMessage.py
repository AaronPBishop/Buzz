from .db import db
from sqlalchemy.orm import relationship

class DmMessage(db.Model):
    __tablename__ = 'dmMessages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    dm_id = db.Column(db.Integer, db.ForeignKey("group_dms.id"), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)

    # Relationships
    dmMessage_dms = relationship("DMS", back_populates="dms_dmMessage")
    dmMessage_user = relationship("User", back_populates="user_dmMessage")
    dmMessage_image = relationship("Image", back_populates="image_dmMessage", cascade="all, delete")

    # TODO: Revisit following method

    def to_dict(self):
        return {
            'id': self.id,
            'channel_name': self.channel_name
        }
