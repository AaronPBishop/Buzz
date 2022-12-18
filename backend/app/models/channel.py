from .db import db
from sqlalchemy.orm import relationship

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    channel_name = db.Column(db.String, nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey("organizations.id"), nullable=False)

    # Relationships
    linked_organization = relationship("Organization", back_populates="linked_channels")

    def to_dict(self):
        return {
            'id': self.id,
            'channel_name': self.channel_name
        }