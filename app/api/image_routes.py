from flask import Blueprint, request
from flask_login import login_required
from app.models import Image, db, ChannelMessage, DmMessage


image_routes = Blueprint('image', __name__)

# * Get an Image **************************************************************


@image_routes.route('/<int:id>')
@login_required
def get_image(id):
    queried_image = Image.query.get_or_404(id)
    return queried_image.to_dict()

# * Create an Image Message **************************************************************


@image_routes.route('/image_msg', methods=['POST'])
@login_required
def create_image():
    req_data = request.json

    if req_data['viewingChannel'] == True:
        new_message = ChannelMessage(
            message=None,
            channel_id=req_data['currChannelId'],
            user_id=req_data['userId']
        )

        db.session.add(new_message)
        db.session.commit()

        queried_message = db.session.query(ChannelMessage).get(new_message.id)

        new_image = Image(
            url=req_data['url'],
            channel_message_id=queried_message.id,
            dm_message_id=None,
            user_id=req_data['userId']
        )
        db.session.add(new_image)
        db.session.commit()

    if req_data['viewingDm'] == True:
        new_message = DmMessage(
            message=None,
            dmMessage_channel_id=req_data['currChannelId'],
            user_id=req_data['userId']
        )

        db.session.add(new_message)
        db.session.commit()
        queried_message = db.session.query(DmMessage).get(new_message.id)

        new_image = Image(
            url=req_data['url'],
            channel_message_id=None,
            dm_message_id=queried_message.id,
            user_id=req_data['userId']
        )
        db.session.add(new_image)
        db.session.commit()


    return queried_message.to_dict()

# * Edit an Image ****************************************************************


@ image_routes.route('/<int:id>', methods=['PUT'])
@ login_required
def edit_image(id):
    queried_image = Image.query.get_or_404(id)
    req_data = request.json
    for key, val in req_data.items():
        if key != None:
            setattr(queried_image, key, val)
    db.session.commit()

    return queried_image.to_dict()

# * Delete an Image ****************************************************************


@ image_routes.route('/<int:id>', methods=['DELETE'])
@ login_required
def delete_image(id):
    queried_image = Image.query.get_or_404(id)

    db.session.delete(queried_image)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200


# * Add an Image to an existing Message ****************************************************************


@image_routes.route('/adding_image', methods=['POST'])
@login_required
def add_image():
    req_data = request.json

    if req_data['viewingChannel'] == True:
        queried_message = db.session.query(ChannelMessage).get(req_data['messageId'])

        new_image = Image(
            url=req_data['url'],
            channel_message_id=queried_message.id,
            dm_message_id=None,
            user_id=req_data['userId']
        )
        db.session.add(new_image)
        db.session.commit()

    if req_data['viewingDm'] == True:
        queried_message = db.session.query(DmMessage).get(req_data['messageId'])

        new_image = Image(
            url=req_data['url'],
            channel_message_id=None,
            dm_message_id=queried_message.id,
            user_id=req_data['userId']
        )
        db.session.add(new_image)
        db.session.commit()


    return queried_message.to_dict()
