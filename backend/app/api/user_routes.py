from flask import Blueprint, request
from flask_login import login_required
from app.models import Organization, User, Channel, ChannelMessage, DmMessage, DMS, Image

user_routes = Blueprint('users', __name__)

@user_routes.route('/<id>')
@login_required
def get_user(id):
    queried_user = User.query.get_or_404(id)

    return queried_user.to_dict()