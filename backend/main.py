from typing import List
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from model import Task
from database import (
    create_user,
    fetch_user,
    create_room,
    fetch_room,
    create_task,
    fetch_task,
    assign_task,
    fetch_assigned_tasks,
    authenticate_user,
    fetch_assigned_rooms,
    fetch_all_users,
    fetch_all_tasks,
    search_task_by_title,
    update_task_completion,
   
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
async def signup(username: str, email: str,password: str,thumbnail: str):
    user = await create_user(username, email,password,thumbnail)
    if user:
        return {"user": user} 
    else:
        raise HTTPException(status_code=404, detail="Error Signin up")
@app.post("/api/users/login")
async def login( email: str,password: str):
    user = await authenticate_user( email, password)
    if user:
        return {"user": user} 
    else:
        raise HTTPException(status_code=404, detail="Error login in")

@app.get("/api/users/{username}")
async def get_user(username: str):
    user = await fetch_user(username)
    if user:
        return {"user": user} 
    else:
        raise HTTPException(status_code=404, detail="User not found")
@app.get("/api/all_users/{email}")
async def get_all_users(email: str):
    users = await fetch_all_users(email)
    if users:
        return {"users": users} 
    else:
        raise HTTPException(status_code=404, detail="Users not found")

# Room routes
@app.post("/api/rooms/create")
async def create_room_route(name: str, createdby: str):
    room = await create_room(name, createdby)
    return room

@app.get("/api/rooms/{name}")
async def get_room(name: str):
    room = await fetch_room(name)
    if room:
        return room
    else:
        raise HTTPException(status_code=404, detail="Room not found")
@app.get("/api/all_rooms/{createdby}")
async def get_all_rooms(createdby: str):
    rooms = await fetch_assigned_rooms(createdby)
    if rooms:
        return {"rooms": rooms} 
    else:
        raise HTTPException(status_code=404, detail="Room not found")

# Task routes
@app.post("/api/tasks/create")
async def create_task_route(title: str, description: str, room_name: str, due_date: str, assigned_users: list = []):
    task = await create_task(title, description, room_name, due_date, assigned_users)
    return task

@app.put("/api/tasks/update/{title}")
async def update_task_completed_status(title: str):
    task = await update_task_completion(title)
    if task:
        return {"message": "Task updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Task not found")
@app.get("/api/all_tasks/")
async def get_all_tasks( createdby: str):
    tasks = await fetch_all_tasks( createdby)
    if tasks:
        return {"tasks": tasks}
    else:
        raise HTTPException(status_code=404, detail="Tasks not found")

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
     return {"individual_tasks": tasks} 
    else:
        raise HTTPException(status_code=404, detail="Users task not found")
    
@app.get("/api/tasks/search/{search_term}")
async def search_tasks(
    search_term: str = Query(..., title="Search Term", description="The term to search for in task titles"),
    page: int = Query(1, title="Page", description="Page number for pagination"),
    page_size: int = Query(10, title="Page Size", description="Number of tasks to return per page")
):
    tasks = await search_task_by_title(search_term, page, page_size)
    if tasks:
        return tasks
    else:
        raise HTTPException(status_code=404, detail="Task search failed")

# Task Assignment route
@app.post("/api/assign-task")
async def assign_task_route(task_title: str, assigned_by_username: str, assigned_to_username: str):
    assignment = await assign_task(task_title, assigned_by_username, assigned_to_username)
    if assignment:
        return assignment
    else:
        raise HTTPException(status_code=404, detail="Task assignment failed")
    
