from app.models import db, Channel, environment, SCHEMA


def seed_channels():
    orgs = [{
        "name": "coding_bros", "organization_id": 1}, {
        "name": "programer_elite", "organization_id": 2}, {
        "name": "no_more_assessments", "organization_id": 3}]

    db.session.add_all([Channel(**channel) for channel in orgs])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
