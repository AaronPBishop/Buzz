from .db import db
from sqlalchemy.orm import relationship

class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    organization_name = db.Column(db.String, nullable=False)

    # Relationships
    linked_channels = relationship("Channel", back_populates="linked_organization", cascade="all, delete")

    def to_dict(self):
        all_channels = []

        for channel in self.linked_channels:
            all_channels.append(channel.to_dict())

        return {
            'id': self.id,
            'organization_name': self.organization_name,
            'channels': all_channels
        }