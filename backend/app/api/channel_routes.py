from backend.app.models.user_channels import User_Channel_Association
from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Channel, ChannelMessage, DmMessage, DMS, Image, db

channels_routes = Blueprint('channels', __name__)

# * Get a channel **************************************************************
# ? THIS ROUTE WORKS!!!!!!!
@channels_routes.route('/<int:id>')
# @login_required
def get_channel(id):
    queried_channel = Channel.query.get_or_404(id)

    return queried_channel.to_dict()


# * Create a channel ************************************************************
# ? THIS ROUTE WORKS!!!!!!!
@channels_routes.route('/', methods=['POST'])
# @login_required
def create_channel():
    req_data= request.json
    print(req_data)

    new_channel = Channel(
        name= req_data['name'],
        # ! organization_id to be populated from the session orgId
        organization_id=req_data['organization_id']
    )

    db.session.add(new_channel)
    db.session.commit()

    return new_channel.to_dict()


# * Edit a channel ****************************************************************
# ! add users and remove users within this route. Only owner can remove users though.
@channels_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_channel(id):
    queried_channel = Channel.query.get_or_404(id)
    req_data= request.json

    # if queried_channel.owner_id == requestorId:
    queried_channel.name= req_data['name']
    queried_channel.organization_id = req_data['orgId']
    # queried_channel.channel_user = req_data['users']

    db.session.commit()
    return queried_channel.to_dict()


# * Delete a channel ****************************************************************
# ? THIS ROUTE WORKS!!!!!!!
@channels_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_channel(id):
    queried_channel = Channel.query.get_or_404(id)

    # if queried_user.id == requestorId:
    db.session.delete(queried_channel)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200


# * Add users to channel[GENERAL CHANNEL MEMEBER] ****************************************************************
@channels_routes.route('/new_user', methods=['POST'])
# @login_required
def add_user_to_channel():
    req_data = request.json

    queried_channel = Channel.query.get_or_404(req_data['channelId'])
    user_to_add = User.query.get_or_404(req_data['userId'])

    association = User_Channel_Association(
        channel_id=queried_channel.id,
        user_id=user_to_add.id,
        parent=queried_channel,
        child=user_to_add
    )

    queried_channel.channel_user.append(association)
    user_to_add.user_channel.append(association)

    # if queried_channel.owner_id == requestorId:
    # queried_channel.name= req_data['name']
    # queried_channel.organization_id = req_data['orgId']
    # queried_channel.channel_user = req_data['users']
    db.session.add(association)
    db.session.commit()

    return queried_channel.to_dict()
