from app.models.user_dmMessage_channel import User_DmMessage_Channel
from flask import Blueprint, request
from flask_login import login_required
from app.models import User, DmMessage_Channel, db

dmMessage_channels_routes = Blueprint('dmMessage_channels', __name__)

# * Get a dmMessage_channel **************************************************************


@dmMessage_channels_routes.route('/<int:id>')
@login_required
def get_dmMessage_channel(id):
    queried_dmMessage_channel = DmMessage_Channel.query.get_or_404(id)

    return queried_dmMessage_channel.to_dict()


# * Create a dmMessage_channel ************************************************************

@dmMessage_channels_routes.route('/create', methods=['POST'])
@login_required
def create_dmMessage_channel():
    req_data = request.json

    new_dmMessage_channel = DmMessage_Channel(
        organization_id=req_data['organization_id'],
        owner_id=req_data['ownerId'],
    )

    db.session.add(new_dmMessage_channel)
    db.session.commit()

# ? Query for newly created channel
    queried_dmMessage_channel = DmMessage_Channel.query.get_or_404(
        new_dmMessage_channel.id)

# ? Query for channel owner
    queried_channel_owner = User.query.get_or_404(req_data['ownerId'])

    # * Add recipients to channel users
    for user in req_data['users']:
        if user != None:
            user_obj = {"email": user}
            new_user = db.session.query(User).filter_by(**user_obj).first()
            association = User_DmMessage_Channel(
                dmMessage_channel_id=queried_dmMessage_channel.id,
                user_id=new_user.id,
                parent=queried_dmMessage_channel,
                child=new_user
            )
            queried_dmMessage_channel.dmMessage_channel_user.append(
                association)
            new_user.user_dmMessage_channel.append(association)

    # * Add owner to channel users
    association = User_DmMessage_Channel(
        dmMessage_channel_id=queried_dmMessage_channel.id,
        user_id=queried_channel_owner.id,
        parent=queried_dmMessage_channel,
        child=queried_channel_owner
    )
    queried_dmMessage_channel.dmMessage_channel_user.append(
        association)
    queried_channel_owner.user_dmMessage_channel.append(association)
    db.session.commit()
    return new_dmMessage_channel.to_dict()


# * Remove a dmMessage_channel user ****************************************************************


@dmMessage_channels_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_dmMessage_channel(id):
    queried_dmMessage_channel = DmMessage_Channel.query.get_or_404(id)
    req_data = request.json

    for key, val in req_data.items():
        if key != None and key == 'userId':
            for user in queried_dmMessage_channel.dmMessage_channel_user:
                if user.user_id == int(val):
                    db.session.delete(user)

    db.session.commit()
    return queried_dmMessage_channel.to_dict()


# * Delete a dmMessage_channel ****************************************************************

@dmMessage_channels_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_dmMessage_channel(id):
    queried_dmMessage_channel = DmMessage_Channel.query.get_or_404(id)


    db.session.delete(queried_dmMessage_channel)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200


# * Add users to dmMessage_channel ****************************************************************

@dmMessage_channels_routes.route('/new_user', methods=['POST'])
@login_required
def add_user_to_dmMessage_channel():
    req_data = request.json

    queried_dmMessage_channel = DmMessage_Channel.query.get_or_404(
        req_data['dmMessage_channelId'])
    user_to_add = User.query.get_or_404(req_data['userId'])

    association = User_DmMessage_Channel(
        dmMessage_channel_id=queried_dmMessage_channel.id,
        user_id=user_to_add.id,
        parent=queried_dmMessage_channel,
        child=user_to_add
    )

    queried_dmMessage_channel.dmMessage_channel_user.append(association)
    user_to_add.user_dmMessage_channel.append(association)

    db.session.add(association)
    db.session.commit()

    return queried_dmMessage_channel.to_dict()