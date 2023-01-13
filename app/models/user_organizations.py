from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class User_Org_Association(db.Model):
    __tablename__ = "user_organizations"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    organization_id = db.Column(db.ForeignKey(add_prefix_for_prod('organizations.id')), primary_key=True)
    user_id = db.Column(db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)

    parent = relationship("Organization", back_populates="organization_user")
    child = relationship("User", back_populates="user_organization")

# ? Methods

    def org_to_dict(self):
        return {
            'organization_id': self.parent.id,
            'organization_name': self.parent.name,
            'organization_owner': self.parent.owner_id,
            'users': self.parent.to_dict()['organization_users'],
            'total_users': len(self.parent.to_dict()['organization_users']),
            'total_channels': len(self.parent.to_dict()['organization_channels']),
            'total_dm_channels': len(self.parent.to_dict()['organization_dmMessage_channels'])
        }

    def user_to_dict_basic(self):
        return self.child.basic_dict()

    def user_to_dict(self):
        return self.child.basic_dict()
