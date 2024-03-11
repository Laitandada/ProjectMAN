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
import { TextField } from "@mui/material";
export default function AddTaskDialog({ addTaskOpen, setAddTaskOpen }) {
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
  const [roomName, setRoomName] = React.useState("");
  const [roomNameTwo, setRoomNameTwo] = React.useState("");
  const [createRoom, setCreateRoom] = React.useState(true);
  const [newTask, setNewTask] = React.useState(true);
  const [roomList, setRoomList] = React.useState([]);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    room_name: "",
    due_date: "",
  });
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

    fetchRoomList();
  }, []);
  const handleClickOpen = () => {
    setAddTaskOpen(true);
  };

  const handleClose = () => {
    setAddTaskOpen(false);
    setRoomNameTwo("");
    setCreateRoom(true);
    setRoomName("");
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleRoomChange = (event) => {
    setRoomName(event.target.value);
    setNewTask(false);
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
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      const validationErrors = [];

      if (!roomNameTwo) {
        validationErrors.push("Room name is required");
      }

      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          enqueueSnackbar(error, {
            variant: "error",
          });
        });
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/rooms/create?name=${roomNameTwo}&createdby=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomNameTwo),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Room created successfully", responseData);
        setNewTask(false);
        enqueueSnackbar("Room created", {
          variant: "success",
        });
        navigate("/");
      } else {
        const responseData = await response.text();
        enqueueSnackbar(responseData, {
          variant: "error",
        });
        console.error(responseData.message);
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: "error",
      });
      console.error("Error during room creation:", error.message);
    }
  };
  const handleSubmitTask = async (e) => {
    e.preventDefault();

    try {
    //   const validationErrors = [];

    //   if (!) {
    //     validationErrors.push("Room name is required");
    //   }

    //   if (validationErrors.length > 0) {
    //     validationErrors.forEach((error) => {
    //       enqueueSnackbar(error, {
    //         variant: "error",
    //       });
    //     });
    //     return;
    //   }

      const response = await fetch(
        `http://127.0.0.1:8000/api/tasks/create?title=${formData.title}&description=${formData.description}&room_name=${roomName||roomNameTwo}&due_date=${formData.due_date}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Task Created created successfully", responseData);
        setNewTask(false);
        enqueueSnackbar("Task created", {
          variant: "success",
        });
        navigate("/");
      } else {
        const responseData = await response.text();
        enqueueSnackbar(responseData, {
          variant: "error",
        });
        console.error(responseData.message);
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
        open={addTaskOpen}
        onClose={handleClose}
      >
        <DialogTitle></DialogTitle>
        {newTask && newTask ? (
          <>
            <DialogContent>
              <DialogContentText>Select or create a room</DialogContentText>
              {createRoom ? (
                <FormControl fullWidth>
                  <InputLabel id="room-select-label">Select Room</InputLabel>
                  <Select
                    labelId="room-select-label"
                    id="room-select"
                    value={roomName}
                    onChange={handleRoomChange}
                  >
                    {Array.isArray(roomList) &&
                      roomList.map((room) => (
                        <MenuItem key={room.name} value={room.name}>
                          {room.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ) : (
                <form
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onSubmit={handleCreateRoom}
                >
                  <input
                    type="text"
                    value={roomNameTwo}
                    onChange={handleRoomSelect}
                    required
                  />
                  <Button type="submit">Create Room</Button>
                </form>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button
                onClick={createRoom ? handleSelectRoom : handleCreateRoom}
                color="primary"
              >
                {createRoom ? "Select Room" : "Create Room"}
              </Button>
            </DialogActions>
          </>
        ) : (
          <form style={{ width: "90%", margin:"2rem auto" }} onSubmit={handleSubmitTask}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                mx: "auto",
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="title"
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="description"
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="text"
                defaultValue={roomName || roomNameTwo }
                name="room_name"
            
                placeholder="Room Name"
            
              />
<TextField
                variant="outlined"
                margin="normal"
                type="text"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
                placeholder="Task Due Date"
                required
              />
            

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 5,
                  backgroundColor: "#6747c7",
                  height: "53px",
                  borderRadius: "0.25rem",
                  border: "none",

                  "&:hover": {
                    backgroundColor: "#6747c7", // Change the color on hover
                  },
                }}
              >
                Create New Task
              </Button>
            </Box>
          </form>
        )}
      </Dialog>
    </React.Fragment>
  );
}
