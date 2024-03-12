import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  MiddleSection,
  OverallDashboardContainer,
  SideLeftSection,
  SideRightSection,
} from "./styled";
import { Avatar, Box, Button, Input, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AvatarGroup from "@mui/material/AvatarGroup";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../../redux/auth.slice";
import AddTaskDialog from "../../components/AddTaskDialog";
import AssignTasks from "../../components/AssignTask";
import { SlCalender } from "react-icons/sl";
import { enqueueSnackbar } from "notistack";
import { BiTask } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import TaskList from "../../components/TasksSummary";
import FetchSearchResults from "../../components/FetchSerachResults";
function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.auth);
  const userId = profileData?.user?._id;
  const userName = profileData?.user?.username;
  const email = profileData?.user?.email;
  const thumbnail = profileData?.user?.thumbnail;
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [assignTaskOpen, setAssignTaskOpen] = useState(false);
  const [usersName, setUsersName] = React.useState("");
  const [tasksName, setTasksName] = React.useState("");
  const [roomNameTwo, setRoomNameTwo] = React.useState("");
  const [createRoom, setCreateRoom] = React.useState(true);
  const [step, setStep] = React.useState(1);
  const [checkedTasks, setCheckedTasks] = useState([]);
  const [newTask, setNewTask] = React.useState(true);
  const [userList, setUserList] = React.useState([]);
  const [taskList, setTaskList] = React.useState([]);
  const [individualTaskList, setIndividualTaskList] = React.useState([]);
  const [roomList, setRoomList] = React.useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [searchBox, setSearchBox] = useState(false);
  const [sortTaskList, setSortTaskList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to home page if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  const [progress, setProgress] = React.useState(0);
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
  useEffect(() => {
    // Sort the taskList by due_date when it changes
    const sortedTaskList = [...individualTaskList].sort((a, b) => {
      // Assuming due_date is in the format "DD/MM/YYYY"
      const dateA = new Date(a?.task?.due_date.split("/").reverse().join("-"));
      const dateB = new Date(b?.task?.due_date.split("/").reverse().join("-"));
      console.log(dateB, dateA, "takss", a?.task?.due_date);
      return dateA - dateB;
    });

    setSortTaskList(sortedTaskList);
  }, [individualTaskList]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleClickOpen = () => {
    setAddTaskOpen(true);
  };
  const handleSearchOpen = () => {
    setSearchBox(!searchBox);
  };
  const handleClickAssignOpen = () => {
    setAssignTaskOpen(true);
  };
  const handleLogout = () => {
    dispatch(logOutUser());

    navigate("/login");
  };

  const handleCheckboxChange = async (title) => {
    if (checkedTasks.includes(title)) {
      setCheckedTasks(checkedTasks.filter((id) => id !== title));
    } else {
      setCheckedTasks([...checkedTasks, title]);
    }
    console.log("title", title);

    try {
      const responseUser = await fetch(
        `http://127.0.0.1:8000/api/tasks/update/${title}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (responseUser.ok) {
        const responseDataUser = await responseUser.json();
        console.log("Task completed successfully", responseDataUser);

        enqueueSnackbar("Task completed", {
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
  const maxProgress = 15;

  return (
    <>
      <OverallDashboardContainer>
        <DashboardContainer>
          <SideLeftSection>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BiTask style={{ fontSize: "2rem", marginRight: "10px" }} />
              <h3 style={{ fontFamily: "DM Sans", fontSize: "2rem" }}>
                {" "}
                ProjectMAN
              </h3>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IoMdHome style={{ fontSize: "20px", marginRight: "10px" }} />
                <h4 style={{ fontFamily: "DM Sans", fontSize: "17px" }}>
                  Dashboard
                </h4>
              </Box>
              <Link
                to="/task_list"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BsListTask
                    style={{ fontSize: "20px", marginRight: "10px" }}
                  />
                  <h4 style={{ fontFamily: "DM Sans", fontSize: "17px" }}>
                    Task List
                  </h4>
                </Box>
              </Link>

              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleLogout}
              >
                <IoLogOutOutline
                  style={{ fontSize: "20px", marginRight: "10px" }}
                />
                <h4 style={{ fontFamily: "DM Sans", fontSize: "17px" }}>
                  Logout
                </h4>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: "100px", height: "100px" }}>
                <Avatar
                  src={`https://sharechallenge.s3.amazonaws.com/${thumbnail}`}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>

              <h4 style={{ fontFamily: "DM Sans", fontSize: "17px" }}>
                {userName}
              </h4>
              <h6 style={{ fontFamily: "DM Sans", fontSize: "12px" }}>
                {" "}
                {email}
              </h6>
            </Box>
          </SideLeftSection>

          <MiddleSection>
            <Box sx={{ width: "90%", margin: " 1rem auto" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1.5rem auto",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "24px",
                      margin: "0px",
                    }}
                  >
                    Hello, {userName}
                  </h2>

                  <p
                    style={{
                      fontFamily: "DM Sans",
                      fontSize: "17px",
                      color: "#19837E",
                      margin: "10px 0px 0px 0px",
                    }}
                  >
                    {currentDate}
                  </p>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "relative",
                  }}
                >
                  <Button
                    sx={{
                      background: "black",
                      height: "45px",
                      width: "150px",
                      borderRadius: "10px",
                      color: "white",
                      cursor: "pointer",
                      "&:hover": {
                        background: "black", // Change this to the desired hover color
                      },
                    }}
                    onClick={handleClickOpen}
                  >
                    {" "}
                    Add New Task
                  </Button>
                  <Button
                    sx={{
                      background: "black",
                      height: "45px",
                      width: "150px",
                      borderRadius: "10px",
                      color: "white",
                      cursor: "pointer",
                      marginLeft: "10px",
                      "&:hover": {
                        background: "black", // Change this to the desired hover color
                      },
                    }}
                    onClick={handleClickAssignOpen}
                  >
                    {" "}
                    Assign Task
                  </Button>

                  <Box
                    sx={{
                      background: "#eee",
                      borderRadius: "10px",
                      height: "45px",
                      width: "45px",
                      marginLeft: "2rem",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                    onClick={handleSearchOpen}
                  >
                    <IoSearch />
                  </Box>
                  {searchBox && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#eee",
                        width: "400px",
                        borderRadius: "10px",
                        position: "absolute",
                        top: "60px",
                        zIndex: "5",
                      }}
                    >
                      <Input
                        placeholder="Enter search key"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "90%", margin: "10px auto" }}
                      />

                      <FetchSearchResults search_term={searchTerm} />
                    </Box>
                  )}
                </Box>
              </Box>

              <Box className="parent">
                {Array.isArray(roomList) &&
                  roomList?.map((room) => (
                    <Box sx={{}}>
                      <Card
                        variant="outlined"
                        sx={{
                          background: "#266663",
                          borderRadius: "7px",
                          color: "white",
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{ mb: 1.2, fontFamily: "DM Sans" }}
                          >
                            {room.name}
                          </Typography>
                          <Box sx={{ mb: 1.5 }}>
                            <AvatarGroup
                              total={15}
                              sx={{ justifyContent: "flex-end" }}
                            >
                              {taskList
                                ?.filter((task) => room.name === task.room.name)
                                .map((filteredTask) => (
                                  <React.Fragment key={filteredTask.title}>
                                    {Array.from(
                                      new Set(
                                        filteredTask.assigned_users.map(
                                          (user) => user.email
                                        )
                                      )
                                    ).map((email) => {
                                      const user =
                                        filteredTask.assigned_users.find(
                                          (u) => u.email === email
                                        );
                                      return (
                                        <Avatar
                                          key={user.email}
                                          alt={user.username}
                                          src={`https://sharechallenge.s3.amazonaws.com/${user.thumbnail}`}
                                        />
                                      );
                                    })}
                                  </React.Fragment>
                                ))}
                            </AvatarGroup>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{ mb: 1.5, fontFamily: "DM Sans" }}
                          >
                            {
                              taskList?.filter(
                                (task) => room.name === task.room.name
                              ).length
                            }{" "}
                            task(s)
                          </Typography>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress
                              variant="determinate"
                              value={
                                (taskList?.filter(
                                  (task) => room.name === task.room.name
                                ).length /
                                  maxProgress) *
                                100
                              }
                              sx={{ backgroundColor: "black" }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  ))}

                {/* <Box>
                  <Card
                    variant="outlined"
                    sx={{
                      background: "#F25D3B",
                      borderRadius: "7px",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Make music Video
                      </Typography>
                      <Box sx={{ mb: 1.5 }}>
                        <AvatarGroup
                          total={24}
                          sx={{ justifyContent: "flex-end" }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                          />
                          <Avatar
                            alt="Agnes Walker"
                            src="/static/images/avatar/4.jpg"
                          />
                          <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                          />
                        </AvatarGroup>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 3 }}>
                        20 tasks
                      </Typography>

                      <Box sx={{ width: "100%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ backgroundColor: "black", color: "white" }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card
                    variant="outlined"
                    sx={{
                      background: "#8B94EF",
                      borderRadius: "7px",
                      color: "white",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Create UI Design
                      </Typography>
                      <Box sx={{ mb: 1.5 }}>
                        <AvatarGroup
                          total={24}
                          sx={{ justifyContent: "flex-end" }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                          <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                          />
                          <Avatar
                            alt="Agnes Walker"
                            src="/static/images/avatar/4.jpg"
                          />
                          <Avatar
                            alt="Trevor Henderson"
                            src="/static/images/avatar/5.jpg"
                          />
                        </AvatarGroup>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 3 }}>
                        20 tasks
                      </Typography>

                      <Box sx={{ width: "100%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ backgroundColor: "black" }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Box> */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "3rem 0px",
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#001C1A",
                      fontWeight: "700",
                      fontFamily: "DM Sans",
                      fontSize: "1.2rem",
                    }}
                  >
                    Upcoming Task
                  </Typography>

                  {Array.isArray(sortTaskList) &&
                    sortTaskList
                      ?.filter((sortedTask) => !sortedTask.task.completed)
                      .map((sortedTask) => (
                        <Box
                          sx={{
                            borderRadius: "20px",
                            width: "100%",
                            background: "#EFEFEF",
                            margin: "20px 0px",
                          }}
                        >
                          <Box
                            sx={{
                              background: "#F25D3B",
                              height: "15px",
                              borderTopLeftRadius: "20px",
                              borderTopRightRadius: "20px",
                            }}
                          ></Box>
                          <Box
                            sx={{
                              display: "flex",
                              width: "90%",
                              margin: "0px auto ",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography
                                sx={{ color: "#001C1A", margin: "10px 0px" }}
                              >
                                {sortedTask?.task.title}
                              </Typography>
                              <Typography
                                sx={{ color: "#19837E", margin: "10px 0px" }}
                              >
                                {sortedTask?.task.room.name}
                              </Typography>
                              <Typography
                                sx={{ color: "black", margin: "10px 0px" }}
                              >
                                {sortedTask?.task.completed
                                  ? "Completed"
                                  : "Not Completed"}
                              </Typography>
                            </Box>
                            <Box>
                              <input
                                type="checkbox"
                                checked={checkedTasks.includes(
                                  sortedTask.task.title
                                )}
                                style={{ width: "20px", height: "20px" }}
                                onChange={() =>
                                  handleCheckboxChange(sortedTask?.task.title)
                                }
                              />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <TaskList tasks={individualTaskList} />
                </Box>
              </Box>
            </Box>
          </MiddleSection>
          <SideRightSection>
            <Box
              sx={{
                display: "flex",
                width: "90%",
                margin: "2rem auto ",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  margin: "0px auto ",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    background: "#001C1A",
                    borderRadius: "7px",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <SlCalender />
                </Box>
                <Typography sx={{ color: "#001C1A" }}>March 2024</Typography>
              </Box>
              {Array.isArray(taskList) &&
                taskList
                  ?.filter((sortedTask) => !sortedTask?.completed) // Filter completed tasks
                  .map((sortedTask) => (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        margin: "2rem auto ",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {sortedTask.assigned_users.length > 0 && (
                        <Typography sx={{ color: "#19837E" }}>
                          {sortedTask.due_date}
                        </Typography>
                      )}

                      {sortedTask.assigned_users?.map((user) => (
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            marginTop: "1rem",
                          }}
                        >
                          <Box
                            sx={{
                              background: user?.user_color,
                              width: "5px",
                              height: "100%",
                              borderRadius: "5px",
                              marginRight: "1rem",
                            }}
                          ></Box>
                          <Box>
                            <Typography
                              sx={{ color: "#001C1A", fontWeight: "700" }}
                            >
                              {sortedTask.title}
                            </Typography>
                            <Typography
                              sx={{ color: "#19837E", fontWeight: "500" }}
                            >
                              {" "}
                              {user?.username}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
            </Box>
          </SideRightSection>
        </DashboardContainer>
        <AddTaskDialog
          addTaskOpen={addTaskOpen}
          setAddTaskOpen={setAddTaskOpen}
        />
        <AssignTasks
          assignTaskOpen={assignTaskOpen}
          setAssignTaskOpen={setAssignTaskOpen}
        />
      </OverallDashboardContainer>
    </>
  );
}

export default Dashboard;
