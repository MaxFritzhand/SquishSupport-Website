from flask import Flask, jsonify, request, json , render_template, send_from_directory
from flask_pymongo import PyMongo 
from bson import ObjectId 
from datetime import datetime 
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity
from dotenv import load_dotenv
from flask_mail import Mail, Message
from firebase_admin import credentials, firestore, initialize_app
import uuid
import os
import pdb


# app = Flask(__name__, static_folder="build/static", template_folder="build")
app = Flask(__name__)

# INITIALIZE Firestore DB
cred = credentials.Certificate('./key.json')
default_app = initialize_app(cred)
db = firestore.client()
prereg_user = db.collection('Preregistration Users')


# .env
load_dotenv()

########## DB Connection ##########
app.config['MONGO_DBNAME'] = os.getenv("MONGO_DBNAME")
app.config['MONGO_URI'] = os.getenv("MONGO_URI")
app.config['JWT_SECRET_KEY'] = 'secret'
########## Mail Config ##########
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
# app.config['MAIL_DEBUG'] = True
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_MAX_EMAILS'] = None
app.config['MAIL_SUPPRESS_SEND'] = False
app.config['MAIL_ASCII_ATTACHMENTS'] = False

mail = Mail(app)
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

# @app.route('/testing', methods=['POST'])
# def index():
#     users = mongo.db.users 
#     return str(users)

############# PRE REGISTRATION #############
@app.route('/preregister', methods=["POST"])
def preregister():
    try:
        id = str(uuid.uuid4())
        prereg_user.document(id).set(request.get_json())
        return jsonify({"success": True}), 200
        # return str(request.headers['name'])
    except Exception as e:
        return f"An Error Occured: {e}"

############# Register User #############

@app.route('/users/register', methods=["POST"])
def register():
    users = mongo.db.users
    result = ''
    email = request.get_json()['email']
    user_found = users.find_one({'email': email})

    if not user_found:
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
        created = datetime.utcnow()


        user_id = users.insert({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'password': password,
            'university': 'null',
            'phone': 'null',
            'experience': 'null',
            'zipcode': 'null',
            'city': 'null',
            'state': 'null',
            'specialties': 'null',
            'activated': 'false',
            'completed_specialties': 'false',
            'completed_profile': 'false',
            'finished_onboarding': 'false',
            'created': created 
        })


        new_user = users.find_one({'_id': user_id})
        access_token = create_access_token(identity = {
            'first_name': new_user['first_name'],
            'last_name': new_user['last_name'],
            'email': new_user['email']
        })


        result = jsonify({'token': access_token, 'email': new_user['email']})
    elif user_found:
        result = jsonify({"invalidEmail":"Email Already In Use"})
    else:
        result = jsonify({"error":"Invalid Password"})
    return result 
############# Activate User #############
@app.route('/users/activate', methods=['POST'])
def activate():
    users = mongo.db.users
    email = request.get_json()['email']
    result = ''

    response = users.find_one({'email': email})
    if response:
        result = jsonify({"success" : "Confirmed Activation Code"})
    else:
        result = jsonify({"error" : "Unable to Activate User"})
    return result
############# Login User #############
@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users 
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ''
    
    if password:
        response = users.find_one({'email': email})
        if response:
            if bcrypt.check_password_hash(response['password'], password):
                access_token = create_access_token(identity = {
                    'first_name': response['first_name'],
                    'last_name': response['last_name'],
                    'email': response['email']
                })    
                result = jsonify({'token':access_token, 'email':response['email']})   
            else:
                result = jsonify({"invalidPass": "Incorrect Password Entered"})
        else:
            result = jsonify({"invalidEmail":"Email Address Not Found"})
    return result
    
############ Change Password and Login #############
@app.route('/users/changepassword', methods=['POST'])
def change_password():
    users = mongo.db.users
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    result = ''

    if password:
        response = users.find_one({'email': email})
        if response:
            users.update_one({'email': email}, {'$set': {'password': password}})
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email': response['email']
            })
            result = jsonify({'token':access_token, 'email':response['email']})   
        else:
            result = jsonify({'error': 'Failed to Update New Password'})
    
    return result 

############# Login from Activation Code #############
@app.route('/users/activation-login', methods=['POST'])
def activation_login():
    users = mongo.db.users 
    code = request.get_json()['code']
    email = request.get_json()['email']
    result = ''

    if code:
        response = users.find_one({'email': email})
        if response:
            access_token = create_access_token(identity = {
                'first_name': response['first_name'],
                'last_name': response['last_name'],
                'email':email
            })
            users.update_one({'email': email}, {'$set': {'activated': 'true'}})
            result = jsonify({'token': access_token, 'email': email})
        else:
            result = jsonify({'invalidEmail': "Email Address Not Found"})
    return result

############# Check Activated User #############
@app.route('/users/check-activation', methods=["POST"])
def check_activation():
    users = mongo.db.users 
    email = request.get_json()['email']
    result = ''

    if email: 
        response = users.find_one({'email': email})
        if response: 
            activated_status = response['activated']
            result = jsonify({'activated': activated_status})
        else:
            result = jsonify({'error': 'User Not Found'})
    return result
############# Find User for Profile Page #############
@app.route('/users/getuser', methods=['POST'])
def get_user():
    users = mongo.db.users
    email = request.get_json()['email']
    result = ''

    if email:
        response = users.find_one({'email': email})
        if response:
            first_name = response['first_name']
            last_name = response['last_name']
            experience = response['experience']
            name = first_name + ' ' + last_name
            result = jsonify({'name': name, 'experience': experience, 'city': response['city'], 'state': response['state'], 'specialties': response['specialties'], 'university': response['university']})
        else:
            result = jsonify({'error': 'Cant Find That User'})
    return result
############# Check Onboarding Status  ############# 
@app.route('/onboarding-status', methods=["POST"])
def onboarding_status():
    users = mongo.db.users
    email = request.get_json()['email']
    result = ''

    if email:
        response = users.find_one({'email': email})
        if response:
            finished_onboarding = response['finished_onboarding']
            if finished_onboarding: 
                result = jsonify({'onboarding_status': finished_onboarding})
            else:
                result = jsonify({'onboarding_status': finished_onboarding})
        else:
            result = jsonify({'error': 'Cant Find That User'})
    return result

############# Check Specialties Status  ############# 
@app.route('/specialties-status', methods=["POST"])
def specialties_status():
    users = mongo.db.users
    email = request.get_json()['email']
    result = ''

    if email:
        response = users.find_one({'email': email})
        if response:
            specialties_status = response['completed_specialties']
            if specialties_status: 
                result = jsonify({'specialties_status': specialties_status})
            else:
                result = jsonify({'specialties_status': specialties_status})
        else:
            result = jsonify({'error': 'Cant Find That User'})
    return result

############# Check Complete Profile Status  ############# 
@app.route('/profile-status', methods=["POST"])
def profile_status():
    users = mongo.db.users
    email = request.get_json()['email']
    result = ''

    if email:
        response = users.find_one({'email': email})
        if response:
            profile_status = response['completed_profile']
            if profile_status: 
                result = jsonify({'profile_status': profile_status})
            else:
                result = jsonify({'profile_status': profile_status})
        else:
            result = jsonify({'error': 'Cant Find That User'})
    return result

############# Save Specialties #############
@app.route('/users/specialty', methods=['POST'])
def specialty():
    users = mongo.db.users
    specialties = request.get_json()['specialties']
    email = request.get_json()['email']
    result = ''

    users.update_one({'email': email}, {'$set': {'specialties': specialties , 'completed_specialties': 'true'}})
    result = 'User Specialties Added'

    return result

############# Complete Profile #############
@app.route('/users/complete-profile', methods=['POST'])
def complete_profile():
    users = mongo.db.users
    email = request.get_json()['email']
    university = request.get_json()['university']
    phone = request.get_json()['phone']
    experience = request.get_json()['experience']
    zipcode = request.get_json()['zipcode']
    city = request.get_json()['city']
    state = request.get_json()['state']
    result = ''
    
    users.update_one({'email': email}, {'$set': {'completed_profile': 'true', 'university': university, 'phone': phone, 'experience': experience, 'zipcode': zipcode, 'city': city, 'state': state, 'finished_onboarding': 'true'}})
    result = "User Profile Information Updated"
    return result


############# Emailing Activation Key #############
@app.route('/email-activation-key', methods=["POST"])
def email_activation_key():
    result = ''
    msg = Message(subject="Squish Account Activation", recipients=[request.get_json()['email']])
    code = request.get_json()['code']
    msg.html = f"Welcome To Squish! <br><br> Enter the 4-digit code below. <br><br> <h2>{code}</h2> <br><br> Thank you for choosing Squish. We can't wait for you to use our platform!"
    mail.send(msg)
            
            
    result = jsonify({'key': request.get_json()['code'], 'email': request.get_json()['email']})

    return result


############# Emailing Confirmation Code #############
@app.route('/confirmationcode', methods=['POST'])
def confirmation_code():
    users = mongo.db.users
    email = request.get_json()['email']
    result = ''

    response = users.find_one({'email': email})

    if response:
        msg = Message(subject="Reset Password Link", recipients=[request.get_json()['email']])
        code = request.get_json()['code']
        # link = request.get_json()['link']
        msg.html = f"Hey There! <br><br> Enter the 4-digit code below. <br><br> <h2>{code}</h2> <br><br> Thank you for choosing Squish. We can't wait for you to keep using our platform!"
        mail.send(msg)
        result = jsonify({'status': "Message Sent"})
    else:
        result = jsonify({'error': "Email Address Not Found"})

    return result
############# Resending Activation Code #############
@app.route('/resendcode', methods=['POST'])
def resend_code():
    result = ''
    email = request.get_json()['email']
    msg = Message(subject="Here's your new Activation Key!", recipients=[request.get_json()['email']])
    code = request.get_json()['code']
    # link = request.get_json()['link']
    msg.html = f"Hey There! <br><br> Enter the 4-digit code below. <br><br> <h2>{code}</h2> <br><br> Thank you for choosing Squish. We can't wait for you to get started on our platform!"
    mail.send(msg)

    result = jsonify({'status': "Message Sent", 'email': email})

    return result   
############# Contact Us #############
@app.route('/contact', methods=["POST"])
def contact():
    msg = Message(subject="Squish received a message!", sender="squishbackend@gmail.com", recipients=["squishbackend@gmail.com"])
    name = request.get_json()['name']
    email = request.get_json()['email']
    message = request.get_json()['message']
    result = jsonify({"status": "Message Has Been Sent"})

    msg.html = f"Name: {name} <br> Email: {email} <br> {message}"
    mail.send(msg)
    return result

if __name__ == '__main__':
    app.run(debug=True)