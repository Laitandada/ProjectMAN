from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import (
    create_user,
    fetch_user,
    create_room,
    fetch_room,
    create_task,
    fetch_task,
    assign_task,
    fetch_assigned_tasks,
    authenticate_user

)

app = FastAPI()

# Enable CORS for all origins
origins = ["https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

# User routes
@app.post("/api/users/signup")
async def signup(username: str, email: str,password: str):
    user = await create_user(username, email,password)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="Error Signin up")
@app.post("/api/users/login")
async def login( email: str,password: str):
    user = await authenticate_user( email, password)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="Error login in")

@app.get("/api/users/{username}")
async def get_user(username: str):
    user = await fetch_user(username)
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Room routes
@app.post("/api/rooms/create")
async def create_room_route(name: str, members: list = []):
    room = await create_room(name, members)
    return room

@app.get("/api/rooms/{name}")
async def get_room(name: str):
    room = await fetch_room(name)
    if room:
        return room
    else:
        raise HTTPException(status_code=404, detail="Room not found")

# Task routes
@app.post("/api/tasks/create")
async def create_task_route(title: str, description: str, room_name: str, due_date: str, assigned_users: list = []):
    task = await create_task(title, description, room_name, due_date, assigned_users)
    return task

@app.get("/api/tasks/{title}")
async def get_task(title: str):
    task = await fetch_task(title)
    if task:
        return task
    else:
        raise HTTPException(status_code=404, detail="Task not found")
@app.get("/api/user-task/{username}")
async def get_task(username: str):
    tasks = await fetch_assigned_tasks(username)
    if tasks:
        return tasks
    else:
        raise HTTPException(status_code=404, detail="Users task not found")

# Task Assignment route
@app.post("/api/assign-task")
async def assign_task_route(task_title: str, assigned_by_username: str, assigned_to_username: str):
    assignment = await assign_task(task_title, assigned_by_username, assigned_to_username)
    if assignment:
        return assignment
    else:
        raise HTTPException(status_code=404, detail="Task assignment failed")
