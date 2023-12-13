// AppBar.tsx
import React from 'react';
import {
  AppBar as MuiAppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import CollegeSearch from '../home/StudentSearch/StudentSearch';
import Translate from './Translate';
import Chat from '../home/Chat/Chat';
import * as io from "socket.io-client";
import { useSelector } from 'react-redux';
import { retrieveUsers } from '../store/slices/login-slice';
import User from '../models/user';

const chatURL = 'http://localhost:3001/chats';

interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const studentLoggedIn : User[] = useSelector(retrieveUsers());
  // console.log("stu", studentLoggedIn);
  const socket = io.connect("http://localhost:4000");
  let chatId = localStorage.getItem('chatId');
  // if (chatId === null) {
  //   fetch(`${chatURL}/657918799114da85a4284b3d`, {
  //     method: 'PATCH',
  //     body: JSON.stringify({authorId: "", authorName: username, messageBody: currentMessage, timeStamp: timeStamp}),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }


  socket.emit("join_room", chatId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [isChatOpen, setIsChatOpen] = React.useState<boolean | HTMLElement>(false);

  const toggleChat = () => {
    console.log("Chat", !isChatOpen);
    setIsChatOpen(!isChatOpen);
  };

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
    handleClose();

  }

  const profile = ()=> {

    navigate('/profile');

  }
  const studentdetails = ()=> {

    navigate('/profile');
    navigate('/studentdetails');
    handleClose();

  }

  
  const loginpage = ()=> {

    navigate('/login');
    handleClose();

  }

  const handleLogout = () => {
    // Implement your logout logic here
    handleClose();
  };

  return (
    <>
    <MuiAppBar position="fixed" color="default" sx={{padding: 1}}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="school">
          <SchoolIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PanoramaEd
        </Typography>
        <CollegeSearch/>

        <Button color="inherit" onClick={postRoute}>
          Feed
        </Button>
        <Button color="inherit" onClick={collegeCompareRoute}>
          College Compare
        </Button>
        <Button color="inherit" onClick={findCollegeRoute}>
          Find College
        </Button>

        <IconButton color="inherit" onClick={toggleChat}>
          <ChatIcon />
        </IconButton>
        <IconButton color="inherit">
          <Translate />
        </IconButton>
        {/* User profile picture with popup menu */}
        <IconButton aria-label="user profile" color="inherit" onClick={handleClick}>
          <Avatar alt="User"  />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={studentdetails}>My Profile</MenuItem>
          <MenuItem onClick={studentform}>Edit Profile</MenuItem>
          <MenuItem onClick={loginpage}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </MuiAppBar>
    
    {
      isChatOpen && <Chat socket={socket} username={String(Math.random())} room={localStorage.getItem('chatId') || ''}/>
    }
    </>
  );
};

export default NavBar;
