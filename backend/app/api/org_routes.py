from flask import Blueprint, request
from flask_login import login_required
from app.models import Organization, User, User_Org_Association, Channel, db

org_routes = Blueprint('organizations', __name__)

# * Create a new organization ************************************************************
@org_routes.route('/', methods=['POST'])
@login_required
def create_organization():
    req_data = request.json

    new_org = Organization(
        name=req_data['name'],
        owner_id=req_data['userId']
    )

    db.session.add(new_org)
    db.session.commit()

    # TODO Verify auto-returned status code is 203
    return new_org.to_dict()


# * Get/Edit an organization ************************************************************
@org_routes.route('/<org_id>', methods=['GET', 'PUT'])
# @login_required
def get_edit_organization(org_id):
    queried_organization = Organization.query.get_or_404(org_id)
    req_data = request.json

    if request.method == 'GET':
        return queried_organization.to_dict()

    queried_organization.name = req_data['name']
    queried_organization.org_image = req_data['org_image']

    db.session.commit()

    return queried_organization.to_dict()


# * Delete an organization ************************************************************
@org_routes.route('/<org_id>/<user_id>', methods=['DELETE'])
@login_required
def delete_organization(org_id, user_id):
    queried_organization = Organization.query.get_or_404(org_id)

    if queried_organization.owner_id == user_id:
        db.session.delete(queried_organization)
        db.session.commit()

        return {'message': 'Successfully deleted'}, 200


# * Add a user to an organization ********************************************************
@org_routes.route('/new_user', methods=['POST'])
# @login_required
def add_user():
    req_data = request.json

    queried_org = Organization.query.get_or_404(req_data['orgId'])
    user_to_add = User.query.get_or_404(req_data['userId'])

    association = User_Org_Association(
        organization_id=queried_org.id,
        user_id=user_to_add.id,
        parent=queried_org,
        child=user_to_add
    )

    queried_org.organization_user.append(association)
    user_to_add.user_organization.append(association)

    db.session.add(association)
    db.session.commit()

    return queried_org.to_dict()
