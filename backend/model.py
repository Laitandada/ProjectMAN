from pydantic import BaseModel
from typing import List
from datetime import datetime

class User(BaseModel):
    username: str
    email: str
    password: str

class Room(BaseModel):
    name: str
    members:  List[User] = []

class Task(BaseModel):
    title: str
    description: str
    assigned_users: List[User] = []
    room: Room
    due_date: datetime
    completed: bool = False

class TaskAssignment(BaseModel):
    task: Task
    assigned_by: User
    assigned_to: User

class TaskManagementApp:
    def __init__(self):
        self.users = []  # List to store user instances
        self.rooms = []  # List to store room instances
        self.tasks = []  # List to store task instances
        self.task_assignments = []  # List to store task assignment instances

    def create_user(self, username: str, email: str):
        user = User(username=username, email=email)
        self.users.append(user)
        return user

    def create_room(self, name: str, members: List[User] = []):
        room = Room(name=name, members=members)
        self.rooms.append(room)
        return room

    def create_task(self, title: str, description: str, room: Room, due_date: datetime, assigned_users: List[User] = []):
        task = Task(title=title, description=description, room=room, due_date=due_date, assigned_users=assigned_users)
        self.tasks.append(task)
        return task

    def assign_task(self, task: Task, assigned_by: User, assigned_to: User):
        assignment = TaskAssignment(task=task, assigned_by=assigned_by, assigned_to=assigned_to)
        self.task_assignments.append(assignment)
        return assignment
    
     
    def add_user_to_room(self, user: User, room: Room):
        room.members.append(user)

    def remove_user_from_room(self, user: User, room: Room):
        room.members.remove(user)

    def update_assigned_users(self, task: Task, assigned_users: List[User]):
        task.assigned_users = assigned_users

    def assign_task(self, task: Task, assigned_by: User, assigned_to: User):
        assignment = TaskAssignment(task=task, assigned_by=assigned_by, assigned_to=assigned_to)
        self.task_assignments.append(assignment)

        # Update assigned users in the task
        self.update_assigned_users(task, assigned_users=[assigned_to])

        # Add the assigned user to the room if not already a member
        if assigned_to not in task.room.members:
            self.add_user_to_room(assigned_to, task.room)

        return assignment
