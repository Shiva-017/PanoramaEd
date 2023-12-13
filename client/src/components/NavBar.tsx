// AppBar.tsx
import React from 'react';
import {
  AppBar as MuiAppBar,
  Avatar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import logo from '../resources/anthony.jpeg';
import { useNavigate } from 'react-router-dom';


interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = ({
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const postRoute = ()=> {
    navigate('/posts');

  }
  const collegeCompareRoute = ()=> {

    navigate('/college-compare');

  }
  const findCollegeRoute = ()=> {

    navigate('/find-college');

  }

  const studentform = ()=> {

    navigate('/studentform');

  }

  const profile = ()=> {

    navigate('/profile');

  }
  const studentdetails = ()=> {

    navigate('/studentdetails');

  }

  const handleLogout = () => {
    // Implement your logout logic here
    handleClose();
  };

  return (
    <MuiAppBar position="fixed" color="default">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="school">
          <SchoolIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PanoramaEd
        </Typography>

        <TextField
          id="search"
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button color="inherit" onClick={postRoute}>
          Feed
        </Button>
        <Button color="inherit" onClick={collegeCompareRoute}>
          College Compare
        </Button>
        <Button color="inherit" onClick={findCollegeRoute}>
          Find College
        </Button>

        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <StarIcon />
        </IconButton>
        <IconButton color="inherit">
          <FavoriteBorderIcon />
        </IconButton>

        {/* User profile picture with popup menu */}
        <IconButton aria-label="user profile" color="inherit" onClick={handleClick}>
          <Avatar alt="User" src={logo} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={studentdetails}>My Profile</MenuItem>
          <MenuItem onClick={studentform}>Edit Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
  );
};

export default NavBar;
