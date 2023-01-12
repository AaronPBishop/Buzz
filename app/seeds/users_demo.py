from app.models import db, User, environment, SCHEMA


def seed_users():
    users = [
        {"user_name": 'demo', "first_name": 'Demo', "last_name": 'User',  "email": 'demo@aa.io', "bio": "demo_user1",
            "profile_img": "https://bestprofilepictures.com/wp-content/uploads/2020/06/Anonymous-Profile-Picture-1024x1024.jpg", "password": "password"},
        {"user_name": 'marnie', "first_name": 'Marnie', "last_name": 'Stark', "email": 'marnie@aa.io', "bio": "demo_user2",
            "profile_img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "password": 'password1'},
        {"user_name": 'bobbie', "first_name": 'Bobbie', "last_name": 'Break', "email": 'bobbie@aa.io', "bio": "demo_user3", "profile_img": "https://images.unsplash.com/photo-1507003211169-0a1dd722`8f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            "password": 'password2'}, {"user_name": "gerley0", "first_name": "Geordie", "last_name": "Erley", "email": "gerley0@wufoo.com", "bio": "demo_user4", "profile_img": "http://dummyimage.com/236x100.png/5fa2dd/ffffff", "password": "NhacnPmLY"}, {"user_name": "gmomford1", "first_name": "Gabi", "last_name": "Momford", "email": "gmomford1@furl.net", "bio": "demo_user5", "profile_img": "http://dummyimage.com/142x100.png/ff4444/ffffff", "password": "ji4YAqKidx"},
        {"user_name": "bgulley2", "first_name": "Berke", "last_name": "Gulley", "email": "bgulley2@sciencedaily.com",
            "bio": "demo_user6", "profile_img": "http://dummyimage.com/163x100.png/ff4444/ffffff", "password": "wgS8IiXxfi"},
        {"user_name": "ddivers3", "first_name": "Dania", "last_name": "Divers", "email": "ddivers3@youku.com",
            "bio": "demo_user7", "profile_img": "http://dummyimage.com/159x100.png/5fa2dd/ffffff", "password": "IehEEIgSp7"},
        {"user_name": "aduffitt4", "first_name": "Anton", "last_name": "Duffitt", "email": "aduffitt4@google.fr",
            "bio": "demo_user8", "profile_img": "http://dummyimage.com/188x100.png/dddddd/000000", "password": "XBebMo3urad"},
        {"user_name": "ldurdan5", "first_name": "Lacey", "last_name": "Durdan", "email": "ldurdan5@bloomberg.com",
            "bio": "demo_user9", "profile_img": "http://dummyimage.com/203x100.png/5fa2dd/ffffff", "password": "5KGXwK"},
        {"user_name": "imolson6", "first_name": "Iain", "last_name": "Molson", "email": "imolson6@sciencedirect.com",
            "bio": "demo_user10", "profile_img": "http://dummyimage.com/193x100.png/5fa2dd/ffffff", "password": "OUGPLGrxwnk"},
        {"user_name": "dbrecknall7", "first_name": "Debbi", "last_name": "Brecknall", "email": "dbrecknall7@redcross.org",
            "bio": "demo_user11", "profile_img": "http://dummyimage.com/238x100.png/ff4444/ffffff", "password": "9nv01a3v14uq"},
        {"user_name": "dbalchen8", "first_name": "Drud", "last_name": "Balchen", "email": "dbalchen8@etsy.com",
            "bio": "demo_user12", "profile_img": "http://dummyimage.com/119x100.png/dddddd/000000", "password": "e47JC1CPoQns"},
        {"user_name": "rbagworth9", "first_name": "Ruthe", "last_name": "Bagworth", "email": "rbagworth9@rediff.com",
            "bio": "demo_user13", "profile_img": "http://dummyimage.com/227x100.png/cc0000/ffffff", "password": "ogRe6D9f"},
        {"user_name": "eboguea", "first_name": "Eliza", "last_name": "Bogue", "email": "eboguea@nydailynews.com",
            "bio": "demo_user14", "profile_img": "http://dummyimage.com/189x100.png/ff4444/ffffff", "password": "8z4qiwtscj"},
        {"user_name": "ahessenthalerb", "first_name": "Aldo", "last_name": "Hessenthaler", "email": "ahessenthalerb@dailymail.co.uk",
            "bio": "demo_user15", "profile_img": "http://dummyimage.com/191x100.png/ff4444/ffffff", "password": "NglzYEFkeUq"},
        {"user_name": "pschustc", "first_name": "Penrod", "last_name": "Schust", "email": "pschustc@reverbnation.com",
            "bio": "demo_user16", "profile_img": "http://dummyimage.com/240x100.png/ff4444/ffffff", "password": "WpXw5W"},
        {"user_name": "ahankinsd", "first_name": "Allissa", "last_name": "Hankins", "email": "ahankinsd@lulu.com",
            "bio": "demo_user17", "profile_img": "http://dummyimage.com/124x100.png/dddddd/000000", "password": "yb4DAQG1vP4y"},
        {"user_name": "hsloane", "first_name": "Horacio", "last_name": "Sloan", "email": "hsloane@de.vu",
            "bio": "demo_user18", "profile_img": "http://dummyimage.com/101x100.png/5fa2dd/ffffff", "password": "HUdCCdKa1buN"},
        {"user_name": "pmonkf", "first_name": "Porter", "last_name": "Monk", "email": "pmonkf@merriam-webster.com",
            "bio": "demo_user19", "profile_img": "http://dummyimage.com/143x100.png/cc0000/ffffff", "password": "XWk6af"},
        {"user_name": "jeuelsg", "first_name": "Justinian", "last_name": "Euels", "email": "jeuelsg@paginegialle.it",
            "bio": "demo_user20", "profile_img": "http://dummyimage.com/228x100.png/5fa2dd/ffffff", "password": "Q7PX8CX"},
        {"user_name": "aaichesonh", "first_name": "Ariella", "last_name": "Aicheson", "email": "aaichesonh@cloudflare.com",
            "bio": "demo_user21", "profile_img": "http://dummyimage.com/210x100.png/5fa2dd/ffffff", "password": "keGs4eJ9AgQ"},
        {"user_name": "ftwamleyi", "first_name": "Fernanda", "last_name": "Twamley", "email": "ftwamleyi@constantcontact.com",
            "bio": "demo_user22", "profile_img": "http://dummyimage.com/203x100.png/cc0000/ffffff", "password": "mxAwcA"},
        {"user_name": "nbygravesj", "first_name": "Neda", "last_name": "Bygraves", "email": "nbygravesj@nydailynews.com",
            "bio": "demo_user23", "profile_img": "http://dummyimage.com/239x100.png/5fa2dd/ffffff", "password": "KeiBnmDG4B"},
        {"user_name": "djumontk", "first_name": "Delmer", "last_name": "Jumont", "email": "djumontk@va.gov",
            "bio": "demo_user24", "profile_img": "http://dummyimage.com/132x100.png/ff4444/ffffff", "password": "6XhazWJpvJu"},
        {"user_name": "aklicherl", "first_name": "Anni", "last_name": "Klicher", "email": "aklicherl@pcworld.com",
            "bio": "demo_user25", "profile_img": "http://dummyimage.com/159x100.png/ff4444/ffffff", "password": "VXPRpEADyXn"},
        {"user_name": "asummerlym", "first_name": "Adriena", "last_name": "Summerly", "email": "asummerlym@businessinsider.com",
            "bio": "demo_user26", "profile_img": "http://dummyimage.com/177x100.png/ff4444/ffffff", "password": "dkYjIOCF3"},
        {"user_name": "rtatlockn", "first_name": "Rachelle", "last_name": "Tatlock", "email": "rtatlockn@bloglines.com",
            "bio": "demo_user27", "profile_img": "http://dummyimage.com/241x100.png/dddddd/000000", "password": "IkvZZkQSVPpy"},
        {"user_name": "rboaseo", "first_name": "Roz", "last_name": "Boase", "email": "rboaseo@godaddy.com",
            "bio": "demo_user28", "profile_img": "http://dummyimage.com/224x100.png/dddddd/000000", "password": "LEphDus"},
        {"user_name": "zdavidovicip", "first_name": "Zulema", "last_name": "Davidovici", "email": "zdavidovicip@parallels.com",
            "bio": "demo_user29", "profile_img": "http://dummyimage.com/235x100.png/dddddd/000000", "password": "ypqYrERWg"},
        {"user_name": "bblackbroughq", "first_name": "Byrann", "last_name": "Blackbrough", "email": "bblackbroughq@tamu.edu",
            "bio": "demo_user30", "profile_img": "http://dummyimage.com/172x100.png/dddddd/000000", "password": "1pWRYjI"},
        {"user_name": "aneggrinir", "first_name": "Aubrey", "last_name": "Neggrini", "email": "aneggrinir@123-reg.co.uk",
            "bio": "demo_user31", "profile_img": "http://dummyimage.com/239x100.png/dddddd/000000", "password": "u3lEhx"},
        {"user_name": "vinchs", "first_name": "Vanna", "last_name": "Inch", "email": "vinchs@google.co.uk",
            "bio": "demo_user32", "profile_img": "http://dummyimage.com/202x100.png/cc0000/ffffff", "password": "UcZge7TlV"},
        {"user_name": "rdjuricict", "first_name": "Rodrigo", "last_name": "Djuricic", "email": "rdjuricict@amazon.de",
            "bio": "demo_user33", "profile_img": "http://dummyimage.com/169x100.png/ff4444/ffffff", "password": "Jf2l6OwCqU"},
        {"user_name": "cheadleyu", "first_name": "Cissy", "last_name": "Headley", "email": "cheadleyu@about.com",
            "bio": "demo_user34", "profile_img": "http://dummyimage.com/170x100.png/ff4444/ffffff", "password": "EIWsmOZl"},
        {"user_name": "phunnicotv", "first_name": "Pollyanna", "last_name": "Hunnicot", "email": "phunnicotv@creativecommons.org",
            "bio": "demo_user35", "profile_img": "http://dummyimage.com/125x100.png/5fa2dd/ffffff", "password": "lYYrByprYc"},
        {"user_name": "hportisw", "first_name": "Halie", "last_name": "Portis", "email": "hportisw@huffingtonpost.com",
            "bio": "demo_user36", "profile_img": "http://dummyimage.com/207x100.png/ff4444/ffffff", "password": "xc2EIW2"},
        {"user_name": "cmorrallx", "first_name": "Cozmo", "last_name": "Morrall", "email": "cmorrallx@gnu.org",
            "bio": "demo_user37", "profile_img": "http://dummyimage.com/105x100.png/ff4444/ffffff", "password": "VAkla6UkVU"},
        {"user_name": "mkleinermany", "first_name": "Muffin", "last_name": "Kleinerman", "email": "mkleinermany@bigcartel.com",
            "bio": "demo_user38", "profile_img": "http://dummyimage.com/225x100.png/5fa2dd/ffffff", "password": "6pZynT"},
        {"user_name": "hpattersz", "first_name": "Hope", "last_name": "Patters", "email": "hpattersz@ted.com",
            "bio": "demo_user39", "profile_img": "http://dummyimage.com/153x100.png/5fa2dd/ffffff", "password": "U1vQfh"},
        {"user_name": "jbraz10", "first_name": "Jordana", "last_name": "Braz", "email": "jbraz10@exblog.jp",
            "bio": "demo_user40", "profile_img": "http://dummyimage.com/133x100.png/ff4444/ffffff", "password": "hzSzTv"},
        {"user_name": "kmacadie11", "first_name": "Kerri", "last_name": "MacAdie", "email": "kmacadie11@upenn.edu",
            "bio": "demo_user41", "profile_img": "http://dummyimage.com/118x100.png/ff4444/ffffff", "password": "5CiHD5"},
        {"user_name": "mhamments12", "first_name": "Margi", "last_name": "Hamments", "email": "mhamments12@mayoclinic.com",
            "bio": "demo_user42", "profile_img": "http://dummyimage.com/229x100.png/dddddd/000000", "password": "6cCXjNwBXZ"},
        {"user_name": "csolley13", "first_name": "Cortie", "last_name": "Solley", "email": "csolley13@gizmodo.com",
            "bio": "demo_user43", "profile_img": "http://dummyimage.com/184x100.png/cc0000/ffffff", "password": "tPxDY5d"},
        {"user_name": "rlalevee14", "first_name": "Ronnie", "last_name": "Lalevee", "email": "rlalevee14@virginia.edu",
            "bio": "demo_user44", "profile_img": "http://dummyimage.com/212x100.png/ff4444/ffffff", "password": "tpllkwit0mc"},
        {"user_name": "pellsworthe15", "first_name": "Pieter", "last_name": "Ellsworthe", "email": "pellsworthe15@rakuten.co.jp",
            "bio": "demo_user45", "profile_img": "http://dummyimage.com/203x100.png/ff4444/ffffff", "password": "jpGJfF1Fkx4"},
        {"user_name": "dtighe16", "first_name": "Dynah", "last_name": "Tighe", "email": "dtighe16@google.it",
            "bio": "demo_user46", "profile_img": "http://dummyimage.com/248x100.png/ff4444/ffffff", "password": "9RYISdhTNGf"},
        {"user_name": "pfirby17", "first_name": "Padraic", "last_name": "Firby", "email": "pfirby17@altervista.org",
            "bio": "demo_user47", "profile_img": "http://dummyimage.com/129x100.png/ff4444/ffffff", "password": "twGFHkD"},
        {"user_name": "hgallyon18", "first_name": "Harbert", "last_name": "Gallyon", "email": "hgallyon18@hp.com",
            "bio": "demo_user48", "profile_img": "http://dummyimage.com/173x100.png/5fa2dd/ffffff", "password": "WOiRn4q8fl"},
        {"user_name": "johannigan19", "first_name": "Jessie", "last_name": "O'Hannigan", "email": "johannigan19@vimeo.com",
            "bio": "demo_user49", "profile_img": "http://dummyimage.com/124x100.png/cc0000/ffffff", "password": "G6KDmS"},
        {"user_name": "rlairdcraig1a", "first_name": "Rosalynd", "last_name": "Laird-Craig", "email": "rlairdcraig1a@state.tx.us",
            "bio": "demo_user50", "profile_img": "http://dummyimage.com/124x100.png/dddddd/000000", "password": "wA3zZBU5Z"},
        {"user_name": "tdupoy1b", "first_name": "Tamar", "last_name": "Dupoy", "email": "tdupoy1b@angelfire.com",
            "bio": "demo_user51", "profile_img": "http://dummyimage.com/104x100.png/dddddd/000000", "password": "3DsEej2RT"},
        {"user_name": "rdescroix1c", "first_name": "Rowan", "last_name": "Descroix", "email": "rdescroix1c@nba.com",
            "bio": "demo_user52", "profile_img": "http://dummyimage.com/232x100.png/dddddd/000000", "password": "ZQ3WfzXoE6"},
        {"user_name": "ncrowest1d", "first_name": "Nolie", "last_name": "Crowest", "email": "ncrowest1d@cdc.gov", "bio": "demo_user53", "profile_img": "http://dummyimage.com/180x100.png/5fa2dd/ffffff", "password": "VPTDJe1Gv1"}, {"user_name": "AAA", "first_name": "Buzz", "last_name": "Lightdays", "email": "demoUser@buzz.com", "bio": "To infinity and beyond!", "profile_img": "https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/P590855_02", "password": "password"}]

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
