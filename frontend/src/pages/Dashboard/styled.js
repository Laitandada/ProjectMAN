import styled from "@emotion/styled";
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    Link,
    TextField,
    Typography,
  } from "@mui/material";
  
  export const OverallDashboardContainer = styled(Box)`
    display:flex;
    
    width: 100%;

    
  `;
  export const DashboardContainer = styled(Box)`
    display:flex;
    align-items: center;
    
    width: 100%;

    
  `;
  export const SideLeftSection = styled(Box)`
  display:flex;
  flex-direction:column;
  width: 20%;
  height:100%;
color:white;
background-color:#266663;
justify-content:space-evenly;
align-items:center;
  
`;
  export const MiddleSection = styled(Box)`
  display:flex;
  flex-direction:column;
  width: 60%;
  height:100%;
  
`;
  export const SideRightSection = styled(Box)`
  display:flex;
  flex-direction:column;
  width: 20%;
  background-color:#94e8e4;
border-top-left-radius:20px;
border-bottom-left-radius:20px;
   height:100%;
color:white;
`;
  export const NavContainer = styled(Box)`
    
    width: 100%;
    height: 10vh;
   
    
  `;
 