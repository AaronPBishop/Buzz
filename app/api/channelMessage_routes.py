from flask import Blueprint, request
from flask_login import login_required
from app.models import ChannelMessage, db, Image

channelMessage_routes = Blueprint('channelMessage', __name__)

# * Get a channelMessage **************************************************************


@channelMessage_routes.route('/<int:id>')
@login_required
def get_channelMessage(id):
    queried_channelMessage = ChannelMessage.query.get_or_404(id)
    return queried_channelMessage.to_dict()

# * Edit a channelMessage ****************************************************************


@channelMessage_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_channelMessage(id):
    queried_channelMessage = ChannelMessage.query.get_or_404(id)
    req_data = request.json
    for key, val in req_data.items():
        if key != None:
            setattr(queried_channelMessage, key, val)
    db.session.commit()

    return queried_channelMessage.basic_dict()

# * Delete a channelMessage ****************************************************************


@channelMessage_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_channelMessage(id):
    queried_channelMessage = ChannelMessage.query.get_or_404(id)

    db.session.delete(queried_channelMessage)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200

# * Create a channelMessage **************************************************************


@channelMessage_routes.route('/new', methods=['POST'])
@login_required
def create_channelMessage():
    req_data = request.json

    new_channelMessage = ChannelMessage(
        message=req_data['message'],
        channel_id=req_data['currChannelId'],
        user_id=req_data['userId']
    )

    db.session.add(new_channelMessage)
    db.session.commit()

    # ? Query for newly created channelMessage
    queried_channelMessage = ChannelMessage.query.get_or_404(
        new_channelMessage.id)
    if len(req_data['images']) > 0:
        for image in req_data['images']:
            if image != None:
                new_image = Image(
                    url=image,
                    channel_message_id=queried_channelMessage.id,
                    dm_message_id=None,
                    user_id=req_data['userId']
                )
                db.session.add(new_image)
                db.session.commit()

    return new_channelMessage.to_dict()
