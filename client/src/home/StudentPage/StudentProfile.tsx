import React, { ReactElement, useState, useEffect } from 'react';
import backGround from '../../resources/northeast.png';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Student from '../../models/student';
import { 
    Avatar, 
    Card, 
    CardMedia, 
    CardActions, 
    CardContent, 
    CardHeader, 
    IconButton, 
    Stack, 
    Typography,
    Box,
    Paper,
    Chip,
    Divider,
    Badge,
    Fade,
    LinearProgress
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import background from '../../resources/3626052.jpg';
import SchoolIcon from '@mui/icons-material/School';
import AirIcon from '@mui/icons-material/Air';
import ShortlistCard from './ShortlistCard';
import { useSelector } from 'react-redux';
import { retrieveUsers} from '../../store/slices/login-slice';
import User from '../../models/user';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { loadStudent, searchstudent } from '../../store/slices/studentdetails-slice'
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';

// Enhanced main component for displaying student profile
const StudentProfile: React.FC = (): ReactElement => {
    // Redux hooks for managing state and dispatch
    const studentLoggedIn: User[] = useSelector(retrieveUsers());
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector(searchstudent());
    const { t } = useTranslation('student-profile');

    // Function to fetch student data from the server
    const getStudentData = async () => {
        try {
            console.log("student", studentLoggedIn);
            // Fetching student data based on the logged-in user's email
            const response = await fetch(`http://localhost:3001/students/${studentLoggedIn[0].email}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(data => {
                    console.log(data, "data");
                    dispatch(loadStudent(data[0]))
                })
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Fetch student data when the component mounts
    useEffect(() => {
        getStudentData();
    }, []);

    // Enhanced ShortlistCard component
    const EnhancedShortlistCard = ({ logo, college, index }: { logo: string, college: string, index: number }) => (
        <Fade in timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateX(8px)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
                        background: 'rgba(255, 255, 255, 1)',
                    }
                }}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                        src={logo}
                        sx={{
                            width: 48,
                            height: 48,
                            border: 2,
                            borderColor: 'rgba(102, 126, 234, 0.2)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            sx={{
                                color: '#2d3748',
                                lineHeight: 1.2
                            }}
                        >
                            {college}
                        </Typography>
                        <Chip
                            icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                            label="Shortlisted"
                            size="small"
                            sx={{
                                mt: 0.5,
                                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                color: '#f44336',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                '& .MuiChip-icon': {
                                    color: '#f44336'
                                }
                            }}
                        />
                    </Box>
                </Stack>
            </Paper>
        </Fade>
    );

    // Render enhanced student profile
    return (
        <Box
            sx={{
                position: 'fixed',
                left: 0,
                top: 50,
                width: 480,
                height: '100vh',
                background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                zIndex: 1000,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(255, 255, 255, 0.1)',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '3px',
                },
            }}
        >
            <Card
                elevation={8}
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    borderRadius: 0,
                    background: 'transparent',
                    boxShadow: 'none',
                    position: 'relative'
                }}
            >
                {/* Profile Header with Background */}
                <Box
                    sx={{
                        position: 'relative',
                        height: 280,
                        background: `linear-gradient(rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3)), url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        pb: 3,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                        }
                    }}
                >
                    {/* Profile Avatar */}
                    <Badge
                        badgeContent={<VerifiedIcon sx={{ fontSize: 16, color: '#4caf50' }} />}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        sx={{ zIndex: 2 }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                border: 4,
                                borderColor: "white",
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                mb: 2,
                                zIndex: 2,
                                position: 'relative'
                            }}
                        />
                    </Badge>

                    {/* Student Name */}
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            color: 'white',
                            fontWeight: 700,
                            textAlign: 'center',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                            zIndex: 2,
                            position: 'relative'
                        }}
                    >
                        {students?.name || 'Student Name'}
                    </Typography>

                    <Chip
                        icon={<PersonIcon sx={{ fontSize: 14 }} />}
                        label="Student Profile"
                        size="small"
                        sx={{
                            mt: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            zIndex: 2,
                            position: 'relative',
                            '& .MuiChip-icon': {
                                color: 'white'
                            }
                        }}
                    />
                </Box>

                {/* Profile Content */}
                <Box
                    sx={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        minHeight: 'calc(100vh - 280px)',
                        p: 3
                    }}
                >
                    {/* Academic Info Section */}
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                            border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#667eea',
                                fontWeight: 700,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <SchoolIcon sx={{ fontSize: 20 }} />
                            Academic Info
                        </Typography>

                        <Stack spacing={3}>
                            {/* Degree Section */}
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: "11px",
                                        color: "#718096",
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        mb: 1,
                                        display: 'block'
                                    }}
                                >
                                    {t('DEGREE')}
                                </Typography>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid rgba(102, 126, 234, 0.1)'
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 2,
                                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <SchoolIcon sx={{ fontSize: 18, color: 'white' }} />
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#2d3748'
                                            }}
                                        >
                                            {students?.degreeseeking || 'Not specified'}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Box>

                            {/* Intake Section */}
                            <Box>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: "11px",
                                        color: "#718096",
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        mb: 1,
                                        display: 'block'
                                    }}
                                >
                                    {t('INTAKE')}
                                </Typography>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid rgba(102, 126, 234, 0.1)'
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: 2,
                                                background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <CalendarTodayIcon sx={{ fontSize: 18, color: 'white' }} />
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#2d3748'
                                            }}
                                        >
                                            {students?.intake || 'Not specified'}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Stack>
                    </Paper>

                    {/* Shortlisted Universities Section */}
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(102, 126, 234, 0.1)'
                        }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#667eea',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <FavoriteIcon sx={{ fontSize: 20 }} />
                                {t('ShortlistedUniversities')}
                            </Typography>
                            {students?.collegeShorlisted && (
                                <Chip
                                    label={`${students.collegeShorlisted.length} selected`}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                        color: '#667eea',
                                        fontWeight: 600
                                    }}
                                />
                            )}
                        </Stack>

                        <Divider sx={{ mb: 2, opacity: 0.3 }} />

                        {/* Shortlisted Universities List */}
                        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                            {students && students.collegeShorlisted && students.collegeShorlisted.length > 0 ? (
                                students.collegeShorlisted.map((collegeItem: any, index: any) => (
                                    <EnhancedShortlistCard
                                        key={index}
                                        logo={collegeItem.collegeLogo}
                                        college={collegeItem.collegeName}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        py: 4,
                                        color: 'text.secondary'
                                    }}
                                >
                                    <FavoriteIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        No universities shortlisted yet
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#718096' }}>
                                        Start exploring to add your favorites
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Card>
        </Box>
    );
};

export default StudentProfile;