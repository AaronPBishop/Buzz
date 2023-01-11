from app.models import db, Channel, environment, SCHEMA


def seed_channels():
    channels = [
        {
            "name": "coding_bros", "organization_id": 1,
            "owner_id": 1, "is_public":  True}, {
            "name": "programer_elite", "organization_id": 1,
            "owner_id": 54, "is_public":  False}, {
            "name": "no_more_assessments", "organization_id": 3,
            "owner_id": 1, "is_public":  True}, {
            "name": "everyDay_coding", "organization_id": 4,
            "owner_id": 1, "is_public":  True}, {
            "name": "Leathery Colicwood",
            "organization_id": 5,
            "owner_id": 1, "is_public": True
        },
        {
            "name": "Teal Lovegrass",
            "organization_id": 6,
            "owner_id": 1, "is_public": False
        }, {
            "name": "Cup Lichen",
            "organization_id": 7,
            "owner_id": 1, "is_public": True
        }, {
            "name": "Jones' Selenia",
            "organization_id": 8,
            "owner_id": 1, "is_public": True
        }, {
            "name": "Texas Grama",
            "organization_id": 9,
            "owner_id": 1, "is_public": True}, {
            "name": "Truckee Cryptantha",
            "organization_id": 10,
            "owner_id": 1, "is_public": True}, {
            "name": "Japanese Pagoda Tree",
            "organization_id": 11,
            "owner_id": 1, "is_public": True}, {
            "name": "Largeseed Bittercress",
            "organization_id": 12,
            "owner_id": 1, "is_public": True}, {
            "name": "Sapota",
            "organization_id": 13,
            "owner_id": 1, "is_public": True}, {
            "name": "Hillside Broomrape",
            "organization_id": 14,
            "owner_id": 1, "is_public": True}, {
            "name": "Biennial Cinquefoil",
            "organization_id": 15,
            "owner_id": 1, "is_public": True}, {
            "name": "Campylopus Moss",
            "organization_id": 16,
            "owner_id": 1, "is_public": True}, {
            "name": "Siskiyou False Rue Anemone",
            "organization_id": 17,
            "owner_id": 1, "is_public": True}, {
            "name": "European Plum",
            "organization_id": 18,
            "owner_id": 1, "is_public": True}, {
            "name": "Palmer's Penstemon",
            "organization_id": 19,
            "owner_id": 1, "is_public": True}, {
            "name": "Rydberg's Wildrye",
            "organization_id": 20,
            "owner_id": 1, "is_public": True}, {
            "name": "Beach Strawberry",
            "organization_id": 21,
            "owner_id": 1, "is_public": True}, {
            "name": "Rose Bluet",
            "organization_id": 22,
            "owner_id": 1, "is_public": True}, {
            "name": "Garcinia",
            "organization_id": 23,
            "owner_id": 1, "is_public": True}]

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
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channels")

    db.session.commit()
