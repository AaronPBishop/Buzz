from flask import Blueprint, request
from flask_login import login_required
from app.models import DmMessage, db


dmMessage_routes = Blueprint('dmMessage', __name__)

# * Get a dmMessage **************************************************************
# ? THIS ROUTE WORKS!!!!!!!

@dmMessage_routes.route('/<int:id>')
# @login_required
def get_dmMessage(id):
    queried_dmMessage = DmMessage.query.get_or_404(id)
    return queried_dmMessage.to_dict()

# * Create a dmMessage **************************************************************
# ? THIS ROUTE WORKS!!!!!!!

@dmMessage_routes.route('/', methods=['POST'])
# @login_required
def create_dmMessage():
    req_data = request.json

    new_dmMessage = DmMessage(
        message=req_data['message'],
        dmMessage_channel_id=req_data['dmMessage_channelId'],
        user_id=req_data['userId']
    )

    db.session.add(new_dmMessage)
    db.session.commit()
    return new_dmMessage.to_dict()

# * Edit a dmMessage ****************************************************************
# ? THIS ROUTE WORKS!!!!!!!
@dmMessage_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_dmMessage(id):
    queried_dmMessage = DmMessage.query.get_or_404(id)
    req_data = request.json
    for key, val in req_data.items():
        if key != None:
            setattr(queried_dmMessage, key, val)
    db.session.commit()

    return queried_dmMessage.to_dict()

# * Delete a dmMessage ****************************************************************
# ? THIS ROUTE WORKS!!!!!!!


@dmMessage_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_dmMessage(id):
    queried_dmMessage = DmMessage.query.get_or_404(id)

    # if queried_user.id == requestorId:
    db.session.delete(queried_dmMessage)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200
