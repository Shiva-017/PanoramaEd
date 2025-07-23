import React, { ReactNode } from 'react';
import { 
    Avatar, 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    IconButton, 
    Stack, 
    Typography,
    Box,
    Chip,
    Paper,
    Divider
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import College, { Program } from '../../models/college';
import { ReactElement } from "react";

type Props = {
    program: Program;
}

// Enhanced suggested college detail card
const SuggestCard: React.FC<Props> = (props: Props): ReactElement => {
    return (
        <Card 
            sx={{ 
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
                    '& .university-logo': {
                        transform: 'scale(1.1)',
                    },
                    '& .program-name': {
                        color: '#667eea',
                    }
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 5,
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                }
            }}
        >
            {/* Header Section */}
            <Box 
                sx={{ 
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={3}>
                    {/* University Logo */}
                    <Box
                        sx={{
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: -5,
                                left: -5,
                                right: -5,
                                bottom: -5,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                opacity: 0.1,
                                zIndex: 0
                            }
                        }}
                    >
                        <Avatar 
                            src={props.program.universityLogo} 
                            sx={{ 
                                width: 80, 
                                height: 80,
                                border: 3,
                                borderColor: 'rgba(102, 126, 234, 0.2)',
                                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
                                position: 'relative',
                                zIndex: 1,
                                transition: 'all 0.3s ease'
                            }}
                            className="university-logo"
                        />
                    </Box>

                    {/* University Info */}
                    <Box sx={{ flex: 1 }}>
                        <Typography 
                            variant="h5" 
                            component="h3"
                            sx={{ 
                                fontWeight: 700,
                                color: '#1a202c',
                                mb: 1,
                                lineHeight: 1.2
                            }}
                        >
                            {props.program.university}
                        </Typography>
                        
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <LocationOnIcon 
                                sx={{ 
                                    fontSize: 20, 
                                    color: '#667eea' 
                                }} 
                            />
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: 'text.secondary',
                                    fontWeight: 500
                                }}
                            >
                                {props.program.state}
                            </Typography>
                        </Stack>
                        
                        <Chip
                            icon={<StarIcon sx={{ fontSize: 16 }} />}
                            label="Recommended"
                            size="small"
                            sx={{
                                mt: 1,
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                color: 'white',
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: 'white'
                                }
                            }}
                        />
                    </Box>
                </Stack>
            </Box>

            {/* Program Details */}
            <CardContent sx={{ p: 3 }}>
                {/* Program Name */}
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        mb: 3,
                        p: 2,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                    }}
                >
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                        <SchoolIcon sx={{ color: '#667eea', fontSize: 24 }} />
                        <Typography 
                            variant="subtitle2" 
                            sx={{ 
                                color: '#667eea',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Program
                        </Typography>
                    </Stack>
                    <Typography 
                        variant="h6" 
                        component="h4"
                        sx={{ 
                            color: '#FF3800',
                            fontWeight: 700,
                            transition: 'color 0.3s ease',
                            lineHeight: 1.3
                        }}
                        className="program-name"
                    >
                        {props.program.name}
                    </Typography>
                </Box>

                {/* Fee and Duration */}
                <Stack 
                    direction="row" 
                    spacing={2} 
                    justifyContent="center"
                >
                    {/* Fee Card */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2.5,
                            borderRadius: 3,
                            flex: 1,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)',
                            border: '1px solid rgba(76, 175, 80, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.15)'
                            }
                        }}
                    >
                        <AttachMoneyIcon 
                            sx={{ 
                                fontSize: 28, 
                                color: '#4caf50',
                                mb: 1
                            }} 
                        />
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: '#4caf50',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                fontSize: '0.75rem',
                                mb: 0.5
                            }}
                        >
                            Tuition Fee
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: '#2e7d32'
                            }}
                        >
                            ${props.program.fee}
                        </Typography>
                    </Paper>

                    {/* Duration Card */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2.5,
                            borderRadius: 3,
                            flex: 1,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%)',
                            border: '1px solid rgba(33, 150, 243, 0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(33, 150, 243, 0.15)'
                            }
                        }}
                    >
                        <AccessTimeFilledIcon 
                            sx={{ 
                                fontSize: 28, 
                                color: '#2196f3',
                                mb: 1
                            }} 
                        />
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: '#2196f3',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                fontSize: '0.75rem',
                                mb: 0.5
                            }}
                        >
                            Duration
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700,
                                color: '#1565c0'
                            }}
                        >
                            {props.program.duration} months
                        </Typography>
                    </Paper>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default SuggestCard;