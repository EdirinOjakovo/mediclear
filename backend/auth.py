from flask import Blueprint, request, jsonify
from db import cursor, connection
import bcrypt

auth_routes = Blueprint("auth", __name__)

@auth_routes.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    )

    cursor.execute(
        """
        INSERT INTO users(username,email,password_hash)
        VALUES(%s,%s,%s)
        """,
        (username,email,hashed.decode())
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
        """
        SELECT id,password_hash
        FROM users
        WHERE email=%s
        """,
        (email,)
    )

    user = cursor.fetchone()

    if user is None:
        return jsonify({"error":"User not found"}),404

    user_id = user[0]
    stored_hash = user[1]

    if bcrypt.checkpw(password.encode(), stored_hash.encode()):

        return jsonify({
            "message":"Login successful",
            "user_id":user_id
        })

    return jsonify({"error":"Incorrect password"}),401