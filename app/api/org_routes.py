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
        owner_id=req_data['userId'],
        org_image=req_data['orgImage']
    )

    db.session.add(new_org)
    db.session.commit()

    return new_org.to_dict()


# * Get/Edit and remove a user from an organization ************************************************************

@org_routes.route('/<int:org_id>', methods=['GET', 'PUT'])
@login_required
def get_edit_organization(org_id):
    queried_organization = Organization.query.get_or_404(org_id)
    req_data = request.json

    if request.method == 'GET':
        return queried_organization.to_dict()

    if request.method == "PUT":
        for key, val in req_data.items():
            if key != None and key == 'userId':
                for user in queried_organization.organization_user:
                    if user.user_id == int(val):
                        db.session.delete(user)
            if key != None and key != 'userId':
                setattr(queried_organization, key, val)

    db.session.commit()
    return queried_organization.to_dict()


# * Delete an organization ************************************************************

@org_routes.route('/<org_id>', methods=['DELETE'])
@login_required
def delete_organization(org_id):
    queried_organization = Organization.query.get_or_404(org_id)
    for assoc_user in queried_organization.organization_user:
        db.session.delete(assoc_user)

    db.session.delete(queried_organization)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 200


# * Add a user to an organization ********************************************************

@org_routes.route('/new_user', methods=['POST'])
@login_required
def add_user():
    req_data = request.json
    queried_org = Organization.query.get_or_404(req_data['orgId'])

    for key, val in req_data.items():
        if key != None and key in ['email', 'user_name']:
            user = {key: val}
            new_user = db.session.query(User).filter_by(**user).first()
            if new_user is None:
                return "User does not exist", 404
            association = User_Org_Association(
                organization_id=queried_org.id,
                user_id=new_user.id,
                parent=queried_org,
                child=new_user
            )

            queried_org.organization_user.append(association)
            new_user.user_organization.append(association)

            db.session.add(association)

    db.session.commit()

    return queried_org.add_user()
