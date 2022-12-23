from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

user_organizations = db.Table(
    "user_organizations",
    Base.metadata,
    db.Column("user_id", db.Integer, ForeignKey("users.id"), primary_key=True),
    db.Column("organization_id", db.Integer, ForeignKey("organizations.id"), primary_key=True)
)