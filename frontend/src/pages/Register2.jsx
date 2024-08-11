import { useState } from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
// import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';

import './Register.css';

import { ToastContainer, toast } from 'react-toastify';
// import { SignUp } from '../services/api';
import axios from 'axios';

const Register2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

 
//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phonePattern = /^\d{10}$/;
//     return phonePattern.test(phone);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 8;
//   };
const data = {
  name:formData.name,
  email:formData.email,
  password:formData.password,
  phone:formData.phone,
  address:formData.address,
  role: 'User' 
};

  const handleSignup = async (e) => {
    e.preventDefault();
    
    console.log("DATA",formData);
    const res = await axios.post('http://localhost:8083/api/auth/register',data);
    
    if (res.data==="User registered successfully.") {

        toast.success("Signup Success")
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    else {
        toast.error(res.data)
        // console.log(res.data)
    }
    
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className='r-body'>
      <Box className="signup-container">
        <Box
          component="form"
          className="signup-form"
          noValidate
          autoComplete="off"
          onSubmit={handleSignup}
        >
          <Typography variant="h4" component="h1" gutterBottom className="h">
            SignUp
          </Typography>
          <Box className="form-row">
            <Box className="form-column">
              <FormControl variant="filled">
                <InputLabel htmlFor="component-filled-name">Name</InputLabel>
                <FilledInput
                  id="component-filled-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
               </FormControl>
              <FormControl variant="filled" >
                <InputLabel htmlFor="component-filled-email">Email</InputLabel>
                <FilledInput
                  id="component-filled-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
               </FormControl>
              <FormControl variant="filled">
                <InputLabel htmlFor="component-filled-phone">Phone Number</InputLabel>
                <FilledInput
                  id="component-filled-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
               </FormControl>
            </Box>
            <Box className="form-column">
              <FormControl variant="filled" >
                <InputLabel htmlFor="component-filled-address">Address</InputLabel>
                <FilledInput
                  id="component-filled-address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
               </FormControl>
              <FormControl variant="filled"  >
                <InputLabel htmlFor="component-filled-password">Password</InputLabel>
                <FilledInput
                  id="component-filled-password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                 </FormControl>
              <FormControl variant="filled"  >
                <InputLabel htmlFor="component-filled-confirm-password">Confirm Password</InputLabel>
                <FilledInput
                  id="component-filled-confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
               </FormControl>
            </Box>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.termsAccepted}
                onChange={handleChange}
                name="termsAccepted"
                color="primary"
              />
            }
            label="I agree to the terms and conditions"
          />
          <Button type="submit" variant="contained" color="primary" className="submit-button">
            Sign Up
          </Button>
          <Typography variant="body2" className="login-text">
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Register2;
