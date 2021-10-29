from mongoengine import Document, StringField, IntField, ListField
from pydantic import BaseModel

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
	id = StringField(required=True)
	name = StringField(required=True)
	description = StringField(required=True)

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
