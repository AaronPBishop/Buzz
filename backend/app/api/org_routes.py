from flask import Blueprint, request
from flask_login import login_required
from app.models import Organization, User, User_Org_Association, Channel, db

org_routes = Blueprint('organizations', __name__)

# * Create a new organization ************************************************************
# ? THIS ROUTE WORKS!!!!!!

@org_routes.route('/', methods=['POST'])
# @login_required
def create_organization():
    req_data = request.json

    new_org = Organization(
        name=req_data['name'],
        owner_id=req_data['userId'],
        org_image=req_data['orgImage']
    )

    db.session.add(new_org)
    db.session.commit()

    return new_org.basic_dict()


# * Get/Edit and remove a user from an organization ************************************************************
# ? THIS ROUTE WORKS!!!!!!
@org_routes.route('/<int:org_id>', methods=['GET', 'PUT'])
@login_required
def get_edit_organization(org_id):
    queried_organization = Organization.query.get_or_404(org_id)
    req_data = request.json
    if request.method == 'GET' and req_data.userId == queried_organization.owner_id:
        return queried_organization.owner_dict()
    if request.method == 'GET' and req_data.userId != queried_organization.owner_id:
        return queried_organization.basic_dict()

    if request.method == "PUT":
        for key, val in req_data.items():
            if key != None and key == 'userId':
                for user in queried_organization.organization_user:
                    if user.user_id == val:
                        db.session.delete(user)
            if key != None and key != 'userId':
                setattr(queried_organization, key, val)

    db.session.commit()
    return queried_organization.to_dict()


# * Delete an organization ************************************************************
# ? THIS GET ROUTE WORKS!!!!!!
@org_routes.route('/<org_id>', methods=['DELETE'])
@login_required
def delete_organization(org_id):
    queried_organization = Organization.query.get_or_404(org_id)
#! if queried_organization.owner_id == int(user_id):
    for assoc_user in queried_organization.organization_user:
        db.session.delete(assoc_user)

    db.session.delete(queried_organization)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 200


# * Add a user to an organization ********************************************************
# ? THIS ROUTE WORKS!!!!!!
@org_routes.route('/new_user', methods=['POST'])
@login_required
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

    return queried_org.add_user()
