from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class DmMessage_Channel(db.Model):
    __tablename__ = 'dm_message_channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('organizations.id')), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #! Relationships
    dm_message_channel_owner = relationship(
        "User", back_populates="owned_dm_message_channels")
    dm_message_channel_organization = relationship(
        "Organization", back_populates="organization_dm_message_channel")
    dm_message_channel_dm_message = relationship(
        "DmMessage", back_populates="dm_message_dm_message_channel", cascade="all, delete")
    dm_message_channel_user = relationship(
        "User_DmMessage_Channel", back_populates="parent", cascade="all, delete")

    # ? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'organization_id': self.organization_id,
            'dm_message_channel_users': [user.child.user_name for user in self.dm_message_channel_user],
            'dm_message_channel_dm_messages': [dm_message.to_dict() for dm_message in self.dm_message_channel_dm_message]
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'dm_message_channel_users': [user.child.user_name for user in self.dm_message_channel_user],
            'dm_message_channel_dm_messages': [dm_message.to_dict() for dm_message in self.dm_message_channel_dm_message]
        }

    def org_dict(self):
        return {
            'id': self.id,
        }
