import { ReactElement, useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { loadCollege } from "../../store/slices/college-slice";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Autocomplete,
  Paper,
  Typography,
  Chip,
  Stack,
  Fade,
  Popper,
  ClickAwayListener,
  alpha,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import ClearIcon from '@mui/icons-material/Clear';

interface College {
  id: string;
  name: string;
  location: string;
  type: string;
  ranking?: number;
}

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'college' | 'recent' | 'trending';
  location?: string;
  ranking?: number;
}

export default function CollegeSearch(): ReactElement {
  const [collegeName, setCollegeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock trending colleges - replace with actual API call
  const trendingColleges: SearchSuggestion[] = [
    { id: '1', name: 'Harvard University', type: 'trending', location: 'Cambridge, MA', ranking: 1 },
    { id: '2', name: 'Stanford University', type: 'trending', location: 'Stanford, CA', ranking: 2 },
    { id: '3', name: 'MIT', type: 'trending', location: 'Cambridge, MA', ranking: 3 },
    { id: '4', name: 'Oxford University', type: 'trending', location: 'Oxford, UK', ranking: 4 },
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentCollegeSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (collegeName.length > 2) {
      const timer = setTimeout(() => {
        fetchSuggestions(collegeName);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [collegeName]);

  const fetchSuggestions = async (query: string) => {
    try {
      setIsLoading(true);
      // Mock API call - replace with actual endpoint
      const mockSuggestions: SearchSuggestion[] = [
        { id: '1', name: `${query} University`, type: 'college', location: 'Sample Location' },
        { id: '2', name: `${query} College`, type: 'college', location: 'Sample Location' },
        { id: '3', name: `${query} Institute`, type: 'college', location: 'Sample Location' },
      ];
      
      // Add recent searches that match
      const matchingRecent = recentSearches
        .filter(recent => recent.toLowerCase().includes(query.toLowerCase()))
        .map((recent, index) => ({
          id: `recent-${index}`,
          name: recent,
          type: 'recent' as const
        }));

      setSuggestions([...matchingRecent, ...mockSuggestions]);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToRecentSearches = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(item => item !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentCollegeSearches', JSON.stringify(updated));
  };

  const searchHandler = async (searchTerm?: string) => {
    const query = searchTerm || collegeName;
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`http://localhost:3001/colleges/name/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(loadCollege(data));
      
      // Save to recent searches
      saveToRecentSearches(query);
      
      // Navigate to results
      navigate(`/colleges/${query}`);
      
      // Clear search and close suggestions
      setCollegeName('');
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      setError('Failed to search colleges. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCollegeName(value);
    setIsOpen(value.length > 0);
    setError('');
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setCollegeName(suggestion.name);
    setIsOpen(false);
    searchHandler(suggestion.name);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchHandler();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setCollegeName('');
    setIsOpen(false);
    setError('');
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentCollegeSearches');
  };

  const getIconForSuggestion = (type: string) => {
    switch (type) {
      case 'recent':
        return <HistoryIcon sx={{ fontSize: 20, color: 'text.secondary' }} />;
      case 'trending':
        return <TrendingUpIcon sx={{ fontSize: 20, color: '#ff6b35' }} />;
      default:
        return <SchoolIcon sx={{ fontSize: 20, color: 'primary.main' }} />;
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box ref={searchRef} sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
        {/* Main Search Input */}
        <TextField
          ref={inputRef}
          fullWidth
          value={collegeName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsOpen(collegeName.length > 0 || recentSearches.length > 0)}
          placeholder="Search colleges, universities, or institutions..."
          error={!!error}
          helperText={error}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              backgroundColor: alpha('#ffffff', 0.15),
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: alpha('#ffffff', 0.25),
                border: '1px solid rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused': {
                backgroundColor: alpha('#ffffff', 0.3),
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.15)',
                transform: 'translateY(-1px)',
              },
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                color: 'white',
                fontSize: '1rem',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row" spacing={1} alignItems="center">
                  {isLoading && (
                    <CircularProgress 
                      size={20} 
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                    />
                  )}
                  {collegeName && (
                    <IconButton 
                      size="small" 
                      onClick={clearSearch}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { 
                          color: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                  <Button
                    variant="text"
                    onClick={() => searchHandler()}
                    disabled={!collegeName.trim() || isLoading}
                    sx={{
                      minWidth: 100,
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      background: 'transparent',
                      color: 'white',
                      fontWeight: 600,
                      textTransform: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'transparent',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }
                    }}
                  >
                    Search
                  </Button>
                </Stack>
              </InputAdornment>
            ),
          }}
        />

        {/* Suggestions Dropdown */}
        <Fade in={isOpen}>
          <Paper
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 1,
              maxHeight: 400,
              overflowY: 'auto',
              zIndex: 1300,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
            }}
          >
            {/* No input state - show trending and recent */}
            {!collegeName && (
              <Box sx={{ p: 2 }}>
                {/* Trending Colleges */}
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1.5, fontWeight: 600 }}>
                  🔥 Trending Colleges
                </Typography>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {trendingColleges.slice(0, 3).map((college) => (
                    <Box
                      key={college.id}
                      onClick={() => handleSuggestionClick(college)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.08)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      {getIconForSuggestion(college.type)}
                      <Box sx={{ ml: 2, flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {college.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {college.location} {college.ranking && `• Rank #${college.ranking}`}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Trending" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#fff3e0',
                          color: '#ff6b35',
                          fontWeight: 600,
                          fontSize: '0.7rem'
                        }} 
                      />
                    </Box>
                  ))}
                </Stack>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        🕒 Recent Searches
                      </Typography>
                      <Button 
                        size="small" 
                        onClick={clearRecentSearches}
                        sx={{ 
                          color: 'text.secondary',
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        Clear
                      </Button>
                    </Box>
                    <Stack spacing={1}>
                      {recentSearches.map((recent, index) => (
                        <Box
                          key={index}
                          onClick={() => handleSuggestionClick({ id: `recent-${index}`, name: recent, type: 'recent' })}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1.5,
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.08)',
                              transform: 'translateX(4px)',
                            }
                          }}
                        >
                          <HistoryIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ ml: 2 }}>
                            {recent}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </>
                )}
              </Box>
            )}

            {/* Search suggestions */}
            {collegeName && suggestions.length > 0 && (
              <Box sx={{ p: 1 }}>
                {suggestions.map((suggestion) => (
                  <Box
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.08)',
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    {getIconForSuggestion(suggestion.type)}
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {suggestion.name}
                      </Typography>
                      {suggestion.location && (
                        <Typography variant="caption" color="text.secondary">
                          <LocationOnIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                          {suggestion.location}
                        </Typography>
                      )}
                    </Box>
                    {suggestion.type === 'recent' && (
                      <Chip 
                        label="Recent" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#f3e5f5',
                          color: '#7b1fa2',
                          fontWeight: 600,
                          fontSize: '0.7rem'
                        }} 
                      />
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* No results */}
            {collegeName && suggestions.length === 0 && !isLoading && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  No colleges found for "{collegeName}"
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Try a different search term or check the spelling
                </Typography>
              </Box>
            )}

            {/* Loading state */}
            {isLoading && collegeName && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <CircularProgress size={24} sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Searching colleges...
                </Typography>
              </Box>
            )}
          </Paper>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}