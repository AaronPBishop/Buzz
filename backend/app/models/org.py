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
    organization_user = relationship("User", back_populates="user_organization")
    organization_channel = relationship("Channel", back_populates="channel_organization", cascade="all, delete")
    organization_dms = relationship("DMS", back_populates="dms_organization", cascade="all, delete")


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
