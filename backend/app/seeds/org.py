from app.models import db, Organization, environment, SCHEMA


def seed_organizations():
    orgs = [{
        "name": "AAA", "org_image": "image", "owner_id": 1}, {"name": "Avengers", "org_image": "image", "owner_id": 2}, {"name": "App Academy", "org_image": "image", "owner_id": 3}]

    db.session.add_all([Organization(**org) for org in orgs])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_organizations():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM organizations")

    db.session.commit()
