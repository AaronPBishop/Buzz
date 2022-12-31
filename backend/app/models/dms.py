from .db import db
from .user_dms import User_DMS_Association
from sqlalchemy.orm import relationship


class DMS(db.Model):
    __tablename__ = 'group_dms'

    id = db.Column(db.Integer, primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey(
        "organizations.id"), nullable=False)

    #! Relationships
    dms_organization = relationship(
        "Organization", back_populates="organization_dms")
    dms_dmMessage = relationship(
        "DmMessage", back_populates="dmMessage_dms", cascade="all, delete")
    dms_user = relationship(
        "User_DMS_Association", back_populates="parent")

    def to_dict(self):
        return {
            'id': self.id,
            'organization_id': self.organization_id,
            'dms_users': [user.user_to_dict() for user in self.dms_user],
            'dms_dmMessages': [dmMessage.to_dict() for dmMessage in self.dms_dmMessage],
        }
