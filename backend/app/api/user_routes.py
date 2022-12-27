from flask import Blueprint, request
from flask_login import login_required
from app.models import Organization, User, Channel, ChannelMessage, DmMessage, DMS, Image, db

user_routes = Blueprint('users', __name__)

# ? Get a user ************************************************************
@user_routes.route('/<id>')
@login_required
def get_user(id):
    queried_user = User.query.get_or_404(id)

    return queried_user.to_dict()


# ? Create a user ************************************************************
@user_routes.route('/', methods=['POST'])
def create_user():
    req_data= request.json

    new_user = User(
        user_name= req_data['user_name'],
        first_name= req_data['first_name'],
        last_name= req_data['last_name'],
        email= req_data['email'],
        bio= req_data['bio'],
        profile_img= req_data['profile_img'],
        password= req_data['password'],
    )
    db.session.add(new_user)
    db.session.commit()

    return new_user.to_dict()



# ? Edit a user ************************************************************
@user_routes.route('/<id>/<requestorId>', methods=['PUT'])
@login_required
def edit_user(id, requestorId):
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


# ? Delete a user ************************************************************
@user_routes.route('/<id>/<requestorId>')
@login_required
def delete_user(id, requestorId):
    queried_user = User.query.get_or_404(id)

    if queried_user.id == requestorId:
        db.session.delete(queried_user)
        db.session.commit()

        return {'message': 'Successfully deleted'}, 200
