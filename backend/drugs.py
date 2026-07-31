from flask import Blueprint, request, jsonify
from db import cursor, connection
import requests
import ai_overview

drug_routes = Blueprint("drugs", __name__)


@drug_routes.route("/search-drug/<drug_name>", methods=["GET"])
def search_drug(drug_name):
    url = "https://api.fda.gov/drug/label.json"

    params = {
        "search": f'openfda.generic_name:"{drug_name}"',
        "limit": 1
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        return jsonify({"error": "Drug not found"}), 404

    data = response.json()
    result = data["results"][0]
    openfda = result.get("openfda", {})

    drug_info = {
        "generic_name": openfda.get("generic_name", ["Unknown"])[0],
        "brand_name": openfda.get("brand_name", ["Unknown"])[0],
        "manufacturer": openfda.get("manufacturer_name", ["Unknown"])[0],
        "purpose": result.get("purpose", ["Not available"])[0],
        "indications": result.get("indications_and_usage", ["Not available"])[0],
        "dosage": result.get("dosage_and_administration", ["Not available"])[0],
        "warnings": result.get("warnings", ["Not available"])[0],
        "adverse_reactions": result.get("adverse_reactions", ["Not available"])[0]
    }

    return jsonify(drug_info)


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



@drug_routes.route("/ai-summary", methods=["POST"])
def ai_summary():

    data = request.get_json()

    summary = ai_overview.generate_summary(data["drugData"])

    return jsonify({
        "summary": summary
    })