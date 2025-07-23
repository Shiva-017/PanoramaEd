import { Stack, Typography, Box } from "@mui/material";
import { ReactElement } from "react";
import { styled } from '@mui/material/styles';

const DetailContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  background: 'rgba(255, 255, 255, 0.6)',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.8)',
    transform: 'translateX(4px)',
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
  color: '#667eea',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 48,
  height: 48,
}));

type Props = {
  label: string,
  value: string,
  icon: any
}

const ProgramDetail: React.FC<Props> = (props: Props): ReactElement => {
  return (
    <DetailContainer direction="row" alignItems="center" spacing={2}>
      <IconContainer>
        {props.icon}
      </IconContainer>
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "#666", 
            fontWeight: 600, 
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.75rem'
          }}
        >
          {props.label}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 700, 
            color: '#2c3e50',
            fontSize: '1.1rem'
          }}
        >
          {props.value}
        </Typography>
      </Box>
    </DetailContainer>
  )
}

export default ProgramDetail;
