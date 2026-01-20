import os
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
from flask import Flask
from flask import request
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_moment import Moment
from flask_babel import Babel, lazy_gettext as _l

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

login = LoginManager(app)
login.login_view = 'login'
login.login_message_category = 'warning'
login.login_message = _l('Please log in to access this page.')

mail = Mail(app)
moment = Moment(app)
babel = Babel(app)

@babel.localeselector
def get_locale():
        return request.accept_languages.best_match(app.config['LANGUAGES'])

# ===== CLI CODE DIRECTLY IN __init__.py =====
import click

@app.cli.group()
def translate():
    """Translation and localization commands."""
    pass

@translate.command()
def update():
    """Update all languages."""
    if os.system('pybabel extract -F babel.cfg -k _l -o messages.pot .'):
        raise RuntimeError('extract command failed')
    if os.system('pybabel update -i messages.pot -d app/translations'):
        raise RuntimeError('update command failed')
    os.remove('messages.pot')
    click.echo('Translations updated!')

@translate.command()
def compile():
    """Compile all languages."""
    if os.system('pybabel compile -d app/translations'):
        raise RuntimeError('compile command failed')
    click.echo('Translations compiled!')

@translate.command()
@click.argument('lang')
def init(lang):
    """Initialize a new language."""
    if os.system('pybabel extract -F babel.cfg -k _l -o messages.pot .'):
        raise RuntimeError('extract command failed')
    if os.system('pybabel init -i messages.pot -d app/translations -l ' + lang):
        raise RuntimeError('init command failed')
    os.remove('messages.pot')
    click.echo(f'Language {lang} initialized!')
# ===== END CLI CODE =====

from app import routes, models, errors

if not app.debug:
        if app.config['MAIL_SERVER']:
                auth = None
                if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
                        auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
                secure = None
                if app.config['MAIL_USE_TLS']:
                        secure = ()
                mail_handler = SMTPHandler(
                        mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
                        fromaddr='no-reply@' + app.config['MAIL_SERVER'],
                        toaddrs=app.config['ADMINS'], subject='Microblog Failure',
                        credentials=auth, secure=secure
                )
                mail_handler.setLevel(logging.ERROR)
                app.logger.addHandler(mail_handler)
        
        if not os.path.exists('logs'):
                os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/microblog.log', maxBytes=10240, backupCount=10)
        file_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)
        app.logger.setLevel(logging.INFO)
        app.logger.info('Microblog startup')









