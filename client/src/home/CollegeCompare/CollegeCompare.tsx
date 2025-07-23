import { 
    Avatar, 
    Box, 
    Button, 
    CardMedia, 
    Container,
    Paper,
    Slide, 
    Stack, 
    TextField, 
    ThemeProvider, 
    Typography,
    Fade,
    Divider
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import { useTranslation } from 'react-i18next';
import theme from "../../providers/themeProvider";
import SearchIcon from '@mui/icons-material/Search';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// Enhanced College Compare page with modern UI
const CollegeCompare: React.FC = (): ReactElement => {
    const [programName, setProgramName] = useState("");
    const [search, setSearch] = useState<boolean>(false);
    const { t } = useTranslation('college-compare');

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: 3,
                    mt: 5
                }}
            >
                <Container maxWidth="xl" sx={{ pt: 4 }}>
                    {/* Header Section */}
                    <Fade in timeout={800}>
                        <Paper
                            elevation={8}
                            sx={{
                                p: 4,
                                mb: 4,
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                                <CompareArrowsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
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
                                    College Comparison Tool
                                </Typography>
                            </Stack>
                            
                            <Divider sx={{ mb: 3 }} />
                            
                            {/* Search Section */}
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }} 
                                spacing={3} 
                                alignItems="center"
                                justifyContent="center"
                            >
                                <TextField 
                                    id="program-search"
                                    label={t('EnterProgram')} 
                                    variant="outlined"
                                    value={programName}
                                    onChange={(e) => setProgramName(e.target.value)}
                                    sx={{
                                        minWidth: 300,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                            }
                                        }
                                    }}
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    size="large"
                                    startIcon={<SearchIcon />}
                                    onClick={() => setSearch(!search)}
                                    sx={{
                                        height: 56,
                                        px: 4,
                                        borderRadius: 3,
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                                            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {search ? "Search Again" : "Search"}
                                </Button>
                            </Stack>
                        </Paper>
                    </Fade>

                    {/* College Cards Section */}
                    <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
                        <Paper
                            elevation={6}
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                minHeight: 600
                            }}
                        >
                            <Typography 
                                variant="h5" 
                                component="h2"
                                align="center"
                                sx={{ 
                                    mb: 4,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Compare Colleges
                            </Typography>
                            
                            <Stack 
                                direction={{ xs: 'column', lg: 'row' }}
                                spacing={4}
                                alignItems="stretch"
                                justifyContent="center"
                                sx={{ minHeight: 500 }}
                            >
                                <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 500 } }}>
                                    <CollegeCard id={1} program={programName} triggered={search} />
                                </Box>
                                
                                {/* VS Divider */}
                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        minHeight: { xs: 40, lg: 'auto' }
                                    }}
                                >
                                    <Paper
                                        elevation={4}
                                        sx={{
                                            p: 2,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            color: 'white',
                                            minWidth: 60,
                                            minHeight: 60,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Typography variant="h6" fontWeight="bold">
                                            VS
                                        </Typography>
                                    </Paper>
                                </Box>
                                
                                <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 500 } }}>
                                    <CollegeCard id={2} program={programName} triggered={search} />
                                </Box>
                            </Stack>
                        </Paper>
                    </Fade>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default CollegeCompare;