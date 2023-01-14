from flask.cli import AppGroup
from .users_demo import seed_users, undo_users
from .org_demo import seed_organizations, undo_organizations
from .channels_demo import seed_channels, undo_channels
from .channel_msgs_demo import seed_channel_messages, undo_channel_messages
from .dm_messages_demo import seed_dm_messages, undo_dm_messages
from .dm_channels_demo import seed_dm_channels, undo_dm_channels
from .imges_demo import seed_images, undo_images
from .user_org_demo import seed_user_orgs, undo_user_orgs
from .user_channels_demo import seed_user_channel, undo_user_channel
from .user_dm_message_channel_demo import seed_user_dm_message_channel, undo_user_dm_message_channel

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.channel_messages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.dm_messages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_dm_message_channels RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.dm_message_channels RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_channels RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_organizations RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.organizations RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")

        db.session.commit()
    else:
        undo_users()
        undo_organizations()
        undo_user_orgs()
        undo_channels()
        undo_user_channel()
        undo_dm_channels()
        undo_channel_messages()
        undo_dm_messages()
        undo_user_dm_message_channel()
        undo_images()


    seed_users()
    seed_organizations()
    seed_user_orgs()
    seed_channels()
    seed_user_channel()
    seed_dm_channels()
    seed_user_dm_message_channel()
    # seed_channel_messages()
    # seed_dm_messages()
    seed_images()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_organizations()
    undo_user_orgs()
    undo_channels()
    undo_user_channel()
    undo_dm_channels()
    undo_channel_messages()
    undo_user_dm_message_channel()
    undo_dm_messages()
    undo_images()
