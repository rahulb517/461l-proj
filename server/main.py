from re import template
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from mongoengine import connect
from mongoengine.connection import disconnect
from pydantic.main import prepare_config
from models import Login, Signup, User, HWSet, Transaction, NewProject, Project, UpdatedProject, DeleteProject, Description
import uvicorn
import ssl
import json
from passlib.hash import sha256_crypt
from jose import JWTError, jwt
from datetime import datetime, timedelta

# scraping imports
import requests
from bs4 import BeautifulSoup
import csv

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

def verify_token(token: str, user: str):
	decoded_token = jwt.decode(token, JWT_SECRET_KEY)
	return user == decoded_token['sub']

def authenticate_user(username: str, password: str):
	try:
		login = json.loads(User.objects.get(username=username).to_json())
		password_check = sha256_crypt.verify(password, login['password'])
		return password_check
	except User.DoesNotExist:
		return False

def checkout_HW(name: str, amount: int):
	set = json.loads(HWSet.objects.get(name=name).to_json())
	if amount < 0:
		return False
	if amount <= set['availability']:
		return set['availability'] - amount
	else:
		return 0
 
def return_HW(name: str, amount: int):
	set = json.loads(HWSet.objects.get(name=name).to_json())
	if amount < 0:
		return False
	if set['availability'] + amount <= set['capacity']:
		return set['availability'] + amount
	else:
		return set['capacity']

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
			avail = checkout_HW(transaction.name, transaction.amount)
			if avail == False and transaction.amount < 0:
				raise HTTPException(status_code=400, detail="Invalid Number of Hardware Chosen")
			else:
				object = HWSet.objects(name=transaction.name)
				curSet = json.loads(HWSet.objects(name=transaction.name).to_json())
				set = object.get(name=transaction.name)
				if transaction.amount > set['availability']:
					taken = set['availability']
				else:
					taken = transaction.amount
				set["availability"] = avail
				set.save()		
				return {'name' : transaction.name, 'capacity': curSet[0]['capacity'], 'availability' : avail, 'checkedOut': taken}

		elif(transaction.type == "checkin"):
			avail = return_HW(transaction.name, transaction.amount)
			if avail == False and transaction.amount < 0:
				raise HTTPException(status_code=400, detail="Invalid Number of Hardware Chosen")
			else:
				object = HWSet.objects(name=transaction.name)
				curSet = json.loads(HWSet.objects(name=transaction.name).to_json())
				set = object.get(name=transaction.name)
				if set['availability'] + transaction.amount <= set['capacity']:
					given =  transaction.amount
				else:
					given = set['capacity'] - set['availability']
				set["availability"] = avail
				set.save()		
				return {'name' : transaction.name, 'capacity': curSet[0]['capacity'], 'availability' : avail, 'checkedIn': given}		



@app.get('/api/resources')
async def get_data() -> dict:
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/HWSets?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	sets = {}
	for x in HWSet.objects():
		sets[x['name']] = x.to_json()
	return sets

@app.post('/api/projects')
def projects_create(newProject: NewProject):
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)

	if not Project.objects(project_id=newProject.project_id):
		newProj = Project(name = newProject.name,
						project_id = newProject.project_id,
						members = newProject.members,
						description = newProject.description,
						)
		for member in newProj.members:
			disconnect()
			connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Users?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
			if not User.objects(username=member):
				raise HTTPException(status_code=400, detail="Member username doesnt exist")
			currUser = User.objects(username=member).first()
			currUser.projects.append(newProj.project_id)
			currUser.save()
			disconnect()
			connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
			newProj.save()
		return {'message': 'New project created successfully'}
	else:
		raise HTTPException(status_code=400, detail="Project id already exists")
	
	

@app.put('/api/projects')
def project_update(updatedProject: UpdatedProject):
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	currProject = Project.objects(project_id=updatedProject.project_id).first()
	if  currProject:
		if updatedProject.hardware != {}:
			tempDict = currProject.hardware
			currDict = currProject.hardware.copy()
			for k in updatedProject.hardware:
				x = tempDict.get(k,0)
				name = k
				amount = updatedProject.hardware[k]
				if amount < 0 and -1*amount > x:
					raise HTTPException(status_code=400, detail="Cannot check in that many resources")
				tempDict[k] = x+updatedProject.hardware[k]
			currProject.hardware = tempDict
			currProject.save()
			disconnect()
			connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/HWSets?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
			if amount > 0:
				data = checkout_HW(name, amount)
				if data == False:
					disconnect()
					connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
					currProject = Project.objects(project_id=updatedProject.project_id).first()
					currProject.hardware = currDict
					currProject.save()
					raise HTTPException(status_code=400, detail="Cannot check out that many resources")
				else:
					object = HWSet.objects(name=name)
					set = object.get(name=name)
					set["availability"] = data
					set.save()		
			else:
				data = return_HW(name, -1*amount)
				if data == False:
					disconnect()
					connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
					currProject = Project.objects(project_id=updatedProject.project_id).first()
					currProject.hardware = currDict
					currProject.save()
					raise HTTPException(status_code=400, detail="Cannot check in that many resources")
				else:
					object = HWSet.objects(name=name)
					set = object.get(name=name)
					set["availability"] = data
					set.save()	
		elif updatedProject.members != "":
			# add the project in the user as well 
			for member in updatedProject.members:
				currProject.members.append(member)
			currProject.save()
		return {'message': 'Project updated successfully'}
	else:
		raise HTTPException(status_code=400, detail="Project id doesnt exist")

@app.delete('/api/projects')
def project_delete(deleteProject: DeleteProject):
	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
	currProject = Project.objects(project_id=deleteProject.project_id).first()
	if  currProject:
		for member in currProject.members:
			# find user and delete the project from their hardware set
			if member == deleteProject.member:
				currProject.delete()
				disconnect()
				connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Users?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
				user = User.objects(username=member).first()
				tempList = user.projects
				for project in user.projects:
					if project == currProject.project_id:
						tempList.remove(project)
				if not tempList:
					tempList.append("")
				user.projects = tempList
				user.save()
				# replace hw set resources
				disconnect()
				connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/HWSets?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
				for k in currProject.hardware:
					amount = currProject.hardware[k]
					data = return_HW(k, amount)
					if data == False:
						raise HTTPException(status_code=400, detail="Cannot check in that many resources")
					else:
						object = HWSet.objects(name=k)
						set = object.get(name=k)
						set["availability"] = data
						set.save()
				return {'message': 'Project deleted successfully'}
		raise HTTPException(status_code=400, detail="User doesnt have access to that project")
		
	else:
		raise HTTPException(status_code=400, detail="Project id doesnt exist")


@app.get('/api/datasets')
def scrape():
	URL1 = "https://physionet.org/content/accelerometry-walk-climb-drive/1.0.0/"
	data1 = parse(URL1)
	data1.append("https://physionet.org/static/published-projects/accelerometry-walk-climb-drive/labeled-raw-accelerometry-data-captured-during-walking-stair-climbing-and-driving-1.0.0.zip")

	URL2 = "https://physionet.org/content/eda-rest-sedation/1.0/"
	data2 = parse(URL2)
	data2.append("https://physionet.org/static/published-projects/eda-rest-sedation/pulse-amplitudes-from-electrodermal-activity-collected-from-healthy-volunteer-subjects-at-rest-and-under-controlled-sedation-1.0.zip")

	URL3 = "https://physionet.org/content/mimic-iv-demo-omop/0.9/"
	data3 = parse(URL3)
	data3.append("https://physionet.org/static/published-projects/mimic-iv-demo-omop/mimic-iv-demo-data-in-the-omop-common-data-model-0.9.zip")

	URL4 = "https://physionet.org/content/q-pain/1.0.0/"
	data4 = parse(URL4)
	data4.append("https://physionet.org/static/published-projects/q-pain/q-pain-a-question-answering-dataset-to-measure-social-bias-in-pain-management-1.0.0.zip")

	URL5 = "https://physionet.org/content/heart-vector-origin-matlab/1.0.0/"
	data5 = parse(URL5)
	data5.append("https://physionet.org/static/published-projects/heart-vector-origin-matlab/heart-vector-origin-point-detection-and-time-coherent-median-beat-construction-1.0.0.zip")

	information = {"accelerometry" : data1, "pulse" : data2, 
			"MIMIC" : data3, "Q-Pain" : data4,
			"Heart" : data5}

	disconnect()
	connect(host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Description?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)

	d = Description(title = "accelerometry", abstract = data1[0], background=data1[1], zipUrl=data1[2])
	d.save()
	d = Description(title = "pulse", abstract = data2[0], background=data2[1], zipUrl=data2[2])
	d.save()
	d = Description(title = "MIMIC", abstract = data3[0], background=data3[1], zipUrl=data3[2])
	d.save()
	d = Description(title = "Q-Pain", abstract = data4[0], background=data4[1], zipUrl=data4[2])
	d.save()
	d = Description(title = "Heart", abstract = data5[0], background=data5[1], zipUrl=data5[2])
	d.save()

	return information


def parse(URL):
	r = requests.get(URL)
	soup = BeautifulSoup(r.content, 'html5lib') # If this line causes an error, run 'pip install html5lib' or install html5lib
	table = soup.find('div', attrs = {'class':'col-md-8'})

	arr = []	
	for row in table:
		arr.append(row.text)

	data = []
	for i in range(len(arr)):
		print(arr[i])
		if arr[i] == "Abstract":
			print(arr[i])
			i += 2
			data.append(arr[i])
		if arr[i] == "Background":
			print(arr[i])
			i += 2
			data.append(arr[i])
			break

	


	return data





if __name__ == '__main__':
	uvicorn.run(app)