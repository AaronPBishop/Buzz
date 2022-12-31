from .db import db
from sqlalchemy.orm import relationship


class User_DMS_Association(db.Model):
    __tablename__ = "user_dms"

    dms_id = db.Column(db.ForeignKey("group_dms.id"), primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id"), primary_key=True)

    parent = relationship("DMS", back_populates="dms_user")
    child = relationship("User", back_populates="user_dms")

    def dms_to_dict(self):
        return {
            'dms_id': self.parent.id,
            'organization_id': self.parent.organization_id
        }

    def user_to_dict(self):
        return self.child.to_dict()
