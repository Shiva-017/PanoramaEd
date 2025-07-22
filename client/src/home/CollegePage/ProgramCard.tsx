import { 
  Card, 
  CardContent, 
  CardHeader, 
  Stack, 
  Typography, 
  Box,
  Chip,
  Paper
} from "@mui/material";
import { Program } from "../../models/college";
import { ReactElement } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Timer from "@mui/icons-material/Timer";
import ProgramDetail from "./ProgramDetail";
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
  },
}));

const ProgramHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  borderBottom: '1px solid rgba(0,0,0,0.08)',
}));

type Props = {
  program: Program
}

const ProgramCard: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <StyledCard elevation={0}>
      <ProgramHeader>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50', mb: 1 }}>
              {props.program.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#667eea', fontWeight: 600 }}>
              {props.program.university}
            </Typography>
          </Box>
          <Chip 
            label={props.program.degree || "Masters"}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              height: 36,
            }}
          />
        </Stack>
      </ProgramHeader>

      <CardContent sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box sx={{ flex: 1 }}>
            <ProgramDetail 
              label="Application Deadline" 
              value={props.program.deadline || "Rolling"} 
              icon={<CalendarMonthIcon />} 
            />
            <ProgramDetail 
              label="Duration" 
              value={props.program.duration || "24 months"} 
              icon={<Timer />} 
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ProgramDetail 
              label="Degree" 
              value={props.program.degree || "Masters"} 
              icon={<MilitaryTechIcon />} 
            />
            <ProgramDetail 
              label="Tuition Fee" 
              value={`$ ${props.program.fee}`} 
              icon={<AttachMoneyIcon />} 
            />
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  )
}

export default ProgramCard;