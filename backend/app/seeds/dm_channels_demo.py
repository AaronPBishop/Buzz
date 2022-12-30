from app.models import db, DMS, environment, SCHEMA


def seed_dm_channels():
    dm_channels = [{
        "organization_id": 1},
        {"organization_id": 2},
        {"organization_id": 3},
        {"organization_id": 4},
        {"organization_id": 1}]

    db.session.add_all([DMS(**dm_channel) for dm_channel in dm_channels])

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
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM dm_channels")

    db.session.commit()