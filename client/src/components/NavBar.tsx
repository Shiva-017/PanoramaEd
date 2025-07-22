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
  Button,
  Box,
  Stack,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
  InputBase,
  alpha
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate, useLocation } from 'react-router-dom';
import CollegeSearch from '../home/StudentSearch/StudentSearch';
import Translate from './Translate';
import Chat from '../home/Chat/Chat';
import * as io from "socket.io-client";
import { useSelector } from 'react-redux';
import { retrieveUsers } from '../store/slices/login-slice';
import User from '../models/user';
import BraintreeDropIn from './BraintreeDropin';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedIcon from '@mui/icons-material/Feed';
import CompareIcon from '@mui/icons-material/Compare';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';

const chatURL = 'http://localhost:3001/chats';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const studentLoggedIn: User = useSelector(retrieveUsers())[0];
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [showBraintreeDropIn, setShowBraintreeDropIn] = React.useState(false);
  const [chatId, setChatId] = React.useState<string>('');
  const [socket, setSocket] = React.useState<any>('');
  const [clientToken, setClientToken] = React.useState<any>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isChatOpen, setIsChatOpen] = React.useState<boolean>(false);
  const [isChatEmitted, setIsChatEmitted] = React.useState<boolean>(false);

  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/posts') return 'feed';
    if (path === '/college-compare') return 'compare';
    if (path === '/find-college') return 'find';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/') return 'home';
    return '';
  };

  const activeTab = getActiveTab();

  // Socket and chat initialization
  // if (chatId === '') {
  //   if (socket === '') {
  //     setSocket(io.connect("http://localhost:4000"));
  //   }
  //   fetch(`${chatURL}/?userId=${studentLoggedIn?._id}`, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setChatId(data[0]?._id);
  //     });
  // }
  if (chatId === '') {
  if (socket === '') {
    setSocket(io.connect("http://localhost:4000"));
  }
  // Fixed room for demo - all users join same room
  setChatId('demo-global-chat');
}

  const toggleChat = () => {
    if (!isChatEmitted) {
      setIsChatEmitted(true);
      socket.emit("join_room", chatId);
    }
    setIsChatOpen(!isChatOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Navigation handlers
  const postRoute = () => navigate('/posts');
  const collegeCompareRoute = () => navigate('/college-compare');
  const findCollegeRoute = () => navigate('/find-college');
  // const dashboardRoute = () => navigate('/dashboard');
  const homeRoute = () => navigate('/');

  const studentform = () => {
    navigate('/studentform');
    handleClose();
  };

  const profile = () => navigate('/profile');

  const studentdetails = () => {
    navigate('/profile');
    navigate('/studentdetails');
    handleClose();
  };

  const loginpage = () => {
    window.localStorage.clear();
    navigate('/login');
    handleClose();
  };

  const initializePayment = async () => {
    try {
      const response = await fetch(`http://localhost:3001/process-payment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setClientToken(data);
    } catch (err) {
      console.error('Payment initialization error:', err);
    }
  };

  // Enhanced navigation button with active state highlighting
  const NavButton = ({ 
    children, 
    onClick, 
    icon,
    tabName,
    isActive = false
  }: { 
    children: React.ReactNode;
    onClick: () => void;
    icon?: React.ReactNode;
    tabName: string;
    isActive?: boolean;
  }) => (
    <Button 
      onClick={onClick}
      sx={{
        color: 'white',
        fontWeight: 600,
        px: 3,
        py: 1.5,
        borderRadius: 3,
        textTransform: 'none',
        fontSize: '0.95rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isActive 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'transparent',
        backdropFilter: isActive ? 'blur(10px)' : 'none',
        border: isActive 
          ? '1px solid rgba(255, 255, 255, 0.3)' 
          : '1px solid transparent',
        transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: isActive 
          ? '0 8px 25px rgba(255, 255, 255, 0.15)' 
          : 'none',
        '&:hover': {
          background: isActive 
            ? 'rgba(255, 255, 255, 0.25)' 
            : 'rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 30px rgba(255, 255, 255, 0.2)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: isActive ? '0%' : '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transition: 'left 0.6s ease',
        },
        '&:hover::before': {
          left: '100%',
        },
        // Active indicator - bottom border
        '&::after': isActive ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, white, transparent)',
          borderRadius: '2px 2px 0 0',
          animation: 'slideIn 0.3s ease-out',
        } : {},
        '@keyframes slideIn': {
          from: { width: '0%' },
          to: { width: '60%' }
        }
      }}
      startIcon={
        <Box sx={{ 
          color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center'
        }}>
          {icon}
        </Box>
      }
    >
      {children}
    </Button>
  );

  return (
    <>
      <MuiAppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 8s ease infinite',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(102, 126, 234, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }}
      >
        <Toolbar sx={{ py: 1, minHeight: '70px !important' }}>
          {/* Logo Section with click handler */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={2} 
            sx={{ 
              mr: 4,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }}
            onClick={homeRoute}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(5deg)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              <SchoolIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.8px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  lineHeight: 1
                }}
              >
                PanoramaEd
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                Study Abroad Platform
              </Typography>
            </Box>
          </Stack>

          {/* Search Section */}
          <Box sx={{ flexGrow: 1, maxWidth: 600, mx: 3 }}>
            <CollegeSearch />
          </Box>

          {/* Navigation Buttons with Active State */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: 3 }}>
            {/* <NavButton 
              // onClick={dashboardRoute}
              icon={<DashboardIcon sx={{ fontSize: 20 }} />}
              tabName="dashboard"
              isActive={activeTab === 'dashboard'}
            >
              Dashboard
            </NavButton> */}
            
            <NavButton 
              onClick={postRoute}
              icon={<FeedIcon sx={{ fontSize: 20 }} />}
              tabName="feed"
              isActive={activeTab === 'feed'}
            >
              Feed
            </NavButton>
            
            <NavButton 
              onClick={collegeCompareRoute}
              icon={<CompareIcon sx={{ fontSize: 20 }} />}
              tabName="compare"
              isActive={activeTab === 'compare'}
            >
              Compare
            </NavButton>
            
            <NavButton 
              onClick={findCollegeRoute}
              icon={<SearchIcon sx={{ fontSize: 20 }} />}
              tabName="find"
              isActive={activeTab === 'find'}
            >
              Find College
            </NavButton>
          </Stack>

          {/* Action Icons */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            {/* Chat Icon with enhanced active state */}
            <IconButton 
              onClick={toggleChat}
              sx={{
                color: 'white',
                background: isChatOpen 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: 48,
                height: 48,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.25)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
                }
              }}
            >
              <Badge 
                badgeContent={0} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: '18px',
                    height: '18px',
                    fontWeight: 600
                  }
                }}
              >
                <ChatIcon />
              </Badge>
            </IconButton>

            {/* Notifications */}
            <IconButton 
              sx={{
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: 48,
                height: 48,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.25)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
                }
              }}
            >
              <Badge 
                badgeContent={3} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    minWidth: '18px',
                    height: '18px',
                    fontWeight: 600
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Language Toggle with enhanced styling */}
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                p: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Translate />
            </Box>

            {/* User Avatar with Enhanced Menu */}
            <IconButton 
              onClick={handleClick}
              sx={{
                p: 0,
                ml: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      backgroundColor: '#4caf50',
                      border: '3px solid white',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' }
                      }
                    }}
                  />
                }
              >
                <Avatar 
                  sx={{ 
                    width: 45, 
                    height: 45,
                    border: '3px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    fontSize: '1.2rem',
                    fontWeight: 600
                  }}
                >
                  {studentLoggedIn?.name?.charAt(0) || 'S'}
                </Avatar>
              </Badge>
            </IconButton>

            {/* Enhanced User Menu */}
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 2,
                  borderRadius: 4,
                  minWidth: 240,
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
                  '& .MuiMenuItem-root': {
                    borderRadius: 3,
                    margin: '4px 12px',
                    padding: '12px 16px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.08)',
                      transform: 'translateX(4px)',
                    }
                  }
                }
              }}
            >
              {/* User Info Header */}
              <Box sx={{ 
                px: 3, 
                py: 2, 
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))'
              }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar 
                    sx={{ 
                      width: 50, 
                      height: 50,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    }}
                  >
                    {studentLoggedIn?.name?.charAt(0) || 'S'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} color="#667eea">
                      {studentLoggedIn?.name || 'Student'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {studentLoggedIn?.email}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <MenuItem onClick={studentdetails}>
                <ListItemIcon>
                  <PersonIcon sx={{ color: '#667eea' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="My Profile" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </MenuItem>

              <MenuItem onClick={studentform}>
                <ListItemIcon>
                  <EditIcon sx={{ color: '#4caf50' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Edit Profile" 
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </MenuItem>

              <Divider sx={{ my: 1, mx: 2 }} />

              <MenuItem onClick={loginpage}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#f44336' }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{ fontWeight: 600, color: '#f44336' }}
                />
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </MuiAppBar>

      {/* Enhanced Chat Component */}
      {isChatOpen && <Chat socket={socket} room={chatId || ''} />}

      {/* Braintree Payment Component */}
      <BraintreeDropIn
        show={showBraintreeDropIn}
        onPaymentCompleted={() => {
          setShowBraintreeDropIn(false);
        }}
      />
    </>
  );
};

export default NavBar;