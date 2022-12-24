from .db import db
from sqlalchemy.orm import relationship


class DmMessage(db.Model):
    __tablename__ = 'dmMessages'

    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(3000))
    dm_id = db.Column(db.Integer, db.ForeignKey("group_dms.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    dmMessage_dms = relationship("DMS", back_populates="dms_dmMessage")
    dmMessage_user = relationship("User", back_populates="user_dmMessage")
    dmMessage_image = relationship("Image", back_populates="image_dmMessage", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'dm_id': self.dm_id,
            'user_id': self.user_id,
            'dmMessage_dms': [dms.to_dict() for dms in self.dmMessage_dms],
            'dmMessage_users': [user.to_dict() for user in self.dmMessage_user],
            'dmMessage_images': [image.to_dict() for image in self.dmMessage_image],
            }
