from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Channel, ChannelMessage, DmMessage, DMS, Image, db

channels_routes = Blueprint('channels', __name__)

# * Get a channel ************************************************************
@channels_routes.route('/<id>')
@login_required
def get_channel(id):
    queried_channel = Channel.query.get_or_404(id)

    return queried_channel.to_dict()


# * Create a channel ************************************************************
@channels_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    req_data= request.json
    print(req_data)

    new_user = User(
        name= req_data['name'],

    )
    db.session.add(new_user)
    db.session.commit()

    return new_user.to_dict()



# * Edit a channel ************************************************************
@channels_routes.route('/<id>/<requestorId>', methods=['PUT'])
@login_required
def edit_channel(id, requestorId):
    queried_user = User.query.get_or_404(id)
    req_data= request.json

    if queried_user.id == requestorId:
        queried_user.user_name= req_data['user_name'],
        queried_user.first_name= req_data['first_name'],
        queried_user.last_name= req_data['last_name'],
        queried_user.email= req_data['email'],
        queried_user.bio= req_data['bio'],
        queried_user.profile_img= req_data['profile_img'],
        queried_user.password= req_data['password'],

        db.session.commit()
        return queried_user.to_dict()


# * Delete a channel ************************************************************
@channels_routes.route('/<id>/<requestorId>')
@login_required
def delete_channel(id, requestorId):
    queried_user = User.query.get_or_404(id)

    if queried_user.id == requestorId:
        db.session.delete(queried_user)
        db.session.commit()

        return {'message': 'Successfully deleted'}, 200
