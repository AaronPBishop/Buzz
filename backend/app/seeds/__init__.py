from flask.cli import AppGroup
from .users_demo import seed_users, undo_users
from .org_demo import seed_organizations, undo_organizations
from .channels_demo import seed_channels, undo_channels
from .channel_msgs_demo import seed_channel_messages, undo_channel_messages
from .dmMessages_demo import seed_dmMessages, undo_dmMessages
from .dm_channels_demo import seed_dm_channels, undo_dm_channels
from .imges_demo import seed_images, undo_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_organizations()
        undo_channels()
        undo_dm_channels()
        undo_channel_messages()
        undo_dmMessages()
        undo_images()


    seed_users()
    seed_organizations()
    seed_channels()
    seed_dm_channels()
    seed_channel_messages()
    seed_dmMessages()
    seed_images()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_organizations()
    undo_channels()
    undo_dm_channels()
    undo_channel_messages()
    undo_dmMessages()
    undo_images()
