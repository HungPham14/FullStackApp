from flask import Flask
from flask_cors import CORS
# import os

# template_dir = os.path.join(os.getcwd(),'frontend','templates')
# static_dir = os.path.join(template_dir,'static')

app = Flask(
    __name__
    # ,template_folder=template_dir
    # ,static_folder=static_dir
)
CORS(app) # Initializes Cross Origin Resource sharing for the application.