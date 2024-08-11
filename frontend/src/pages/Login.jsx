import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import 'react-toastify/dist/ReactToastify.css';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { ToastContainer, toast } from 'react-toastify';
import FormHelperText from '@mui/material/FormHelperText';
// import { Alert, Snackbar } from '@mui/material';
import { authService } from '../services/auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false
  });
  const checkRedirect = async (token) => {
   authService.setToken(token);
   console.log(token);
      const userRole = authService.getUserRole();
      if (userRole !== null) 
      {
        if (userRole === "Admin") 
        {          
          navigate('/admin-dashboard');
          console.log("ADMIN");
        }
        else if (userRole === "User") {
          navigate('/');
          console.log("USER");
        } 
        else 
        {
          toast.error("Something went wrong");
          console.log("WRONG");
        }
      }
      else 
      {
        console.log("NULL USER");
      }
    
  };

  // useEffect(() => {
  //   checkRedirect();
  // }, []);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: !validateEmail(formData.email),
      password: !formData.password,
    };
    setErrors(newErrors);
  
    console.log("login clicked");
    try 
    {
      console.log("In progress");
      console.log(formData.email,formData.password);
      const res = await authService.SignIn(formData.email,formData.password);
      console.log(res);  

      if (res.status === 200) 
        {
          const { token, user } = res.data;
          authService.setToken(token);
          authService.setUser(user); 
          toast.success('Login successful!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
            console.log(res.data.accessToken)
            console.log(authService.getToken())
            setTimeout(() => {
              checkRedirect(token);
          }, 2000);

        }
    } 
    catch (error) 
    {
        console.log('Login failed:', error.response); // Log the error response
        toast.error('Login failed. Please check your credentials.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
      });}
};
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};


return (
  <div className='l-body'>
    <Box className="login-container">
      <Box
        component="form"
        className="login-form"
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <Typography variant="h4" component="h1" gutterBottom className="h">
          Login
        </Typography>
        <FormControl variant="filled" error={errors.email}>
          <InputLabel htmlFor="component-filled-email">Email</InputLabel>
          <FilledInput
            id="component-filled-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <FormHelperText>Valid email is required</FormHelperText>}
        </FormControl>
        <FormControl variant="filled" error={errors.password}>
          <InputLabel htmlFor="component-filled-password">Password</InputLabel>
          <FilledInput
            id="component-filled-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <FormHelperText>Password is required</FormHelperText>}
        </FormControl>
        <Button type="submit" variant="contained" color="primary" className="submit-button">
          Login
      
        </Button>
        <br />
        <Typography variant="body2" className="signup-text">
          Dont have an account? <Link href="/register">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
    
    <ToastContainer />
  </div>
);
};

export default Login;


