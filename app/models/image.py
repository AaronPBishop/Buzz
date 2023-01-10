from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(1000))

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channel_messages.id')))
    dm_message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dmMessages.id')))

    #! Relationships
    image_cm = relationship("ChannelMessage", back_populates="cm_image")
    image_dmMessage = relationship(
        "DmMessage", back_populates="dmMessage_image")

#? Methods
    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'user_id': self.user_id,
            'channel_message_id': self.channel_message_id,
            'dm_message_id': self.dm_message_id
        }

    def basic_dict(self):
        return {
            'id': self.id,
            'url': self.url,
        }
