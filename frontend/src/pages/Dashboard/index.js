import React from 'react'
import { DashboardContainer, MiddleSection, OverallDashboardContainer, SideLeftSection } from './styled'
import { Avatar, Box, Button } from '@mui/material'

function Dashboard() {
  return (
    <>

    <OverallDashboardContainer>
        <DashboardContainer>
            <SideLeftSection>
                <h3>ProjectManage</h3>

                <Box sx={{display:"flex",alignItems:"start",flexDirection:"column"}}>
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
                    <Box>
                        <h4>Logout</h4>
                    </Box>
                    

                </Box>
                <Box sx={{display:"flex",alignItems:"start",flexDirection:"column"}}>

                    <Box sx={{width:"100px",height:"100px"}}>
                        <Avatar sx={{width:"100%",height:"100%"}}/>
                    </Box>

                    <h4>John Doe</h4>
                    <h6> John@gmail.com</h6>
                </Box>
            </SideLeftSection>

            <MiddleSection>
                <Box sx={{width:"90%",margin:" 1rem auto"}}>
                     <Box sx={{width:'100%',display:"flex", justifyContent:"space-between", alignItems:"center",}}>
                        <Box sx={{width:'100%',display:"flex",flexDirection:"column"}}>
                            <h2>Hello John</h2>

                            <p>13 December 2024</p>
                        </Box>
                        <Box sx={{width:'100%',display:"flex",justifyContent:"flex-end"}}>
                            <Button sx={{background:"black",padding:'10px',color:"white"}}> Add New Task</Button>

                            <Box sx={{background:"#eee",padding:'10px',marginLeft:"2rem"}}>
                                <h5>Search</h5>
                            </Box>
                        </Box>
                     </Box>
                </Box>
               
            </MiddleSection>
        </DashboardContainer>
    </OverallDashboardContainer>

    </>
  )
}

export default Dashboard