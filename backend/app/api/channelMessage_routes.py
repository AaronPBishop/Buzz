from flask import Blueprint, request
from flask_login import login_required
from app.models import ChannelMessage, db

channelMessage_routes = Blueprint('channelMessage', __name__)

# * Get a channelMessage **************************************************************
# ? THIS ROUTE WORKS!!!!!!!

@channelMessage_routes.route('/<int:id>')
# @login_required
def get_channelMessage(id):
    queried_channelMessage = ChannelMessage.query.get_or_404(id)
    return queried_channelMessage.to_dict()

# * Create a channelMessage **************************************************************
# ? THIS ROUTE WORKS!!!!!!!

@channelMessage_routes.route('/', methods=['POST'])
# @login_required
def create_channelMessage():
    req_data = request.json

    new_channelMessage = ChannelMessage(
        message=req_data['message'],
        channel_id=req_data['channelId'],
        user_id=req_data['userId']
    )

    db.session.add(new_channelMessage)
    db.session.commit()
    return new_channelMessage.to_dict()

# * Edit a channelMessage ****************************************************************
# ? THIS ROUTE WORKS!!!!!!!
@channelMessage_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_channelMessage(id):
    queried_channelMessage = ChannelMessage.query.get_or_404(id)
    req_data = request.json
    for key, val in req_data.items():
        if key != None:
            setattr(queried_channelMessage, key, val)
    db.session.commit()

    return queried_channelMessage.to_dict()

# * Delete a channelMessage ****************************************************************
# ? THIS ROUTE WORKS!!!!!!!

@channelMessage_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_channelMessage(id):
    queried_channelMessage = ChannelMessage.query.get_or_404(id)

    # if queried_user.id == requestorId:
    db.session.delete(queried_channelMessage)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200
