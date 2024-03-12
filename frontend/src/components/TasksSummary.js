import { Box, Typography } from '@mui/material';
import React from 'react';

const TaskList = ({ tasks }) => {
  

  const uniqueRoomNames = [...new Set(tasks.map(task => task?.task.room.name))];

  const roomCounts = new Map();

  // Loop through the tasks and update the count for each assigned user and room
  tasks.forEach((task) => {
    const { assigned_users, room } = task.task;
    const roomName = room.name;

    assigned_users.forEach((user) => {
      const username = user.username;

      // Initialize the count for the room if it doesn't exist
      if (!roomCounts.has(roomName)) {
        roomCounts.set(roomName, new Map());
      }

      // Update the count for the assigned user in the room
      const userCount = roomCounts.get(roomName);
      userCount.set(username, (userCount.get(username) || 0) + 1);
    });
  });


  return (
    <div style={{width:"100%"}}>
      {/* <h2>Unique Room Names:</h2>
      <ul>
     
        {uniqueRoomNames.map((roomName, index) => (
          <li key={index}>{roomName}</li>
        ))}
      </ul> */}
      <Typography sx={{ color: "#001C1A", fontWeight: "700", fontFamily:"DM Sans", fontSize:"1.2rem" }}>
                    Task Summary
                  </Typography>
                  <Box className="task-summary">
                  {/* {uniqueRoomNames.map((roomName, index) => ( */}
  

    
         
 
        {[...roomCounts].map(([roomName, userCount]) => (
            <><Box
                sx={{
                    background: "#EFEFEF",
                    padding: "30px",
                    borderRadius: "15px",
                }}
            >
                
                {[...userCount].map(([username, count]) => (
                    <div key={username} style={{fontSize:"1.5rem",fontWeight:"700",fontFamily:"DM Sans",color:"#001C1A",marginBottom:"10px"}}>
                        {count} 
                    </div>
                ))}
                <Typography sx={{ color: "#001C1A", fontWeight: "300",fontSize:"0.85rem" }}>
    {" "}
   { roomName}
  </Typography>
            </Box></>
        ))}

 
  
</Box>

                  
                    
                  
    </div>
  );
};

export default TaskList;
