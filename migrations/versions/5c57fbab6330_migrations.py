"""migrations

Revision ID: 5c57fbab6330
Revises: 
Create Date: 2023-01-17 13:13:53.878877

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3356137bfa98'
down_revision = None
branch_labels = None
depends_on = None

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

def upgrade():
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=400), nullable=True),
    sa.Column('profile_img', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('user_name')
    )
    op.create_table('organizations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('org_image', sa.String(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_organizations',
    sa.Column('organization_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('organization_id', 'user_id')
    )
    op.create_table('channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('is_public', sa.Boolean(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('organization_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dm_message_channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('organization_id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_channels',
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('channel_id', 'user_id')
    )
    op.create_table('user_dm_message_channels',
    sa.Column('dm_message_channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dm_message_channel_id'], ['dm_message_channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('dm_message_channel_id', 'user_id')
    )
    op.create_table('channel_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=3000), nullable=True),
    sa.Column('created_date', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('last_update', sa.String(), nullable=True),
    sa.Column('channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['channel_id'], ['channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dm_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(length=3000), nullable=True),
    sa.Column('created_date', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('last_update', sa.String(), nullable=True),
    sa.Column('dm_message_channel_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dm_message_channel_id'], ['dm_message_channels.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=1000), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('channel_message_id', sa.Integer(), nullable=True),
    sa.Column('dm_message_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['channel_message_id'], ['channel_messages.id'], ),
    sa.ForeignKeyConstraint(['dm_message_id'], ['dm_messages.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE organizations SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_organizations SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE channels SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE dm_message_channels SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_channels SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_dm_message_channels SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE channel_messages SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE dm_messages SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('images')
    op.drop_table('user_dm_message_channels')
    op.drop_table('user_channels')
    op.drop_table('dm_messages')
    op.drop_table('channel_messages')
    op.drop_table('user_organizations')
    op.drop_table('dm_message_channels')
    op.drop_table('channels')
    op.drop_table('organizations')
    op.drop_table('users')
    # ### end Alembic commands ###