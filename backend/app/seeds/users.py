from app.models import db, User, environment, SCHEMA


def seed_users():
    users = [{
        "user_name": 'demo', "first_name": 'Demo', "last_name": 'User',  "email": 'demo@aa.io', "bio": "demo_user1", "profile_img": "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80", "hashed_password": "password"},
        {"user_name": 'marnie', "first_name": 'Marnie', "last_name": 'Stark', "email": 'marnie@aa.io', "bio": "demo_user2", "profile_img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "hashed_password": 'password'}, {
        "user_name": 'bobbie', "first_name": 'Bobbie', "last_name": 'Break', "email": 'bobbie@aa.io', "bio": "demo_user3", "profile_img": "https://images.unsplash.com/photo-1507003211169-0a1dd722`8f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", "hashed_password": 'password'}]

    db.session.add_all([User(**user) for user in users])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
