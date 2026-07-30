from flask import Flask
from flask_cors import CORS

from auth import auth_routes
from drugs import drug_routes

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
app.register_blueprint(auth_routes)
app.register_blueprint(drug_routes)

if __name__ == "__main__":
    app.run(debug=True)