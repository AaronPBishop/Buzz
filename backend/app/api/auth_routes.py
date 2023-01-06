from flask import Blueprint, jsonify, session, request, render_template
from app.models import User, db, Organization, User_Org_Association
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []

    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')

    return errorMessages


# * User authentication ************************************************************
@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()

    return {'errors': ['Unauthorized']}


# * User login *********************************************************************
@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)

        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# * User logout ********************************************************************
@auth_routes.route('/logout')
def logout():
    logout_user()

    return {'message': 'User logged out'}


# * User signup ********************************************************************
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    queried_org = Organization.query.get_or_404(1)

    if form.validate_on_submit():
        user = User(
            user_name=form.data['user_name'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            email=form.data['email'],
            password=form.data['password']
        )

        db.session.add(user)

        association = User_Org_Association(
        organization_id=queried_org.id,
        user_id=user.id,
        parent=queried_org,
        child=user
    )

        queried_org.organization_user.append(association)
        user.user_organization.append(association)

        db.session.add(association)
        db.session.commit()

        login_user(user)
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# * User unauthorized ****************************************************************
@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
