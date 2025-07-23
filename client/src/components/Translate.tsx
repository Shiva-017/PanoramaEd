import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import Check from '@mui/icons-material/Check';
import { changeLanguage } from '../i18n';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import { styled, alpha } from '@mui/material/styles';

// Language configuration with flags and native names
const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    color: '#1976d2'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    color: '#1565c0'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    color: '#0d47a1'
  }
];

// Styled components for enhanced design
const LanguageButton = styled(Button)(({ theme }) => ({
  minWidth: 48,
  width: 48,
  height: 48,
  borderRadius: 12,
  padding: 0,
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 16,
    minWidth: 200,
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -8,
      left: 16,
      width: 16,
      height: 16,
      background: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRight: 'none',
      borderBottom: 'none',
      transform: 'rotate(45deg)',
      zIndex: 0,
    },
  },
}));

const LanguageMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  borderRadius: 12,
  margin: '2px 0',
  padding: theme.spacing(1.5, 2),
  transition: 'all 0.2s ease',
  background: isSelected 
    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
    : 'transparent',
  border: isSelected 
    ? '1px solid rgba(102, 126, 234, 0.2)'
    : '1px solid transparent',
  '&:hover': {
    background: isSelected
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
      : 'rgba(102, 126, 234, 0.08)',
    transform: 'translateX(4px)',
  },
}));

const FlagEmoji = styled(Box)(({ theme }) => ({
  fontSize: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: 8,
  background: 'rgba(0, 0, 0, 0.04)',
  transition: 'all 0.2s ease',
}));

const CurrentLanguageChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -6,
  right: -6,
  height: 20,
  fontSize: '0.65rem',
  fontWeight: 600,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  border: '2px solid white',
  '& .MuiChip-label': {
    padding: '0 6px',
  },
}));

const Translate: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [lang, setLang] = React.useState<string>('en');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const selectedLang = event.currentTarget.getAttribute('data-lang');
    
    if (selectedLang) {
      changeLanguage(selectedLang);
      setLang(selectedLang);
    }
    
    setAnchorEl(null);
  };

  const getCurrentLanguage = () => {
    return languages.find(l => l.code === lang) || languages[0];
  };

  const currentLang = getCurrentLanguage();

  return (
    <Box sx={{ position: 'relative' }}>
      <LanguageButton
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        aria-label="Change language"
      >
        <Box sx={{ position: 'relative' }}>
          <TranslateIcon sx={{ fontSize: 20 }} />
          <CurrentLanguageChip 
            label={currentLang.code.toUpperCase()} 
            size="small"
          />
        </Box>
      </LanguageButton>

      <StyledMenu
        id="language-menu"
        aria-labelledby="language-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Menu Header */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.08)', mb: 1 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PublicIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                Select Language
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Choose your preferred language
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Language Options */}
        {languages.map((language) => {
          const isSelected = lang === language.code;
          
          return (
            <LanguageMenuItem
              key={language.code}
              onClick={handleClose}
              data-lang={language.code}
              isSelected={isSelected}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <FlagEmoji>
                  {language.flag}
                </FlagEmoji>
              </ListItemIcon>
              
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#667eea' : '#2c3e50',
                      }}
                    >
                      {language.name}
                    </Typography>
                    {isSelected && (
                      <Chip
                        label="Current"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          '& .MuiChip-label': { px: 1 },
                        }}
                      />
                    )}
                  </Stack>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      color: isSelected ? 'rgba(102, 126, 234, 0.7)' : 'text.secondary',
                      fontStyle: 'italic',
                      fontWeight: 500,
                    }}
                  >
                    {language.nativeName}
                  </Typography>
                }
              />

              {isSelected && (
                <Check
                  sx={{
                    color: '#667eea',
                    fontSize: 20,
                    ml: 1,
                    animation: 'checkmark 0.3s ease-in-out',
                    '@keyframes checkmark': {
                      from: { transform: 'scale(0)', opacity: 0 },
                      to: { transform: 'scale(1)', opacity: 1 },
                    },
                  }}
                />
              )}
            </LanguageMenuItem>
          );
        })}

        {/* Footer Info */}
        <Divider sx={{ my: 1 }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              display: 'block',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            More languages coming soon
          </Typography>
        </Box>
      </StyledMenu>
    </Box>
  );
};

export default Translate;