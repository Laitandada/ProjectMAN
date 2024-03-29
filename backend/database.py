import random
from model import User, Room, Task, TaskAssignment
from pymongo import MongoClient
import certifi
import bcrypt
from bson.objectid import ObjectId
import pydantic
pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str
# Create MongoClient with SSL certificate verification
client = MongoClient("mongodb+srv://dbMicheal:dbOlaitan123@cluster0.jqmj3.mongodb.net/TodoList?retryWrites=true&w=majority", tlsCAFile=certifi.where())

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You have successfully connected to MongoDB!")
except Exception as e:
    print(e)

database = client.TodoList

# Define MongoDB collections
user_collection = database.users
room_collection = database.rooms
task_collection = database.tasks
assignment_collection = database.tasks_assignments


#get random color
def get_random_color():
    # Generate a random hex color code
    return "#{:06x}".format(random.randint(0, 0xFFFFFF))

# Define CRUD operations for users
async def create_user(username, email, password,thumbnail):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_data = {"username": username, "email": email, "password": hashed_password,"thumbnail":thumbnail, "user_color": get_random_color(),}
    
    result =  user_collection.insert_one(user_data)

    if result.acknowledged:
        inserted_id = result.inserted_id
        inserted_user =  user_collection.find_one({"_id": inserted_id})
        return inserted_user
    else:
        return None

async def authenticate_user(email, password):
    user = user_collection.find_one({"email": email})

    if user:
        hashed_password = user.get("password", "")
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
            return user
        else:
            return None
    else:
        return None

async def fetch_user(username):
    user_data = user_collection.find_one({"username": username})
    return User(**user_data) if user_data else None
async def fetch_all_users(email):
    all_users_data = user_collection.find({"email": {"$ne": email}})
    all_users = [User(**data) for data in all_users_data]
    return all_users

# Define CRUD operations for rooms
async def create_room(name, createdby):
    room_data = {"name": name, "createdby": createdby}
    result = room_collection.insert_one(room_data)
    return room_data

async def fetch_room(name):
    room_data =  room_collection.find_one({"name": name})
    return Room(**room_data) if room_data else None

async def fetch_assigned_rooms(createdby):
    assigned_rooms_data = room_collection.find({"createdby": createdby})
    
    assigned_rooms = [Room(**data) for data in assigned_rooms_data]
    print(assigned_rooms)
    return assigned_rooms

# Define CRUD operations for tasks
async def create_task(title, description, room_name, due_date, assigned_usernames=[]):
    room_data = room_collection.find_one({"name": room_name})
    print(room_data)
    room = Room(**room_data) if room_data else None
    assigned_users = []
    for username in assigned_usernames:
        user_data = await user_collection.find_one({"username": username})
        if user_data:
            assigned_users.append(User(**user_data))

    # Convert Room object to a dictionary
    room_data_dict = room.dict() if room else None

    task_data = {
        "title": title,
        "description": description,
        "room": room_data_dict,
        "due_date": due_date,
        "assigned_users": [user.dict() for user in assigned_users],
        "completed": False
    }
    result = task_collection.insert_one(task_data)
    return Task(**task_data)
async def update_task_completion(title: str):
  

    
    # Find the task by ObjectId
    task_data = task_collection.find_one({"title": title})
    assignment_data = assignment_collection.find_one({"task.title": title} )
    
    if task_data and assignment_data:
        # Update the completed status to True
        task_collection.update_one({"title": title}, {"$set": {"completed": True}})
        assignment_collection.update_one({"task.title": title}, {"$set": {"task.completed": True}})
        return task_data
    else:
        return None
async def fetch_all_tasks( createdby):
    all_tasks_data = task_collection.find({  "room.createdby": createdby})
    all_tasks = [Task(**data) for data in all_tasks_data]
    return all_tasks

async def fetch_task(title):
    task_data =  task_collection.find_one({"title": title})
    return Task(**task_data) if task_data else None

async def fetch_assigned_tasks(username):
    assigned_tasks_data = assignment_collection.find({"assigned_to.username": username})
    assigned_tasks = [TaskAssignment(**data) for data in assigned_tasks_data]
    return assigned_tasks

# Update the assign_task function to automatically update rooms and tasks
async def assign_task(task_title, assigned_by_username, assigned_to_username):
    task_data = task_collection.find_one({"title": task_title})
    task = Task(**task_data) if task_data else None

    assigned_by_data = user_collection.find_one({"username": assigned_by_username})
    assigned_by = User(**assigned_by_data) if assigned_by_data else None

    assigned_to_data = user_collection.find_one({"username": assigned_to_username})
    assigned_to = User(**assigned_to_data) if assigned_to_data else None

    if task and assigned_by and assigned_to:
        # Update the assigned_users in the task
        task.assigned_users.append(assigned_to)

        # Convert Task object to a dictionary
        task_data_dict = task.dict()

        # Update the assigned task in the task_collection
        task_collection.update_one({"title": task_title}, {"$set": task_data_dict})

        assignment_data = {
            "task": task.dict(),
            "assigned_by": assigned_by.dict(),
            "assigned_to": assigned_to.dict()
        }

        # Insert the assignment in the assignment_collection
        result = assignment_collection.insert_one(assignment_data)

        # Update the assigned task in the room_collection
        room_collection.update_one(
            {"name": task.room.name},
            {"$push": {"tasks": task.dict()}}
        )

        return TaskAssignment(**assignment_data, id=str(result.inserted_id))
    else:
        return None


async def search_task_by_title(search_term: str, page: int, page_size: int):
 
    print("hello")
    # Perform a case-insensitive search on task titles
    search_regex = {"$regex": f".*{search_term}.*", "$options": "i"}

    # Find tasks that match the search term and apply pagination
    tasks_cursor = task_collection.find({"title": search_regex}).skip((page - 1) * page_size).limit(page_size)
    print(tasks_cursor,"hello")
    # Convert tasks cursor to a list of dictionaries
    tasks_data = [task for task in tasks_cursor]

    # Convert each task dictionary to a Task model instance
    tasks = [Task(**task) for task in tasks_data]

    return tasks