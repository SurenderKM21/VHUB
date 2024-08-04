import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import axios from 'axios';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [technicians,setTechnicians] =useState([]);
  const [bookings, setBookings] = useState([]);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/Customers');
        setUsers(response.data); 
        console.log('Users from API:', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/Technicians');
        setTechnicians(response.data); 
        console.log('Technicians from API:', response.data);
      } catch (error) {
        console.error('Error fetching Technicians:', error);
      }
    };
    fetchTechnicians();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/Bookings');
        setBookings(response.data); 
        console.log('Bookings from API:', response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleRemoveUser = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/Customers/${id}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user.id !== id));
        alert('Customer deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('An error occurred while deleting the customer. Please try again.');
    }
  };

  const handleRemoveTech = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/Technicians/${id}`);
      if (response.status === 200) {
        console.log('Before state update:', technicians);
        setTechnicians(technicians.filter(technician => technician.tech_id !== id));
        console.log('After state update:', technicians);
        alert('Technician deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting technician:', error);
      alert('An error occurred while deleting the technician. Please try again.');
    }
  };
  
  const handleRemoveBooking = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/Bookings/${id}`);
      if (response.status === 200) {
        setBookings(bookings.filter(booking => booking.id !== id));
        alert('Booking deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('An error occurred while deleting the booking. Please try again.');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate('/logina');
  };
  const handleChangePassword = async () => {
    const adminEmail = 'admin@gmail.com'; // Replace with dynamic admin email if needed
    const response = await axios.get('http://127.0.0.1:8080/Admin/getAll');
    const admins = response.data;
    const admin = admins.find(admin => admin.email === adminEmail && admin.password === oldPassword);
    console.log(admin);
    try {
    if (admin!=null) {
      console.log("ADMIN");
        await axios.put(`http://127.0.0.1:8080/Admin/${adminEmail}`, { ...admin, password: newPassword });
        setOpenChangePassword(false);
        setOldPassword('');
        setNewPassword('');
        setPasswordError('');
        alert('Password changed successfully');
      } else {
        setPasswordError('Old password is incorrect');
      }
    } catch (error) {
      console.error('Error changing password:', error.response ? error.response.data : error.message);
      // setPasswordError('An error occurred while changing the password. Please try again.');
      alert('An error occurred while changing the password. Please try again.');
     }
  };
  

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <Button onClick={() => setOpenChangePassword(true)} className="change-password-button">Change Password</Button>
      <Button onClick={handleLogout} className="logout-button">Logout</Button>

      <div className="summary">
        <p>Number of Users: {users.length}</p>
        <p>Number of Bookings: {bookings.length}</p>
      </div>

      <h2>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td className="actions">
                <Button onClick={() => handleRemoveUser(user.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Technicians</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Expert</th>
            <th>Email</th>
            <th>Age</th>
            <th>Experience</th>
            <th>Join date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((tech) => (
            <tr key={tech.tech_id}>
              <td>{tech.name}</td>
              <td>{tech.address}</td>
              <td>{tech.phone}</td>
              <td>{tech.gender}</td>
              <td>{tech.expert}</td>
              <td>{tech.email}</td>
              <td>{tech.age}</td>
              <td>{tech.experience}</td>
              <td>{tech.joindate}</td>
              <td className="actions">
                <Button onClick={() => handleRemoveTech(tech.tech_id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Booking Information</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Vehicle Number</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Problem Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.phonenumber}</td>
              <td>{booking.vehicleNo}</td>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.problemDesc}</td>
              <td className="actions">
                <Button onClick={() => handleRemoveBooking(booking.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openChangePassword} onClose={() => setOpenChangePassword(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              label="Old Password"
              type="password"
              fullWidth
              margin="normal"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangePassword(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} color="primary">Change Password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
