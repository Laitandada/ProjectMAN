import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Divider, TextField } from '@mui/material';
import { FormAuth, FormContainer, FormForget, FormHeader, NavContainer,  OverallContainer} from '../Login/styled';
import GoogleLoginButton from '../../components/GoogleAuthLogin';
import { enqueueSnackbar } from 'notistack';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ProfileImage, ProfileImageContainer } from './styled';
import AWS from "aws-sdk";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/auth.slice';
function SignUp() {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
 
    
    useEffect(() => {
        // Redirect to home page if not authenticated
        if (isAuthenticated) {
          navigate("/");
        }
      }, [isAuthenticated]);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
      username: "",
      email: "",
      password: "",
      thumbnail:""
    });
    const [backgroundImage, setBackgroundImage] = useState('');
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("null");
  const   dispatch = useDispatch()
  useEffect(() => {
    setFormData({
      ...formData,
      thumbnail: imageName,
    });
  }, [imageName]);
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
    const handleImageChange = (e) => {
      // Uploaded file
      const file = e.target.files[0];
      // Changing file state
      if (file) {
              const reader = new FileReader();
  
        reader.onloadend = () => {
          setBackgroundImage(reader.result);
          
        };
        reader.readAsDataURL(file);
      }
      setFile(file);
      let addParams = Date.now();
          // Upload image to S3 bucket
         
            setImageName (`Image${addParams}.${file.type.split("/")[1]}`);
                
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const validationErrors = [];
  
      if (!file || !formData.thumbnail) {
        validationErrors.push("Choose an image");
      }
      if (!formData.username) {
        validationErrors.push("username is required");
      }
      if (!formData.email) {
        validationErrors.push("email is required");
      }
      if (!formData.password) {
        validationErrors.push("password is required");
      }
      
     
  
      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => {
          enqueueSnackbar(error, {
            variant: "error",
          });
        });
        return;
      }
  
      // S3 Bucket Name
      const S3_BUCKET = "sharechallenge";
  
      // S3 Region
      const REGION = "us-east-1";
  
      // S3 Credentials
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      });
  
      const s3 = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
      });
  
      // Files Parameters
      const params = {
        Bucket: S3_BUCKET,
        Key: imageName,
        Body: file,
      };
      const uploadInstance = s3.upload(params);

      // Listen for events to track the upload progress
    
      
      // Handle successful upload
      uploadInstance.promise().then((data) => {
        console.log("Upload successful:", data.Location);
      }).catch((err) => {
        console.error("Error uploading file:", err);
      });
        const response = await fetch(`http://127.0.0.1:8000/api/users/signup?username=${formData.username}&email=${formData.email}&password=${formData.password}&thumbnail=${imageName.toString()}`, {
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
            responseData
          );
          dispatch(setUser(responseData.user));
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
        <ProfileImageContainer>
            <ProfileImage thumbnail={formData.thumbnail}  >
              <Avatar src={backgroundImage || "" } style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#EFEFEF",
                  marginLeft: "3px",
                  marginBottom: "3px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  document.getElementById("imageInput").click()
                }/>
             
              <input
        id="imageInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
            </ProfileImage>
          </ProfileImageContainer>
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