from flask import Blueprint, request, jsonify
from db import cursor, connection
import bcrypt

auth_routes = Blueprint("auth", __name__)

@auth_routes.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    first_name = data["firstName"]
    last_name = data["lastName"]
    email = data["email"]
    password = data["password"]

    hashed = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    )

    cursor.execute(
        """
        INSERT INTO users(first_name, last_name, email, password_hash)
        VALUES (%s, %s, %s, %s)
        """,
        (first_name, last_name, email, hashed.decode())
    )

    connection.commit()

    return jsonify({
        "message":"User created!"
    })



@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    cursor.execute(
        "SELECT id, password_hash FROM users WHERE email=%s",
        (email,)
    )
    user = cursor.fetchone()

    if user is None:
        return jsonify({"error": "Invalid email or password"}), 401

    user_id, stored_hash = user

    if bcrypt.checkpw(password.encode(), stored_hash.encode()):
        return jsonify({"message": "Login successful", "user_id": user_id})

    return jsonify({"error": "Invalid email or password"}), 401