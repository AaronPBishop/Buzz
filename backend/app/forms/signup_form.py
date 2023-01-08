from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()

    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.user_name == username).first()

    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    user_name = StringField('user_name', validators=[
                            DataRequired(), username_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    bio = StringField('bio')
    profile_img = StringField('profile_img')
