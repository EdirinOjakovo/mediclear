import psycopg2
from dotenv import load_dotenv
import os

load_dotenv('../frontend/.env') #path to .env file

connection = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)

cursor = connection.cursor()

cursor.execute("SELECT version();") #executes SQL commands in posgres database

print(cursor.fetchone()) #returns one row after SELECT

# @app.route("/users")
# def users():

#     cur = conn.cursor()

#     cur.execute("SELECT * FROM users")

#     users = cur.fetchall()

#     cur.close()

#     return users