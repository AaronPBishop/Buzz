from app.models import db, User_Org_Association, environment, SCHEMA


def seed_user_orgs():
    user_orgs = [{"organization_id": 1, "user_id": 2}, {"organization_id": 1, "user_id": 3}, {"organization_id": 1, "user_id": 4}, {"organization_id": 1, "user_id": 54}, {"organization_id": 1, "user_id": 6}, {
        "organization_id": 1, "user_id": 5}, {"organization_id": 1, "user_id": 9}, {"organization_id": 1, "user_id": 7}, {"organization_id": 1, "user_id": 10}, {"organization_id": 1, "user_id": 11},]

    db.session.add_all([User_Org_Association(**user) for user in user_orgs])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_user_orgs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_organizations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM user_organizations")

    db.session.commit()
