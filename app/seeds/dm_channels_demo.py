from app.models import db, DmMessage_Channel, environment, SCHEMA


def seed_dm_channels():
    dm_channels = [
        {"organization_id": 1, "owner_id": 1},
        {"organization_id": 2, "owner_id": 54},
        {"organization_id": 3, "owner_id": 1},
        {"organization_id": 4, "owner_id": 1},
        {"organization_id": 5, "owner_id": 1},
        {"organization_id": 6, "owner_id": 1},
        {"organization_id": 7, "owner_id": 1},
        {"organization_id": 8, "owner_id": 1},
        {"organization_id": 9, "owner_id": 1},
        {"organization_id": 10, "owner_id": 1},
        {"organization_id": 11, "owner_id": 1},
        {"organization_id": 4, "owner_id": 1},
        {"organization_id": 12, "owner_id": 1},
        {"organization_id": 9, "owner_id": 1},
        {"organization_id": 10, "owner_id": 1},
        {"organization_id": 13, "owner_id": 1}]

    db.session.add_all([DmMessage_Channel(**dm_channel)
                       for dm_channel in dm_channels])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dm_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.dm_message_channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM dm_message_channels")

    db.session.commit()
