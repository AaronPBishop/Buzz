from app.models import db, Channel, environment, SCHEMA


def seed_channels():
    channels = [{
        "name": "coding_bros", "organization_id": 1}, {
        "name": "programer_elite", "organization_id": 2}, {
        "name": "no_more_assessments", "organization_id": 3}, {
        "name": "everyDay_coding", "organization_id": 4}, {
        "name": "Leathery Colicwood",
        "organization_id": 5
    }, {
        "name": "Teal Lovegrass",
        "organization_id": 6
    }, {
        "name": "Cup Lichen",
        "organization_id": 7
    }, {
        "name": "Jones' Selenia",
        "organization_id": 8
    }, {
        "name": "Texas Grama",
        "organization_id": 9
    }, {
        "name": "Truckee Cryptantha",
        "organization_id": 10
    }, {
        "name": "Japanese Pagoda Tree",
        "organization_id": 11
    }, {
        "name": "Largeseed Bittercress",
        "organization_id": 12
    }, {
        "name": "Sapota",
        "organization_id": 13
    }, {
        "name": "Hillside Broomrape",
        "organization_id": 14
    }, {
        "name": "Biennial Cinquefoil",
        "organization_id": 15
    }, {
        "name": "Campylopus Moss",
        "organization_id": 16
    }, {
        "name": "Siskiyou False Rue Anemone",
        "organization_id": 17
    }, {
        "name": "European Plum",
        "organization_id": 18
    }, {
        "name": "Palmer's Penstemon",
        "organization_id": 19
    }, {
        "name": "Rydberg's Wildrye",
        "organization_id": 20
    }, {
        "name": "Beach Strawberry",
        "organization_id": 21
    }, {
        "name": "Rose Bluet",
        "organization_id": 22
    }, {
        "name": "Garcinia",
        "organization_id": 23
    }]

    db.session.add_all([Channel(**channel) for channel in channels])

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
