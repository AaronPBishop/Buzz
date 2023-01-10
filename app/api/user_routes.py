from flask import Blueprint, request
from flask_login import login_required
from app.models import Organization, User, db, User_Org_Association
from werkzeug.security import generate_password_hash

user_routes = Blueprint('users', __name__)

# * Get a user ***************************************************************

@user_routes.route('/<int:user_id>')
@login_required
def get_user(user_id):
    queried_user = User.query.get_or_404(user_id).to_dict()

    return queried_user


# * Edit a user ************************************************************

@user_routes.route('/<id>', methods=['PUT'])
@login_required
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
@login_required
def delete_user(id):
    queried_user = User.query.get_or_404(id)

    db.session.delete(queried_user)
    db.session.commit()

    return {'message': 'Successfully deleted'}, 200
