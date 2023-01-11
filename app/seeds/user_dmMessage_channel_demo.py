from app.models import db, User_DmMessage_Channel, environment, SCHEMA


def seed_user_dmMessage_channel():
    user_dmMessage_channels = [{"dmMessage_channel_id": 1, "user_id": 1}, {"dmMessage_channel_id": 1, "user_id": 2}, {"dmMessage_channel_id": 2, "user_id": 4}, {"dmMessage_channel_id": 2, "user_id": 54}, {"dmMessage_channel_id": 2, "user_id": 2}, {
        "dmMessage_channel_id": 3, "user_id": 5}, {"dmMessage_channel_id": 3, "user_id": 9}, {"dmMessage_channel_id": 4, "user_id": 7}, {"dmMessage_channel_id": 4, "user_id": 10}, {"dmMessage_channel_id": 4, "user_id": 11},]

    db.session.add_all([User_DmMessage_Channel(**user)
                       for user in user_dmMessage_channels])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_user_dmMessage_channel():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_dmMessage_channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_dmMessage_channels")

    db.session.commit()
