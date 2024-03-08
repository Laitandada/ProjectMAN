

import React from 'react';
import { GoogleLogin } from 'react-google-login';

import GoogleIcons from "./GoogleIcons.svg";
import { Button } from '@mui/material';
import { GoogleAuthButton, StyledFormLabel } from '../pages/Login/styled';
const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // For Handling response 
  };
  const buttonStyle = {
    width: "100%",
  
    border: "1px solid #c1c7ca",
    borderRadius: "7px",
    textTransform: "capitalize",
    fontWeight: 500,
    fontSize: "10px",
    letterSpacing: "-0.02em",
    color: "#000000",
    display: "flex",
  
    alignItems: "center",
    height: 46,
    paddingLeft: 10,
    transition: 'background-color 0.3s ease', 
    cursor: 'pointer',
  };

  
  return (
  
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        render={(renderProps) => (
            <GoogleAuthButton onClick={renderProps.onClick} style={buttonStyle}  sx={{
                "&:hover": {
                    backgroundColor: "#eee", 
                  },
            }}>
            <img src={GoogleIcons} alt="google icon" />
            <StyledFormLabel sx={{ marginLeft: 2 }}>Continue with Google</StyledFormLabel>
          </GoogleAuthButton>
          )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      
      />
   
  );
};

export default GoogleLoginButton;
