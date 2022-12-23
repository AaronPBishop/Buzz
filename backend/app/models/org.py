from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey

class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Foreign Key
    owner_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    # Relationships
    owner = relationship("User", back_populates="owned_organizations")
    linked_channels = relationship("Channel", back_populates="linked_organization", cascade="all, delete")

    # TODO: Revisit following method
    def to_dict(self):
        all_channels = []

        for channel in self.linked_channels:
            all_channels.append(channel.to_dict())

        return {
            'id': self.id,
            'name': self.name,
            'channels': all_channels
        }