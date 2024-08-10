import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import toast, { Toaster } from 'react-hot-toast';
// import { Alert, Snackbar } from '@mui/material';
import { authService } from '../services/auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const checkRedirect = async (e) => {
    e.preventDefault();
    if (authService.getToken() !== null && authService.isLoggedIn()) {
      const userRole = authService.getUserRole();
      if (userRole !== null) {
        if (userRole === "Admin") {
          navigate('/admin/dashboard');
          console.log("ADMIN");
        } else if (userRole === "User") {
          navigate('/user/dashboard');
          console.log("USER");
        } else {
          toast.error("Something went wrong");
          console.log("WRONG");
        }
      } else {
        console.log("NULL USER");
      }
    }
  };

  useEffect(() => {
    checkRedirect();
  }, []);

  
  const handleLogin = async (e) => {
    // e.preventDefault();
    try {
        const res = await authService.SignIn(emailRef.current.value, passwordRef.current.value);
        console.log(res);  // Log the response to see what's returned
        if (res.status === 200) {
            authService.setToken(res.data.accessToken);
            toast.success("Welcome");
            setTimeout(() => {
                checkRedirect(e);
            }, 3000);
        }
    } catch (error) {
        console.error('Login failed:', error.response); // Log the error response
        toast.error("Login failed. Please check your credentials.");
    }
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
          <FormControl variant="filled">
            <InputLabel htmlFor="component-filled-email">Email</InputLabel>
            <FilledInput
              ref={emailRef}
              id="component-filled-email"
              name="email"
            />
          </FormControl>
          <FormControl variant="filled">
            <InputLabel htmlFor="component-filled-password">Password</InputLabel>
            <FilledInput
              ref={passwordRef}
              id="component-filled-password"
              name="password"
              type="password"
            />
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
      <Toaster />
    </div>
  );
};

export default Login;
