from mongoengine import Document, StringField, IntField, ListField
from mongoengine.fields import DictField
from pydantic import BaseModel
from mongoengine import connect
from typing import Optional


class Description(Document):
	meta = {
		'collection': 'description',
	}
	title = StringField();
	abstract = StringField()
	background = StringField()
	zipUrl = StringField()

class User(Document):
	meta = {
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
	hardware: Optional[dict] = None
	members: Optional[list] = None

class DeleteProject(BaseModel):
	project_id: str
	member: str

class HWSet(Document):
	meta = {
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
