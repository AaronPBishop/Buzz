from app.models import db, Organization, environment, SCHEMA


def seed_organizations():
    orgs = [{
        "name": "AAA", "org_image": "image", "owner_id": 1}, {"name": "Avengers", "org_image": "image", "owner_id": 2}, {"name": "App Academy", "org_image": "image", "owner_id": 3}, {"name": "Jaxnation", "org_image": "http://dummyimage.com/128x100.png/5fa2dd/ffffff", "owner_id": 1},
        {"name": "Twitterlist",
            "org_image": "http://dummyimage.com/177x100.png/5fa2dd/ffffff", "owner_id": 2},
        {"name": "Aibox", "org_image": "http://dummyimage.com/127x100.png/ff4444/ffffff", "owner_id": 3},
        {"name": "Bluejam", "org_image": "http://dummyimage.com/154x100.png/ff4444/ffffff", "owner_id": 4},
        {"name": "Voomm", "org_image": "http://dummyimage.com/236x100.png/dddddd/000000", "owner_id": 5},
        {"name": "Yodoo", "org_image": "http://dummyimage.com/106x100.png/dddddd/000000", "owner_id": 6},
        {"name": "Youspan", "org_image": "http://dummyimage.com/162x100.png/5fa2dd/ffffff", "owner_id": 7},
        {"name": "Zoomdog", "org_image": "http://dummyimage.com/170x100.png/ff4444/ffffff", "owner_id": 8},
        {"name": "Eamia", "org_image": "http://dummyimage.com/212x100.png/cc0000/ffffff", "owner_id": 9},
        {"name": "Dabjam", "org_image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "owner_id": 10},
        {"name": "Tagcat", "org_image": "http://dummyimage.com/215x100.png/5fa2dd/ffffff", "owner_id": 11},
        {"name": "Tanoodle",
            "org_image": "http://dummyimage.com/174x100.png/dddddd/000000", "owner_id": 12},
        {"name": "Zooveo", "org_image": "http://dummyimage.com/124x100.png/ff4444/ffffff", "owner_id": 13},
        {"name": "Lajo", "org_image": "http://dummyimage.com/163x100.png/dddddd/000000", "owner_id": 14},
        {"name": "Skipfire",
            "org_image": "http://dummyimage.com/203x100.png/ff4444/ffffff", "owner_id": 12},
        {"name": "Oyoyo", "org_image": "http://dummyimage.com/184x100.png/cc0000/ffffff", "owner_id": 16},
        {"name": "Thoughtsphere",
            "org_image": "http://dummyimage.com/185x100.png/ff4444/ffffff", "owner_id": 17},
        {"name": "Roomm", "org_image": "http://dummyimage.com/181x100.png/ff4444/ffffff", "owner_id": 1},
        {"name": "Brainsphere",
            "org_image": "http://dummyimage.com/187x100.png/5fa2dd/ffffff", "owner_id": 3},
        {"name": "Zoovu", "org_image": "http://dummyimage.com/188x100.png/5fa2dd/ffffff", "owner_id": 2}]

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
