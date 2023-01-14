from app.models.user_dm_message_channel import User_DmMessage_Channel
from flask import Blueprint, request
from flask_login import login_required
from app.models import User, DmMessage_Channel, db

dm_message_channels_routes = Blueprint('dm_message_channels', __name__)

# * Get a dm_message_channel **************************************************************


@dm_message_channels_routes.route('/<int:id>')
@login_required
def get_dm_message_channel(id):
    queried_dm_message_channel = DmMessage_Channel.query.get_or_404(id)

    return queried_dm_message_channel.to_dict()


# * Create a dm_message_channel ************************************************************

@dm_message_channels_routes.route('/create', methods=['POST'])
@login_required
def create_dm_message_channel():
    req_data = request.json

    new_dm_message_channel = DmMessage_Channel(
        organization_id=req_data['organization_id'],
        owner_id=req_data['ownerId'],
    )

    db.session.add(new_dm_message_channel)
    db.session.commit()

# ? Query for newly created channel
    queried_dm_message_channel = DmMessage_Channel.query.get_or_404(
        new_dm_message_channel.id)

# ? Query for channel owner
    queried_channel_owner = User.query.get_or_404(req_data['ownerId'])

    # * Add recipients to channel users
    for user in req_data['users']:
        if user != None:
            user_obj = {"email": user}
            new_user = db.session.query(User).filter_by(**user_obj).first()
            association = User_DmMessage_Channel(
                dm_message_channel_id=queried_dm_message_channel.id,
                user_id=new_user.id,
                parent=queried_dm_message_channel,
                child=new_user
            )
            queried_dm_message_channel.dm_message_channel_user.append(
                association)
            new_user.user_dm_message_channel.append(association)

    # * Add owner to channel users
    association = User_DmMessage_Channel(
        dm_message_channel_id=queried_dm_message_channel.id,
        user_id=queried_channel_owner.id,
        parent=queried_dm_message_channel,
        child=queried_channel_owner
    )
    queried_dm_message_channel.dm_message_channel_user.append(
        association)
    queried_channel_owner.user_dm_message_channel.append(association)
    db.session.commit()
    return new_dm_message_channel.to_dict()


# * Remove a dm_message_channel user ****************************************************************


@dm_message_channels_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_dm_message_channel(id):
    queried_dm_message_channel = DmMessage_Channel.query.get_or_404(id)
    req_data = request.json

    for key, val in req_data.items():
        if key != None and key == 'userId':
            for user in queried_dm_message_channel.dm_message_channel_user:
                if user.user_id == int(val):
                    db.session.delete(user)

    db.session.commit()
    return queried_dm_message_channel.to_dict()


# * Delete a dm_message_channel ****************************************************************

@dm_message_channels_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_dm_message_channel(id):
    queried_dm_message_channel = DmMessage_Channel.query.get_or_404(id)


    db.session.delete(queried_dm_message_channel)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200
