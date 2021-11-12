from mongoengine import Document, StringField, IntField, ListField
from mongoengine.fields import DictField
from pydantic import BaseModel
from mongoengine import connect
from typing import Optional

connect(db='Users', alias='UsersDB', host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Users?retryWrites=true&w=majority')
connect(db='Projects', alias='ProjectsDB', host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Projects?retryWrites=true&w=majority')
connect(db='HWSets', alias='HWSetsDB', host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/HWSets?retryWrites=true&w=majority')
connect(db='Description', alias='DescriptionDB', host='mongodb+srv://admin:adminPass@cluster0.ikk67.mongodb.net/Description?retryWrites=true&w=majority')


class Description(Document):
	meta = {
		'db_alias': 'DescriptionDB',
		'collection': 'description',
	}
	title = StringField();
	abstract = StringField()
	background = StringField()
	zipUrl = StringField()

class User(Document):
	meta = {
		'db_alias': 'UsersDB',
        'collection': 'users',
		'indexes': [
  			'username'
		]
    }
	username = StringField(max_length=100, required=True)
	password = StringField(max_length=100, required=True)
	projects = ListField()

class Login(Document):
	meta = {
        'collection': 'users'
    }
	username = StringField()
	password = StringField()

class Project(Document):
	meta = {
		'db_alias': 'ProjectsDB',
        'collection': 'projects'
    }
	project_id = StringField(required=True)
	members = ListField(required=True)
	name = StringField(required=True)
	description = StringField(required=True)
	hardware = DictField()

class NewLogin(BaseModel):
	username: str
	password: str

class Signup(BaseModel):
	username: str
	password: str

class Token(BaseModel):
	access_token: str
	token_type: str
	
class NewProject(BaseModel):
	name: str
	description: str
	project_id: str
	members: list
	hardware: dict

class UpdatedProject(BaseModel):
	project_id: str
	type: Optional[str] = None
	hardware: Optional[dict] = None
	members: Optional[list] = None

class DeleteProject(BaseModel):
	project_id: str
	member: str

class HWSet(Document):
	meta = {
		'db_alias': 'HWSetsDB',
		'collection': 'data',
		'indexes': [
			'name',
			'capacity',
			'availability'
		]
	}
	name = StringField(max_length=100, required=True)
	capacity = IntField(min_value = 0, required=True)
	availability = IntField(min_value = 0, required=True)

class Transaction(BaseModel):
	name : str
	type: str
	amount: int
