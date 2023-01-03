from app.models import db, Image, environment, SCHEMA

# Todo fill in the chan_msg, user_id, dm_message_id for the reminder of the seeder objects
def seed_images():
    images = [{
        "url": "http://dummyimage.com/220x110.png/5fa4dd/ffffff", "user_id": 1, "channel_message_id": 2, "dm_message_id": None}, {"url": "http://dummyimage.com/207x100.png/5fa2dd/ffffff", "user_id": 2, "channel_message_id": None, "dm_message_id": 1},
        # {"url": "http://dummyimage.com/174x100.png/cc0000/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/217x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/136x100.png/dddddd/000000",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/224x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/204x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/166x100.png/cc0000/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/122x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/193x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/211x100.png/cc0000/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/115x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/116x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/152x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/157x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/175x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/119x100.png/dddddd/000000",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/250x100.png/dddddd/000000",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/227x100.png/dddddd/000000",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/246x100.png/cc0000/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/245x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/193x100.png/dddddd/000000",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/106x100.png/cc0000/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/172x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/117x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/164x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/217x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/144x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/213x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/179x100.png/ff4444/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000},
        # {"url": "http://dummyimage.com/189x100.png/5fa2dd/ffffff",
        #     "user_id": 000, "channel_message_id": 000, "dm_message_id": 000}
    ]

    db.session.add_all([Image(**image) for image in images])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
