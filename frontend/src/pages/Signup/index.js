import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Divider, TextField } from '@mui/material';
import { FormAuth, FormContainer, FormForget, FormHeader, NavContainer,  OverallContainer} from '../Login/styled';
import GoogleLoginButton from '../../components/GoogleAuthLogin';
import { enqueueSnackbar } from 'notistack';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
      username: "",
      email: "",
      password: "",
    });
  
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
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/signup?username=${formData.username}&email=${formData.email}&password=${formData.password}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log(
            response,
            "Registration successful, check email for the verification code...",
            responseData.data
          );
          enqueueSnackbar(`Registration successful`, {
            variant: "success",
          });
          navigate("/");
        } else {
          const responseData = await response.text();
          enqueueSnackbar(responseData, {
            variant: "error",
          });
          enqueueSnackbar(` ${responseData.message}`, {
            variant: "success",
          });
          console.error(responseData.message);
        }
      } catch (error) {
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        });
        console.error(`Error during signup:`, error.message);
      }
    };
  
    return (
      <OverallContainer>
        {/* ... (your existing JSX code) ... */}
        <FormContainer>
            <FormHeader>
                Sign up
            </FormHeader>
            <GoogleLoginButton/>

            <Divider sx={{mt:3,mb:3, color: "#b5b6ba"}}>or</Divider>
        <form style={{ width: "100%", }} onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              mx: 'auto',
            }}
          >
            {/* ... (your existing TextField components for first_name, last_name, etc.) ... */}
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
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
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                  backgroundColor: '#6747c7',
                },
              }}
            >
              Sign up
            </Button>
          </Box>
        </form>

        </FormContainer>
        {/* ... (your existing JSX code) ... */}
      </OverallContainer>
    );
  }
  

export default SignUp