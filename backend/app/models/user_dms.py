from .db import db
# from sqlalchemy.schema import ForeignKey
# from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base()

user_dms = db.Table(
    "user_dms",
    # Base.metadata,
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("group_dms", db.Integer, db.ForeignKey("group_dms.id"), primary_key=True)
)
