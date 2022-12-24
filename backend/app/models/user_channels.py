from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

user_channels = db.Table(
    "user_channels",
    Base.metadata,
    db.Column("user_id", db.Integer, ForeignKey("users.id"), primary_key=True, nullable=False),
    db.Column("channel_id", db.Integer, ForeignKey("channels.id"), primary_key=True, nullable=False)
)
