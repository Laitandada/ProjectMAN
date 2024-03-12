import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography } from "@mui/material";
export default function AssignTasks({ assignTaskOpen, setAssignTaskOpen }) {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.auth);
  const userId = profileData?.user?._id;
  const userName = profileData?.user?.username;
  const email = profileData?.user?.email;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [usersName, setUsersName] = React.useState("");
  const [tasksName, setTasksName] = React.useState("");
  const [roomNameTwo, setRoomNameTwo] = React.useState("");
  const [createRoom, setCreateRoom] = React.useState(true);
  const [step, setStep] = React.useState(1);

  const [newTask, setNewTask] = React.useState(true);
  const [userList, setUserList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    room_name: "",
    due_date: "",
  });
  React.useEffect(() => {
    // Fetch room list from http://localhost:8000/api/rooms
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
    const allTasksList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/all_tasks/?createdby=${email}`
        );
        const data = await response.json();
        console.log(data?.tasks);
        setTaskList(data?.tasks); // Assuming data is an array of room names
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    const taskList = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/tasks/${formData.title}`
        );
        const data = await response.json();
        console.log(data);
        // Assuming data is an array of room names
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    usersList();
    allTasksList();
    taskList();
  }, []);
  const handleClickOpen = () => {
    setAssignTaskOpen(true);
  };

  const handleClose = () => {
    setAssignTaskOpen(false);
    setRoomNameTwo("");
    setCreateRoom(true);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleRoomChange = (event) => {
    setStep(2);
  };
  const handleUserChange = (event) => {
    setUsersName(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTasksName(event.target.value);
  };
  const handleRoomSelect = (event) => {
    setRoomNameTwo(event.target.value);
  };

  const handleSelectRoom = () => {
    setCreateRoom(false);
  };
  //   console.log(roomNameTwo)
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();

    try {
      const responseUser = await fetch(
        `http://127.0.0.1:8000/api/assign-task?task_title=${tasksName}&assigned_by_username=${userName}&assigned_to_username=${usersName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (responseUser.ok) {
        const responseDataUser = await responseUser.json();
        console.log("Task assigned assigned successfully", responseDataUser);
        setStep(1);
        handleClose();
        enqueueSnackbar("Task assigned", {
          variant: "success",
        });
        navigate("/");
      } else {
        const responseDataUser = await responseUser.text();
        enqueueSnackbar(responseDataUser, {
          variant: "error",
        });
        console.error(responseDataUser.message);
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: "error",
      });
      console.error("Error during room creation:", error.message);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={assignTaskOpen}
        onClose={handleClose}
      >
        <DialogTitle></DialogTitle>

        {step === 1 && (
          <FormControl sx={{ width: "90%", margin: "0px auto" }}>
            <Typography>Select Users Name To assign task to</Typography>
            <Select
              labelId="tasks-select-label"
              id="tasks-select"
              value={tasksName}
              onChange={handleTaskChange}
            >
              {Array.isArray(taskList) &&
                taskList.map((tasks) => (
                  <MenuItem key={tasks.title} value={tasks.title}>
                    {tasks.title}
                  </MenuItem>
                ))}
            </Select>

            <Select
              labelId="user-select-label"
              id="user-select"
              value={usersName}
              onChange={handleUserChange}
              sx={{ margin: "10px 0px" }}
            >
              {Array.isArray(userList) &&
                userList.map((user) => (
                  <MenuItem key={user.username} value={user.username}>
                    {user.username}
                  </MenuItem>
                ))}
            </Select>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 5,
                background: "#266663",
                height: "53px",
                borderRadius: "0.25rem",
                border: "none",

                "&:hover": {
                  background: "#266663", // Change the color on hover
                },
              }}
              onClick={handleAssignTask}
            >
              Assign Task
            </Button>
          </FormControl>
        )}
      </Dialog>
    </React.Fragment>
  );
}
