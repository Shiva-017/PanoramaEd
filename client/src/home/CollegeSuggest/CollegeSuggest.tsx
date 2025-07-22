import React, { ReactNode } from 'react';
import { ReactElement } from "react";
import { useSelector } from 'react-redux';
import { getSuggestedPrograms } from '../../store/slices/college-suggest';
import SuggestCard from './SuggestCard';
import { 
    Typography, 
    Container, 
    Box, 
    Paper, 
    Stack,
    Fade,
    Divider
} from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const CollegeSuggest: React.FC = (): ReactElement => {
    const suggestedPrograms = useSelector(getSuggestedPrograms());

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 3,
            }}
        >
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                {/* Header Section */}
                <Fade in timeout={800}>
                    <Paper
                        elevation={8}
                        sx={{
                            p: 4,
                            mb: 4,
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            textAlign: 'center'
                        }}
                    >
                        <Stack 
                            direction="row" 
                            alignItems="center" 
                            justifyContent="center" 
                            spacing={2} 
                            sx={{ mb: 2 }}
                        >
                            <AutoAwesomeIcon 
                                sx={{ 
                                    fontSize: 40, 
                                    color: '#667eea',
                                    '@keyframes pulse': {
                                        '0%, 100%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.1)' }
                                    },
                                    animation: 'pulse 2s infinite'
                                }} 
                            />
                            <Typography 
                                variant="h3" 
                                component="h1"
                                sx={{ 
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Suggested Colleges for You
                            </Typography>
                            <RecommendIcon 
                                sx={{ 
                                    fontSize: 40, 
                                    color: '#764ba2',
                                    '@keyframes bounce': {
                                        '0%, 100%': { transform: 'translateY(0)' },
                                        '50%': { transform: 'translateY(-10px)' }
                                    },
                                    animation: 'bounce 2s infinite'
                                }} 
                            />
                        </Stack>
                        
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                color: 'text.secondary',
                                fontWeight: 400,
                                maxWidth: 600,
                                mx: 'auto'
                            }}
                        >
                            Discover personalized college recommendations based on your preferences and goals
                        </Typography>
                        
                        <Divider sx={{ mt: 3, opacity: 0.3 }} />
                    </Paper>
                </Fade>

                {/* Suggestions Container */}
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        minHeight: '60vh'
                    }}
                >
                    {suggestedPrograms.length > 0 ? (
                        <Stack spacing={3}>
                            {suggestedPrograms.map((program, index) => (
                                <Fade 
                                    in 
                                    timeout={600} 
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                    key={index}
                                >
                                    <Box>
                                        <SuggestCard program={program} />
                                    </Box>
                                </Fade>
                            ))}
                        </Stack>
                    ) : (
                        <Box 
                            sx={{ 
                                textAlign: 'center', 
                                py: 8,
                                color: 'text.secondary'
                            }}
                        >
                            <AutoAwesomeIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
                            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                                No Suggestions Yet
                            </Typography>
                            <Typography variant="body1">
                                Complete your profile to get personalized college recommendations
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default CollegeSuggest;