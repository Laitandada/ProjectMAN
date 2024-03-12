import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import TaskTable from "./TasksTable";
import { Box, Typography } from "@mui/material";
import AssignedTaskTable from "./AssignedTasksTable";

export default function FullTaskList() {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.auth);
  const userId = profileData?.user?._id;
  const userName = profileData?.user?.username;
  const email = profileData?.user?.email;
  const [checkedTasks, setCheckedTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState(true);
  const [userList, setUserList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [individualTaskList, setIndividualTaskList] = React.useState([]);
  const [roomList, setRoomList] = React.useState([]);
  const [currentDate, setCurrentDate] = React.useState("");

  React.useEffect(() => {
    // Fetch room list from http://localhost:8000/api/rooms
    const fetchRoomList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/all_rooms/${email}`
        );
        const data = await response.json();
        console.log(data?.rooms);
        setRoomList(data?.rooms); // Assuming data is an array of room names
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    const usersList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/all_users/${email}`
        );
        const data = await response.json();
        console.log(data?.users);
        setUserList(data?.users); // Assuming data is an array of room names
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    // const taskList = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://127.0.0.1:8000/api/tasks/${formData.title}`
    //     );
    //     const data = await response.json();
    //     console.log(data);
    //     // Assuming data is an array of room names
    //   } catch (error) {
    //     console.error("Error fetching room list:", error);
    //   }
    // };
    const allTasksList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/all_tasks/?createdby=${email}`
        );
        const data = await response.json();
        console.log("hello", data?.tasks);
        setTaskList(data?.tasks); // Assuming data is an array of room names
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    const individualTasksList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user-task/${userName}`
        );
        const data = await response.json();
        console.log("hello", data?.individual_tasks);
        setIndividualTaskList(data?.individual_tasks); // Assuming data is an array of room names
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    const today = new Date();

    // Format the date as yyyy-mm-dd
    const formattedDate = today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Set the current date in the state
    setCurrentDate(formattedDate);
    fetchRoomList();
    usersList();
    allTasksList();
    individualTasksList();
  }, [
    email,
    userName,
    setCurrentDate,
    setRoomList,
    setUserList,
    setTaskList,
    setIndividualTaskList,
  ]);
  return (
    <Box sx={{width:"90%",margin:"0 auto"}}>
      <Box sx={{width:"100%",margin:"2rem auto"}}>
        <Typography sx={{mb:3, fontWeight:"600",fontFamily:"DM Sans"}}>My Tasks</Typography>
        <TaskTable tasks={individualTaskList} />
       
      </Box>
      <Box sx={{width:"100%",margin:"2rem auto"}}>
        <Typography sx={{mb:3, fontWeight:"600",fontFamily:"DM Sans"}}>Assigned Tasks To Users</Typography>
        
        <AssignedTaskTable tasks={taskList}/>
      </Box>
    </Box>
  );
}
