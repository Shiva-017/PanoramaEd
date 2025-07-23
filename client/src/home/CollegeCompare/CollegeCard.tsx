import { 
    Avatar, 
    Box, 
    Button, 
    Card,
    CardContent,
    CardMedia, 
    Chip,
    Fade,
    Paper,
    Slide, 
    Stack, 
    TextField, 
    Typography,
    Skeleton,
    Alert
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import getProgramDetails from "../../helpers/getProgramDetails";
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface Detail {
    title: string,
    value: string
}

type Props = {
    id: number;
    program: string;
    triggered: boolean;
}

const CollegeCard: React.FC<Props> = (props: Props): ReactElement => {
    const [checked, setChecked] = useState(false);
    const [collegeData, setCollegeData] = useState<any>([]);
    const [collegeName, setCollegeName] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('college-compare');

    useEffect(() => {
        setChecked(props.triggered);
    }, [props.triggered]);

    // fetching college data from the input sent as a prop to this card
    const fetchCollegeData = async () => {
        if (!collegeName.trim()) return;
        
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/colleges/name/${collegeName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCollegeData(data);
        } catch (error) {
            console.error("Error:", error);
            setCollegeData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (checked) {
                await fetchCollegeData();
            }
        };
        fetchData();
    }, [checked, collegeName]);

    const programDetails = collegeData ? getProgramDetails(collegeData, props.program) : [];
    const hasValidData = collegeData && collegeName !== "";
    const hasProgramData = programDetails.length > 0;

    return (
        <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
            {/* Input Field */}
            {!checked && (
                <Fade in timeout={500}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3, 
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                            <SchoolIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                            <Typography variant="h6" fontWeight={600}>
                                College {props.id}
                            </Typography>
                        </Stack>
                        <TextField 
                            id={`college-input-${props.id}`}
                            label={t('EnterCollege') + ` ${props.id}`}
                            variant="outlined"
                            fullWidth
                            value={collegeName}
                            onChange={(e) => setCollegeName(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
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
                    </Paper>
                </Fade>
            )}
            
            {/* College Card */}
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit timeout={600}>
                <Card
                    elevation={8}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: 'linear-gradient(90deg, #667eea, #764ba2)',
                        }
                    }}
                >
                    {loading ? (
                        <Box sx={{ p: 3 }}>
                            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 2 }} />
                            <Skeleton variant="text" height={40} width="80%" sx={{ mb: 1 }} />
                            <Skeleton variant="text" height={30} width="60%" sx={{ mb: 2 }} />
                            {[1, 2, 3].map((i) => (
                                <Box key={i} sx={{ mb: 2 }}>
                                    <Skeleton variant="text" height={25} width="40%" />
                                    <Skeleton variant="text" height={35} width="70%" />
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <>
                            {/* Header with College Info */}
                            <CardMedia 
                                image={collegeData?.background || '/api/placeholder/500/200'} 
                                sx={{ 
                                    height: 200, 
                                    position: 'relative',
                                    background: hasValidData ? undefined : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        p: 3
                                    }}
                                >
                                    {hasValidData ? (
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar 
                                                alt={collegeData?.name}
                                                src={collegeData?.logo || '/api/placeholder/72/72'} 
                                                sx={{ 
                                                    width: 72, 
                                                    height: 72, 
                                                    border: 3, 
                                                    borderColor: "white",
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                                                }} 
                                            />
                                            <Box>
                                                <Typography 
                                                    variant="h5" 
                                                    sx={{ 
                                                        fontWeight: 700, 
                                                        color: "white",
                                                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                                    }}
                                                >
                                                    {collegeData?.name}
                                                </Typography>
                                                <Chip 
                                                    icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                                                    label="Verified"
                                                    size="small"
                                                    sx={{ 
                                                        mt: 1,
                                                        backgroundColor: 'rgba(76, 175, 80, 0.9)',
                                                        color: 'white',
                                                        fontWeight: 600
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    ) : (
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <ErrorOutlineIcon sx={{ fontSize: 48, color: 'white' }} />
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 600, 
                                                    color: "white",
                                                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                                                }}
                                            >
                                                College not found
                                            </Typography>
                                        </Stack>
                                    )}
                                </Box>
                            </CardMedia>

                            {/* Program Details */}
                            <CardContent sx={{ p: 0 }}>
                                {hasValidData && hasProgramData ? (
                                    <Box>
                                        {programDetails.map((detail, index) => (
                                            <Fade in timeout={800} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                                                <Paper
                                                    elevation={1}
                                                    sx={{
                                                        m: 2,
                                                        p: 3,
                                                        borderRadius: 3,
                                                        background: index % 2 === 0 
                                                            ? 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)'
                                                            : 'linear-gradient(135deg, #f3e5f5 0%, #e8f5e8 100%)',
                                                        border: '1px solid rgba(0, 0, 0, 0.05)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                                        }
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="subtitle2"
                                                        sx={{ 
                                                            fontSize: 14, 
                                                            fontWeight: 700,
                                                            color: '#1976d2',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px',
                                                            mb: 1
                                                        }}
                                                    >
                                                        {detail.title}
                                                    </Typography>
                                                    <Typography 
                                                        variant="h6" 
                                                        sx={{
                                                            color: '#2e7d32',
                                                            fontWeight: 600,
                                                            borderLeft: 4,
                                                            borderColor: '#1976d2',
                                                            paddingLeft: 2,
                                                            lineHeight: 1.4
                                                        }}
                                                    >
                                                        {detail.value}
                                                    </Typography>
                                                </Paper>
                                            </Fade>
                                        ))}
                                    </Box>
                                ) : hasValidData && !hasProgramData ? (
                                    <Box sx={{ p: 3 }}>
                                        <Alert 
                                            severity="warning" 
                                            icon={<ErrorOutlineIcon />}
                                            sx={{ 
                                                borderRadius: 3,
                                                '& .MuiAlert-message': {
                                                    fontWeight: 600
                                                }
                                            }}
                                        >
                                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                Program not found
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                                                The requested program is not available at this college.
                                            </Typography>
                                        </Alert>
                                    </Box>
                                ) : null}
                            </CardContent>
                        </>
                    )}
                </Card>
            </Slide>
        </Box>
    );
};

export default CollegeCard;