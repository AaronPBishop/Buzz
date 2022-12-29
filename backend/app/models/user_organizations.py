from .db import db
# from sqlalchemy.schema import ForeignKey
# from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base()

user_organizations = db.Table(
    "user_organizations",
    # Base.metadata,
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("organizations", db.Integer, db.ForeignKey("organizations.id"), primary_key=True)
)
