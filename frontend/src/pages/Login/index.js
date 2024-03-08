import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { FormAuth, FormContainer, FormForget, FormHeader, NavContainer, OverallContainer } from './styled';
import GoogleLoginButton from '../../components/GoogleAuthLogin';
import { enqueueSnackbar } from 'notistack';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    
    email: "",
    password: "",
   
  });
  console.log(formData)
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:5000/api/";
    const endpoint = "login"

    // Exclude unnecessary fields for login
   

    try {
      const response = await fetch(`http://localhost:8000/api/users/login?email=${formData.email}&password=${formData.password}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        const responseData = await response.json();
       
        console.log(responseData);
        enqueueSnackbar("Login Successful", {
          variant: "success",
        });
        navigate("/dashboard");
      } else {
        // Handle errors
        const responseData = await response.text();
        enqueueSnackbar(responseData, {
          variant: "error",
        });
        console.error(responseData);
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: "error",
      });
      console.error(`Error during ${endpoint}:`, error.message);
    }
  };
  return (
    <OverallContainer >
        <NavContainer>
        <img  src="./assests/Logo.svg" alt='logo' style={{maxWidth:"150px",width:"100%",marginLeft:'36px',marginTop:"20px"}}/>
        </NavContainer>
        <FormContainer>
            <FormHeader>
                Log in
            </FormHeader>
            <GoogleLoginButton/>

            <Divider sx={{mt:3,mb:3, color: "#b5b6ba"}}>or</Divider>

            <form style={{width:"100%"}} onSubmit={handleSubmit}>
            <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          mx: 'auto',
        }}
      >
       
        <TextField
          variant="outlined"
          margin="normal"
          type="email"
          name="email"
          value={formData.email}
                        onChange={handleInputChange}
          placeholder="Email"
          required
          
        />

            <TextField
              variant="outlined"
              margin="normal"
         
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
                        onChange={handleInputChange}
              placeholder="Password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          
    
            
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 5,
            backgroundColor: '#6747c7',
            height: '53px',
            borderRadius: '0.25rem',
            border: 'none',
         
            '&:hover': {
              backgroundColor: '#6747c7', // Change the color on hover
            },
          }}
        >
         Log in
        </Button>
      </Box>
            </form>

            <Link to="/forgotPassword" style={{textDecoration:'none'}} >
                <FormForget>
                    Forgot Password?
                </FormForget>
            </Link>
       <FormAuth>
       Not a member yet? <Link to="/signup" style={{textDecoration:'none'}} >
             
                   <span style={{color:"#6747c7"}}> Sign up</span>
              
            </Link> and get started now!
       </FormAuth>

        </FormContainer>

    </OverallContainer>
  )
}

export default Login