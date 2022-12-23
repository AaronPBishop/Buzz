from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

user_dms = db.Table(
    "user_dms",
    Base.metadata,
    db.Column("user_id", db.Integer, ForeignKey("users.id"), primary_key=True),
    db.Column("dms_id", db.Integer, ForeignKey("group_dms.id"), primary_key=True)
)
