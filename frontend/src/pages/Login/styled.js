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
  
  export const OverallContainer = styled(Box)`
    display:flex;
    flex-direction:column;
    width: 100%;
    height: 100vh;
    
  `;
  export const NavContainer = styled(Box)`
    
    width: 100%;
    height: 10vh;
   
    
  `;
  export const FormContainer = styled(Box)`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 85%;
  max-width:400px;
  margin:0 auto;
    
  `;
  export const SemiCircle = styled(Box)`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    width: 35%;
    
  `;

  export const ImageText = styled(Typography)`
  text-align: center;
font: normal normal normal 70px/84px Lato;
letter-spacing: 0px;
color: #000000;
opacity: 1;
    width: 100%;
    
  `;
  export const FormHeader = styled(Typography)`
  font-size:24px;
  font-weight:700;
  // font-family:DM Sans;
  line-height:150%;
  color: #43434b;

    
  `;
  export const FormForget = styled(Typography)`
  font-size:14px;
  font-weight:700;
  // font-family:DM Sans;
  line-height:150%;
  color: #6747c7;
  margin:1.2rem 0;
    
  `;
  export const FormAuth = styled(Typography)`
  font-size:16px;
  font-weight:900;
  // font-family:DM Sans;
  line-height:150%;
  color: #43434b;
  text-align:center;
    
  `;
  export const StyledFormLabel = styled(Typography)`
font-family: DM Sans;
font-style: normal;
font-weight: 500;
font-size: 17px;
line-height: 18px;
letter-spacing: -0.02em;
width:75%;
display:flex;
justify-content: center;
align-items: center;
margin:0 auto;
color: #000000;

  @media (max-width: 900px) {
  }
`;
export const GoogleAuthButton = styled(Button)`

margin-top:1rem;


  @media (max-width: 900px) {
  }
`;

  export const FormInput = styled(Typography)`
  background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 0px 3px 6px #00000029;
border-radius: 20px;
opacity: 1;
height:48px;
width: 100%;
    
  `;
  export const ForgotPassword = styled(Typography)`
  text-align: left;
font: normal normal normal 47px/56px Lato;
letter-spacing: 0px;
color: #000000;
text-transform: capitalize;
opacity: 1;
  `;
  export const SubmitButton = styled(Box)`
  background: #9503FF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 3px #9503FF;
  border-radius: 100px;
  opacity: 1;
  width :100%;
  display:flex;
 
  justify-content: center;
  align-items: center;
  `;
  export const InputBox = styled(Box)`
  
  width :60px;
  height :60px;
  display:flex;
 
  justify-content: center;
  align-items: center;
  `;
  export const SubmitButtonText = styled(Typography)`
  text-align: left;
font: normal normal bold 87px/105px Lato;
letter-spacing: 0px;
color: #FFFFFF;
text-transform: uppercase;
opacity: 1;
  `;
  export const DividerLine = styled(Box)`
  border: 1px solid #707070;
opacity: 1;
  `;
