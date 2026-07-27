from flask import Blueprint, request, jsonify
from db import cursor, connection

drug_routes = Blueprint("drugs", __name__)

@drug_routes.route("/save-drug", methods=["POST"])
def save_drug():

    data = request.get_json()

    user_id = data["user_id"]
    drug_name = data["drug_name"]
    brand_name = data["brand_name"]

    cursor.execute(
        """
        INSERT INTO saved_drugs(user_id,drug_name,brand_name)
        VALUES(%s,%s,%s)
        """,
        (user_id,drug_name,brand_name)
    )

    connection.commit()

    return jsonify({
        "message":"Drug saved"
    })

@drug_routes.route("/my-library/<int:user_id>")
def my_library(user_id):

    cursor.execute(
        """
        SELECT drug_name, brand_name
        FROM saved_drugs
        WHERE user_id=%s
        """,
        (user_id,)
    )

    rows = cursor.fetchall()

    library = []

    for row in rows:
        library.append({
            "drug_name":row[0],
            "brand_name":row[1]
        })

    return jsonify(library)