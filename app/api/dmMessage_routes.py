from flask import Blueprint, request
from flask_login import login_required
from app.models import DmMessage, Image, db


dm_message_routes = Blueprint('dm_message', __name__)

# * Get a dm_message **************************************************************


@dm_message_routes.route('/<int:id>')
@login_required
def get_dm_message(id):
    queried_dm_message = DmMessage.query.get_or_404(id)
    return queried_dm_message.to_dict()

# * Create a dm_message **************************************************************


@dm_message_routes.route('/new', methods=['POST'])
@login_required
def create_dm_message():
    req_data = request.json

    new_dm_message = DmMessage(
        message=req_data['message'],
        dm_message_channel_id=req_data['currChannelId'],
        user_id=req_data['userId']
    )

    db.session.add(new_dm_message)
    db.session.commit()

# ? Query for newly created channelMessage
    queried_dm_message = DmMessage.query.get_or_404(new_dm_message.id)
    if len(req_data['images']) > 0:
        for image in req_data['images']:
            if image != None:
                new_image = Image(
                    url=image,
                    channel_message_id=None,
                    dm_message_id=queried_dm_message.id,
                    user_id=req_data['userId']
                )
                db.session.add(new_image)
                db.session.commit()

    return new_dm_message.to_dict()

# * Edit a dm_message ****************************************************************


@dm_message_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_dm_message(id):
    req_data = request.json

    queried_dm_message = DmMessage.query.get_or_404(id)

    for key, val in req_data.items():
        if key != None:
            setattr(queried_dm_message, key, val)
    db.session.commit()

    return queried_dm_message.to_dict()

# * Delete a dm_message ****************************************************************


@dm_message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_dm_message(id):
    queried_dm_message = DmMessage.query.get_or_404(id)

    db.session.delete(queried_dm_message)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200
