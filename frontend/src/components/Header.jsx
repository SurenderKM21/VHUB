import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';
import { authService } from '../services/auth';
import { User } from '../services/user';

const Header = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const Navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
  };
  const [username, setUsername] = useState(null)
  useEffect(() => {
      const checkAuth = async () => {
          if (!authService.isLoggedIn() || authService.getUserRole() !== "User") {
              Navigate('/login');
          }
          else {
              const usernameData = async () => {
                  const data = await User.getUsername()
                  return setUsername(data);
              };
              usernameData()
          }
      };
      checkAuth();
  }, [Navigate]);

  return (
    <header className="header">
      <div className="logo">
        {/* Add your logo here */}
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/about">About us</Link>
        <Link to="/service">Services</Link>
        {username!=null && <Link to="/book">Book Now</Link>}
        {username!=null ? (
          <div className="user-menu">
            <FaUserCircle className="user-icon" onClick={() => setShowDropdown(!showDropdown)} />
            <span
              className="user-email"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {username} {/* Displaying the user's name */}
            </span>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>View Profile</Link>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
