from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from mongoengine import connect
from mongoengine.connection import disconnect
from models import Login, Signup, User, HWSet, Transaction
import uvicorn
import ssl
import json
from passlib.hash import sha256_crypt
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI()
connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Users?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)


origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


JWT_SECRET_KEY = "super-super-super-super-super-super-super-super-super-secure-key"

def create_access_token(data: dict):
	copy_data = data.copy()
	encoded_jwt = jwt.encode(copy_data, JWT_SECRET_KEY)
	return encoded_jwt

def get_password_hash(password: str):
	return sha256_crypt.encrypt(password)


def authenticate_user(username: str, password: str):
	try:
		login = json.loads(User.objects.get(username=username).to_json())
		password_check = sha256_crypt.verify(password, login['password'])
		return password_check
	except User.DoesNotExist:
		return False

def checkout_HW(name: str, amount: int):
	set = json.loads(HWSet.objects.get(name=name).to_json())
	if amount <= set['availability']:
		return set['availability'] - amount
	else:
		return False
 
def return_HW(name: str, amount: int):
	set = json.loads(HWSet.objects.get(name=name).to_json())
	if set['availability'] + amount <= set['capacity']:
		return set['availability'] + amount
	else:
		return False

@app.post('/api/login')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Users?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	username = form_data.username
	password = form_data.password

	if authenticate_user(username, password):
		# generate token if user login sucessful
		access_token = create_access_token(data = {"sub": username})
		
		return {'access_token': access_token, 'token_type': 'bearer'}
	else:
		raise HTTPException(status_code=401, detail="Wrong username or password")

@app.post('/api/signup')
def signup(signupData: Signup):
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Users?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	if not User.objects(username=signupData.username):
		newUser = User(username = signupData.username,
						password = get_password_hash(signupData.password)
					)
		newUser.save()
		return {'message': 'New account created successfully'}
	else:
		raise HTTPException(status_code=400, detail="User already exists")

@app.post('/api/resources')
async def transaction(transaction: Transaction):
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/HWSets?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	if HWSet.objects(name=transaction.name):
		if(transaction.type == "checkout"):
			data = checkout_HW(transaction.name, transaction.amount)
			if data == False:
				raise HTTPException(status_code=400, detail="Cannot check out that many resources")
			else:
				object = HWSet.objects(name=transaction.name)
				curSet = json.loads(HWSet.objects(name=transaction.name).to_json())
				set = object.get(name=transaction.name)
				set["availability"] = data
				set.save()		
				return {'name' : transaction.name, 'capacity': curSet[0]['capacity'], 'availability' : data}

		elif(transaction.type == "checkin"):
			data = return_HW(transaction.name, transaction.amount)
			if data == False:
				raise HTTPException(status_code=400, detail="Cannot check in that many resources")
			else:
				object = HWSet.objects(name=transaction.name)
				curSet = json.loads(HWSet.objects(name=transaction.name).to_json())
				set = object.get(name=transaction.name)
				set["availability"] = data
				set.save()		
				return {'name' : transaction.name, 'capacity': curSet[0]['capacity'], 'availability' : data}		



@app.get('/api/resources')
async def get_data() -> dict:
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/HWSets?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	sets = {}
	for x in HWSet.objects():
		sets[x['name']] = x.to_json()
	return sets


if __name__ == '__main__':
	uvicorn.run(app)