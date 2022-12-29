from .db import db
from sqlalchemy.orm import relationship


class User_Org_Association(db.Model):
    __tablename__ = "user_organizations"

    organization_id = db.Column(db.ForeignKey("organizations.id"), primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)

    parent = relationship("Organization", back_populates="organization_user")
    child = relationship("User", back_populates="user_organization")
    
    def org_to_dict(self):
        return {
            'organization_id': self.parent.id, 
            'organization_name': self.parent.name
        }

    def user_to_dict(self):
        return self.child.to_dict()