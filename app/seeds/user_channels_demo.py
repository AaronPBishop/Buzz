from app.models import db, User_Channel_Association, environment, SCHEMA


def seed_user_channel():
    user_channels = [{"channel_id": 1, "user_id": 1}, {"channel_id": 1, "user_id": 2}, {"channel_id": 2, "user_id": 4}, {"channel_id": 2, "user_id": 54}, {"channel_id": 2, "user_id": 2}, {
        "channel_id": 3, "user_id": 5}, {"channel_id": 3, "user_id": 9}, {"channel_id": 4, "user_id": 7}, {"channel_id": 4, "user_id": 10}, {"channel_id": 4, "user_id": 11},]

    db.session.add_all([User_Channel_Association(**user) for user in user_channels])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_user_channel():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_channels")

    db.session.commit()
