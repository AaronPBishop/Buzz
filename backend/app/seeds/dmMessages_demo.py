from app.models import db, DmMessage, environment, SCHEMA


def seed_dmMessages():
    dmMessages = [{
        "message": "Hey Bro!", "dms_id": 1, "user_id": 2},
        {"message": "How is it going?", "dms_id": 1, "user_id": 1}, {
        "message": "ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur",
        "dms_id": 1,
        "user_id": 3
    },
        {
        "message": "cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit",
        "dms_id": 2,
        "user_id": 1
    }, {
        "message": "massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim",
        "dms_id": 2,
        "user_id": 3
    }, {
        "message": "semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan",
        "dms_id": 3,
        "user_id": 4
    }, {
        "message": "neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut",
        "dms_id": 3,
        "user_id": 5
    }, {
        "message": "consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis",
        "dms_id": 4,
        "user_id": 6
    }, {
        "message": "velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id",
        "dms_id": 4,
        "user_id": 7
    }, {
        "message": "dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam",
        "dms_id": 5,
        "user_id": 8
    }, {
        "message": "curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi",
        "dms_id": 5,
        "user_id": 9
    }, {
        "message": "dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien",
        "dms_id": 6,
        "user_id": 10
    }, {
        "message": "quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non",
        "dms_id": 6,
        "user_id": 11
    }, {
        "message": "ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et",
        "dms_id": 7,
        "user_id": 12
    }, {
        "message": "nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla",
        "dms_id": 7,
        "user_id": 13
    }, {
        "message": "duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl",
        "dms_id": 8,
        "user_id": 14
    }, {
        "message": "arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget",
        "dms_id": 8,
        "user_id": 15
    }, {
        "message": "donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci",
        "dms_id": 9,
        "user_id": 16
    }, {
        "message": "magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et",
        "dms_id": 9,
        "user_id": 17
    }, {
        "message": "quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at",
        "dms_id": 10,
        "user_id": 18
    }, {
        "message": "mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis",
        "dms_id": 10,
        "user_id": 19
    }, {
        "message": "ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh",
        "dms_id": 11,
        "user_id": 20
    }, {
        "message": "purus phasellus in felis donec semper sapien a libero nam dui",
        "dms_id": 11,
        "user_id": 21
    }, {
        "message": "nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam",
        "dms_id": 12,
        "user_id": 22
    }, {
        "message": "vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing",
        "dms_id": 12,
        "user_id": 23
    }, {
        "message": "nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et",
        "dms_id": 13,
        "user_id": 24
    }, {
        "message": "sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus",
        "dms_id": 13,
        "user_id": 25
    }, {
        "message": "pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis",
        "dms_id": 14,
        "user_id": 26
    }, {
        "message": "faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend",
        "dms_id": 14,
        "user_id": 27
    }, {
        "message": "ut tellus nulla ut erat id mauris vulputate elementum nullam",
        "dms_id": 15,
        "user_id": 28
    }, {
        "message": "eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum",
        "dms_id": 15,
        "user_id": 29
    }, {
        "message": "ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non",
        "dms_id": 16,
        "user_id": 30
    }, {
        "message": "pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque",
        "dms_id": 16,
        "user_id": 31
    }, {
        "message": "feugiat non pretium quis lectus suspendisse potenti in eleifend quam a",
        "dms_id": 17,
        "user_id": 32
    }, {
        "message": "nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in",
        "dms_id": 17,
        "user_id": 33
    }, {
        "message": "nisi at nibh in hac habitasse platea dictumst aliquam augue",
        "dms_id": 18,
        "user_id": 34
    }, {
        "message": "dapibus augue vel accumsan tellus nisi eu orci mauris lacinia",
        "dms_id": 18,
        "user_id": 35
    }, {
        "message": "at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate",
        "dms_id": 19,
        "user_id": 36
    }, {
        "message": "integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi",
        "dms_id": 19,
        "user_id": 37
    }, {
        "message": "et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum",
        "dms_id": 20,
        "user_id": 38
    }, {
        "message": "aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia",
        "dms_id": 20,
        "user_id": 39
    }, {
        "message": "nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus",
        "dms_id": 21,
        "user_id": 40
    }, {
        "message": "et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam",
        "dms_id": 21,
        "user_id": 41
    }, {
        "message": "condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque",
        "dms_id": 22,
        "user_id": 42
    }, {
        "message": "lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac",
        "dms_id": 22,
        "user_id": 43
    }, {
        "message": "est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium",
        "dms_id": 23,
        "user_id": 44
    }, {
        "message": "eu massa donec dapibus duis at velit eu est congue elementum in",
        "dms_id": 23,
        "user_id": 45
    }, {
        "message": "sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi",
        "dms_id": 24,
        "user_id": 46
    }, {
        "message": "vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis",
        "dms_id": 24,
        "user_id": 47
    }, {
        "message": "cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros",
        "dms_id": 25,
        "user_id": 48
    }, {
        "message": "pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut",
        "dms_id": 25,
        "user_id": 49
    }, {
        "message": "nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
        "dms_id": 26,
        "user_id": 50
    }, {
        "message": "cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros",
        "dms_id": 26,
        "user_id": 51
    }, {
        "message": "vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis",
        "dms_id": 27,
        "user_id": 52
    }, {
        "message": "lobortis est phasellus sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac",
        "dms_id": 27,
        "user_id": 53
    }]

    db.session.add_all([DmMessage(**dmMessage) for dmMessage in dmMessages])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_dmMessages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.dmMessages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM dmMessages")

    db.session.commit()
