from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import ForeignKey


class Organization(db.Model):
    __tablename__ = 'organizations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    org_image = db.Column(db.String)

    #! Foreign Key
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #! Relationships
    organization_user = relationship(
        "User_Org_Association", back_populates="parent", cascade="all, delete")
    organization_channel = relationship(
        "Channel", back_populates="channel_organization", cascade="all, delete")
    organization_dmMessage_channel = relationship(
        "DmMessage_Channel", back_populates="dmMessage_channel_organization", cascade="all, delete")

# ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.org_image,
            'owner_id': self.owner_id,
            'organization_users': [user.user_to_dict() for user in self.organization_user],
            'organization_channels': [channel.to_dict() for channel in self.organization_channel],
            'organization_dmMessage_channels': [dmMessage.to_dict() for dmMessage in self.organization_dmMessage_channel],
        }


    def basic_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.org_image,
        }


    def add_user(self):
        return {
            'id': self.id,
            'name': self.name,
            'organization_users': [user.user_to_dict_basic() for user in self.organization_user],
        }
