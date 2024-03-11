import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  MiddleSection,
  OverallDashboardContainer,
  SideLeftSection,
  SideRightSection,
} from "./styled";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AvatarGroup from "@mui/material/AvatarGroup";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../redux/auth.slice";
import AddTaskDialog from "../../components/AddTaskDialog";
function Dashboard() {
    const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const dispatch =useDispatch()
    const profileData = useSelector((state) => state.auth);
    const userId = profileData?.user?._id;
    const userName = profileData?.user?.username;
    const email = profileData?.user?.email;
    const thumbnail = profileData?.user?.thumbnail;
    const [addTaskOpen, setAddTaskOpen] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        // Redirect to home page if not authenticated
        if (!isAuthenticated) {
          navigate("/login");
        }
      }, [isAuthenticated]);
  const [progress, setProgress] = React.useState(0);

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
  const handleLogout = () => {
    dispatch(logOutUser());

   
    navigate("/login");
  };
  return (
    <>
      <OverallDashboardContainer>
        <DashboardContainer>
          <SideLeftSection>
            <h3>ProjectManage</h3>

            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Box>
                <h4>Dashboard</h4>
              </Box>
              <Box>
                <h4>Analytics</h4>
              </Box>
              <Box>
                <h4>Deadline</h4>
              </Box>
              <Box>
                <h4>Settings</h4>
              </Box>
              <Box sx={{cursor:"pointer"}} onClick={handleLogout}>
                <h4>Logout</h4>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Box sx={{ width: "100px", height: "100px" }}>
                <Avatar src={`https://sharechallenge.s3.amazonaws.com/${thumbnail}`} sx={{ width: "100%", height: "100%" }} />
              </Box>

              <h4>{userName}</h4>
              <h6> {email}</h6>
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
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h2>Hello {userName}</h2>

                  <p>13 December 2024</p>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    sx={{
                      background: "black",
                      padding: "10px",
                      color: "white",
                      cursor: "pointer",
                      '&:hover': {
                        background: 'black', // Change this to the desired hover color
                      },
                    }}
                    onClick={handleClickOpen}
                  >
                    {" "}
                    Add New Task
                  </Button>

                  <Box
                    sx={{
                      background: "#eee",
                      padding: "10px",
                      marginLeft: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    <h5>Search</h5>
                  </Box>
                </Box>
              </Box>

              <Box className="parent">
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
                      <Typography variant="h5" component="div">
                        Create graphic desging
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
                </Box>
                <Box>
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
                </Box>
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
                  <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                    Upcoming Task
                  </Typography>
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
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{ color: "#001C1A", margin: "10px 0px" }}
                        >
                          Create Business Logo
                        </Typography>
                        <Typography
                          sx={{ color: "#19837E", margin: "10px 0px" }}
                        >
                          Create Business Logo
                        </Typography>
                      </Box>
                      <Box>Mark</Box>
                    </Box>
                  </Box>
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
                        background: "#266663",
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
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{ color: "#001C1A", margin: "10px 0px" }}
                        >
                          Create Business Logo
                        </Typography>
                        <Typography
                          sx={{ color: "#19837E", margin: "10px 0px" }}
                        >
                          Create Business Logo
                        </Typography>
                      </Box>
                      <Box>Mark</Box>
                    </Box>
                  </Box>
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
                        background: "#8B94EF",
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
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{ color: "#001C1A", margin: "10px 0px" }}
                        >
                          Create Business Logo
                        </Typography>
                        <Typography
                          sx={{ color: "#19837E", margin: "10px 0px" }}
                        >
                          Create Business Logo
                        </Typography>
                      </Box>
                      <Box>Mark</Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                    Task Summary
                  </Typography>
                  <Box className="task-summary">
                    <Box
                      sx={{
                        background: "#EFEFEF",
                        padding: "30px",
                        borderRadius: "15px",
                      }}
                    >
                      <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                        123{" "}
                      </Typography>
                      <Typography sx={{ color: "#001C1A", fontWeight: "300" }}>
                        {" "}
                        Graphic Design
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: "#EFEFEF",
                        padding: "30px",
                        borderRadius: "15px",
                      }}
                    >
                      <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                        123{" "}
                      </Typography>
                      <Typography sx={{ color: "#001C1A", fontWeight: "300" }}>
                        {" "}
                        Graphic Design
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: "#EFEFEF",
                        padding: "30px",
                        borderRadius: "15px",
                      }}
                    >
                      <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                        123{" "}
                      </Typography>
                      <Typography sx={{ color: "#001C1A", fontWeight: "300" }}>
                        {" "}
                        Graphic Design
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: "#EFEFEF",
                        padding: "30px",
                        borderRadius: "15px",
                      }}
                    >
                      <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                        123{" "}
                      </Typography>
                      <Typography sx={{ color: "#001C1A", fontWeight: "300" }}>
                        {" "}
                        Graphic Design
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: "#EFEFEF",
                        padding: "30px",
                        borderRadius: "15px",
                      }}
                    >
                      <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                        123{" "}
                      </Typography>
                      <Typography sx={{ color: "#001C1A", fontWeight: "300" }}>
                        {" "}
                        Graphic Design
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        background: "#EFEFEF",
                        padding: "30px",
                        borderRadius: "15px",
                      }}
                    >
                      <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                        123{" "}
                      </Typography>
                      <Typography sx={{ color: "#001C1A", fontWeight: "300" }}>
                        {" "}
                        Graphic Design
                      </Typography>
                    </Box>
                  </Box>
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
                    color: "white",
                    padding: "10px",
                  }}
                >
                  Cal
                </Box>
                <Typography sx={{ color: "#001C1A" }}>March 2024</Typography>
              </Box>
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
                <Typography sx={{ color: "#19837E" }}>Mar 09, 2024</Typography>
                <Box
                  sx={{ display: "flex", width: "100%", alignItems: "center",marginTop:"1rem" }}
                >

                    <Box sx={{ background: "#19837E",width:"5px",height:"100%",borderRadius:"5px",marginRight:"1rem" }}>


                    </Box>
                    <Box>
                    <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                      10:00
                      </Typography>
                      <Typography sx={{ color: "#19837E", fontWeight: "500" }}>
                        {" "}
                       James
                      </Typography>
                    </Box>
                    <Box   sx={{
                  display: "flex",justifyContent:"flex-end",alignItems:"flex-end",marginLeft:"5rem",height:"100%"}}>
                        <Typography sx={{ color: "#19837E",p:0,m:0}}>Create Flyer Design</Typography>
                    </Box>
                </Box>
                <Box
                  sx={{ display: "flex", width: "100%", alignItems: "center",marginTop:"1rem" }}
                >

                    <Box sx={{ background: "#19837E",width:"5px",height:"100%",borderRadius:"5px",marginRight:"1rem" }}>


                    </Box>
                    <Box>
                    <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                      10:00
                      </Typography>
                      <Typography sx={{ color: "#19837E", fontWeight: "500" }}>
                        {" "}
                       James
                      </Typography>
                    </Box>
                    <Box   sx={{
                  display: "flex",justifyContent:"flex-end",alignItems:"flex-end",marginLeft:"5rem",height:"100%"}}>
                        <Typography sx={{ color: "#19837E",p:0,m:0}}>Create Flyer Design</Typography>
                    </Box>
                </Box>
              </Box>
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
                <Typography sx={{ color: "#19837E" }}>Mar 05, 2024</Typography>
                <Box
                  sx={{ display: "flex", width: "100%", alignItems: "center",marginTop:"1rem" }}
                >

                    <Box sx={{ background: "#19837E",width:"5px",height:"100%",borderRadius:"5px",marginRight:"1rem" }}>


                    </Box>
                    <Box>
                    <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                      10:00
                      </Typography>
                      <Typography sx={{ color: "#19837E", fontWeight: "500" }}>
                        {" "}
                       James
                      </Typography>
                    </Box>
                    <Box   sx={{
                  display: "flex",justifyContent:"flex-end",alignItems:"flex-end",marginLeft:"5rem",height:"100%"}}>
                        <Typography sx={{ color: "#19837E",p:0,m:0}}>Create Flyer Design</Typography>
                    </Box>
                </Box>
              </Box>
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
                <Typography sx={{ color: "#19837E" }}>Mar 01, 2024</Typography>
                <Box
                  sx={{ display: "flex", width: "100%", alignItems: "center",marginTop:"1rem" }}
                >

                    <Box sx={{ background: "#19837E",width:"5px",height:"100%",borderRadius:"5px",marginRight:"1rem" }}>


                    </Box>
                    <Box>
                    <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                      10:00
                      </Typography>
                      <Typography sx={{ color: "#19837E", fontWeight: "500" }}>
                        {" "}
                       James
                      </Typography>
                    </Box>
                    <Box   sx={{
                  display: "flex",justifyContent:"flex-end",alignItems:"flex-end",marginLeft:"5rem",height:"100%"}}>
                        <Typography sx={{ color: "#19837E",p:0,m:0}}>Create Flyer Design</Typography>
                    </Box>
                </Box>
              </Box>
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
                <Typography sx={{ color: "#19837E" }}>Feb 28, 2024</Typography>
                <Box
                  sx={{ display: "flex", width: "100%", alignItems: "center",marginTop:"1rem" }}
                >

                    <Box sx={{ background: "#19837E",width:"5px",height:"100%",borderRadius:"5px",marginRight:"1rem" }}>


                    </Box>
                    <Box>
                    <Typography sx={{ color: "#001C1A", fontWeight: "700" }}>
                      10:00
                      </Typography>
                      <Typography sx={{ color: "#19837E", fontWeight: "500" }}>
                        {" "}
                       James
                      </Typography>
                    </Box>
                    <Box   sx={{
                  display: "flex",justifyContent:"flex-end",alignItems:"flex-end",marginLeft:"5rem",height:"100%"}}>
                        <Typography sx={{ color: "#19837E",p:0,m:0}}>Create Flyer Design</Typography>
                    </Box>
                </Box>
              </Box>
            </Box>
          </SideRightSection>
        </DashboardContainer>
        <AddTaskDialog addTaskOpen={addTaskOpen} setAddTaskOpen={setAddTaskOpen}/>
      </OverallDashboardContainer>
    </>
  );
}

export default Dashboard;
