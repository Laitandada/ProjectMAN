
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    username: str
    email: str
    password: str
    thumbnail: str
    user_color: str

class Room(BaseModel):
    name: str
    createdby: str


class Task(BaseModel):
    title: str
    description: str
    assigned_users: List[User] = []
    room: Room
    due_date: str
    completed: bool = False

class TaskAssignment(BaseModel):
    task: Task
    assigned_by: User
    assigned_to: User
