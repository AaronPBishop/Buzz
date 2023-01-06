from flask import Blueprint, request
from flask_login import login_required
from app.models import Organization, User, db, User_Org_Association
from werkzeug.security import generate_password_hash

user_routes = Blueprint('users', __name__)

# * Get a user ***************************************************************


@user_routes.route('/<int:user_id>')
# @login_required
def get_user(user_id):
    queried_user = User.query.get_or_404(user_id).to_dict()

    return queried_user

# # * Create a user ************************************************************

#! duplicated route (similar to the signup route in auth_routes)
# @user_routes.route('/', methods=['POST'])
# def create_user():

#     req_data = request.json
#     queried_org = Organization.query.get_or_404(1)

#     new_user = User(
#         user_name=req_data['user_name'],
#         first_name=req_data['first_name'],
#         last_name=req_data['last_name'],
#         email=req_data['email'],
#         bio=req_data['bio'],
#         profile_img=req_data['profile_img'],
#         hashed_password=req_data['password'],
#     )

#     db.session.add(new_user)

#     association = User_Org_Association(
#         organization_id=queried_org.id,
#         user_id=new_user.id,
#         parent=queried_org,
#         child=new_user
#     )

#     queried_org.organization_user.append(association)
#     new_user.user_organization.append(association)

#     db.session.add(association)

#     db.session.commit()

#     return new_user.to_dict()


# * Edit a user ************************************************************

@user_routes.route('/<id>', methods=['PUT'])
# @login_required
def edit_user(id):
    queried_user = User.query.get_or_404(id)
    req_data = request.json

    for key, val in req_data.items():
        if key != None and key != "password":
            setattr(queried_user, key, val)

        if key != None and key == 'hashed_password':
            setattr(queried_user, key, generate_password_hash(val))

    db.session.commit()
    return queried_user.basic_dict()


# * Delete a user ************************************************************

@user_routes.route('/<id>', methods=['DELETE'])
# @login_required
def delete_user(id):
    queried_user = User.query.get_or_404(id)

    # if queried_user.id == requestorId:
    db.session.delete(queried_user)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200

