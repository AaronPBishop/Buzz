from .db import db
# from sqlalchemy.schema import ForeignKey
# from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base()

user_channels = db.Table(
    "user_channels",
    # Base.metadata,
    db.Model.metadata,
    db.Column("users", db.Integer, db.ForeignKey("users.id"), primary_key=True, nullable=False),
    db.Column("channels", db.Integer, db.ForeignKey("channels.id"), primary_key=True, nullable=False)
)
