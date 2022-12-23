from .db import db
from sqlalchemy.orm import relationship

class DMS(db.Model):
    __tablename__ = 'group_dms'

    id = db.Column(db.Integer, primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), nullable=False)

    # Relationships
    dms_organization = relationship("Organization", back_populates="organization_dms")
    dms_dmMessage = relationship("DmMessage", back_populates="dmMessage_dms", cascade="all, delete")

# TODO: Revisit following method
    def to_dict(self):
        return {
            'id': self.id,
            'channel_name': self.channel_name
        }
