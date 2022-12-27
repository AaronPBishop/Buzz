from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey


class Organization(db.Model):
    __tablename__ = 'organizations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    org_image = db.Column(db.String)

    # Foreign Key
    owner_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)

    # Relationships
    organization_user = relationship(
        "User", back_populates="user_organization")
    organization_channel = relationship(
        "Channel", back_populates="channel_organization", cascade="all, delete")
    organization_dms = relationship(
        "DMS", back_populates="dms_organization", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'organization_users': [user.to_dict() for user in self.organization_user],
            'organization_channels': [channel.to_dict() for channel in self.organization_channel],
            'organization_dms': [dms.to_dict() for dms in self.organization_dms],
        }
