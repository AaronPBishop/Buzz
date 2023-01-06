from flask import Blueprint, request
from flask_login import login_required
from app.models import Image, db


image_routes = Blueprint('image', __name__)

# * Get a dmMessage **************************************************************


@image_routes.route('/<int:id>')
# @login_required
def get_image(id):
    queried_image = Image.query.get_or_404(id)
    return queried_image.to_dict()

# * Create a dmMessage **************************************************************


@image_routes.route('/', methods=['POST'])
# @login_required
def create_image():
    req_data = request.json

    new_image = Image(
        url=req_data['url'],
        channel_message_id=req_data['channel_messageId'],
        dm_message_id=req_data['dm_messageId'],
        user_id=req_data['userId']
    )

    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()

# * Edit a dmMessage ****************************************************************

@image_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_image(id):
    queried_image = Image.query.get_or_404(id)
    req_data = request.json
    for key, val in req_data.items():
        if key != None:
            setattr(queried_image, key, val)
    db.session.commit()

    return queried_image.to_dict()

# * Delete a dmMessage ****************************************************************


@image_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_image(id):
    queried_image = Image.query.get_or_404(id)

    # if queried_user.id == requestorId:
    db.session.delete(queried_image)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200
