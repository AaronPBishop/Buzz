from .db import db
from sqlalchemy.orm import relationship

class DMS(db.Model):
    __tablename__ = 'group_dms'

    id = db.Column(db.Integer, primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey(
        "organizations.id"), nullable=False)

    # Relationships
    dms_organization = relationship(
        "Organization", back_populates="organization_dms")
    dms_dmMessage = relationship(
        "DmMessage", back_populates="dmMessage_dms", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'organization_id': self.organization_id,
            'dms_organizations': [organization.to_dict() for organization in self.dms_organization],
            'dms_dmMessages': [dmMessage.to_dict() for dmMessage in self.dms_dmMessage],
        }
