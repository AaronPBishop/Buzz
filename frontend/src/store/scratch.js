/******************** Buzz Redux Store Representation ********************/

const store = {
    session: {
        user: {
            id: 1,
            username: 'demo',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            bio: 'I am buzzing about Buzz',
            profile_img: 'img.img',
            user_organizations: [
                {
                    id: 1,
                    ownerId: 5,
                    organization_img: 'img.img'
                }
            ],
            user_channels: [
                {
                    id: 1,
                    ownerId: 5
                }
            ],
            dmMessage_channel: [
                {
                    id: 1,
                    owner_id: 1,
                    name: 'Buzz Channel',
                    organization_id: 2
                }
            ]
        }
    },

    organization: {
        1: {
            id: 1,
            owner_id: 5,
            organization_img: 'img.img',
            organization_user: [
                {
                    id: 1,
                    username: 'demo',
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com',
                    bio: 'I love to Buzz',
                    profile_img: 'img.img'
                }
            ],
            organization_channels: [
                {
                    id: 1,
                    owner_id: 1,
                    name: 'Buzz Channel'
                }
            ],
            organization_dmMessage_channel: [
                {
                    id: 1,
                    owner_id: 1,
                    name: {aggregateData},
                }
            ]
        },
    },

    channel: {
        1: {
            id: 1,
            owner_id: 1,
            name: 'Buzz Channel',
            organization_id: 2,
            channel_users: [
                {
                    id: 1,
                    user_name: 'BuzzyBee'
                }
            ],
            channel_cm: [
                {
                    id: 1,
                    user_id: 1,
                    user_name: 'BuzzyBee',
                    message: 'Have a buzzy day!',
                    cm_images: [
                        {
                            id: 1,
                            url: 'img.img'
                        }
                    ]
                }
            ],
        },
    },

    dmMessage_channel: {
        1: {
            id: 1,
            owner_id: 1,
            name: {aggregateData},
            organization_id: 2,
            dmMessage_channel_users: [
                {
                    id: 1,
                    user_name: 'BuzzyBee'
                },
                {
                    id: 2,
                    user_name: 'BeeBuzzer'
                }
            ],
            dmMessage_channel_dmMessage: [
                {
                    user_id: 1,
                    user_name: 'BuzzyBee',
                    message: 'Have a buzzy day!',
                    dmMessage_image: [
                        {
                            id: 1,
                            url: 'img.img'
                        }
                    ]
                }
            ],
        },
    }
};
