from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class DmMessage_Channel(db.Model):
    __tablename__ = 'dmMessage_channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('organizations.id')), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #! Relationships
    dmMessage_channel_owner = relationship(
        "User", back_populates="owned_dmMessage_channels")
    dmMessage_channel_organization = relationship(
        "Organization", back_populates="organization_dmMessage_channel")
    dmMessage_channel_dmMessage = relationship(
        "DmMessage", back_populates="dmMessage_dmMessage_channel", cascade="all, delete")
    dmMessage_channel_user = relationship(
        "User_DmMessage_Channel", back_populates="parent", cascade="all, delete")

    # ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'organization_id': self.organization_id,
            'dmMessage_channel_users': [user.child.user_name for user in self.dmMessage_channel_user],
            'dmMessage_channel_dmMessages': [dmMessage.to_dict() for dmMessage in self.dmMessage_channel_dmMessage]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'dmMessage_channel_users': [user.child.user_name for user in self.dmMessage_channel_user],
            'dmMessage_channel_dmMessages': [dmMessage.to_dict() for dmMessage in self.dmMessage_channel_dmMessage]
        }

    def org_dict(self):
        return {
            'id': self.id,
        }
