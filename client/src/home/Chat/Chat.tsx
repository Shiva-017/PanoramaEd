import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from 'react-redux';
import { retrieveUsers } from "../../store/slices/login-slice";
import User from "../../models/user";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Fade,
  InputAdornment,
  Divider,
  Badge
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled, alpha } from '@mui/material/styles';

interface ChatProps {
  socket: any;
  room: string;
}

interface MessageData {
  room: string;
  author: string;
  message: string;
  time: string;
}

const chatURL = 'http://localhost:3001/chats';

// Styled components for enhanced design
const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  width: 400,
  height: 600,
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 25px 80px rgba(102, 126, 234, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 1400,
  animation: 'slideInUp 0.3s ease-out',
  '@keyframes slideInUp': {
    from: {
      transform: 'translateY(100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
    height: '70vh',
    bottom: 10,
    right: '5vw',
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(2.5),
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '24px 24px 0 0',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const MessageContainer = styled(ScrollToBottom)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
  '& .message-container': {
    height: '100%',
    padding: theme.spacing(1),
  },
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn: boolean }>(({ theme, isOwn }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  justifyContent: isOwn ? 'flex-end' : 'flex-start',
  animation: 'fadeInMessage 0.3s ease-out',
  '@keyframes fadeInMessage': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const MessageContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn: boolean }>(({ theme, isOwn }) => ({
  maxWidth: '75%',
  padding: theme.spacing(1.5, 2),
  borderRadius: isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
  background: isOwn 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'rgba(0, 0, 0, 0.04)',
  color: isOwn ? 'white' : theme.palette.text.primary,
  boxShadow: isOwn 
    ? '0 8px 25px rgba(102, 126, 234, 0.3)'
    : '0 2px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  wordBreak: 'break-word',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: isOwn 
      ? '0 12px 30px rgba(102, 126, 234, 0.4)'
      : '0 4px 15px rgba(0, 0, 0, 0.15)',
  },
}));

const MessageMeta = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn: boolean }>(({ theme, isOwn }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
  justifyContent: isOwn ? 'flex-end' : 'flex-start',
  opacity: 0.7,
}));

const ChatFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(0, 0, 0, 0.08)',
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'flex-end',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
    },
    '& fieldset': {
      border: '2px solid transparent',
    },
    '&:hover fieldset': {
      border: '2px solid rgba(102, 126, 234, 0.2)',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #667eea',
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2),
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  width: 48,
  height: 48,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'scale(1.05)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const Chat: React.FC<ChatProps> = ({ socket, room }) => {
  const studentLoggedIn: User = useSelector(retrieveUsers())[0];
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const username = studentLoggedIn.name;

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const timeStamp = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
      const messageData: MessageData = {
        room: room,
        author: username,
        message: currentMessage.trim(),
        time: timeStamp,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");

      fetch(`${chatURL}/${room}`, {
        method: 'PATCH',
        body: JSON.stringify({
          authorId: studentLoggedIn._id,
          authorName: username,
          messageBody: currentMessage.trim(),
          timeStamp: timeStamp
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(event.target.value);
    
    // Simulate typing indicator (you can enhance this with socket events)
    if (!isTyping) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  useEffect(() => {
    socket.on("receive_message", (data: MessageData) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <ChatContainer elevation={24}>
      {/* Enhanced Header */}
      <ChatHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <ChatIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Live Chat
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Connect with mentors and students
            </Typography>
          </Box>
        </Box>
        <Badge 
          variant="dot" 
          color="success"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#4caf50',
              border: '2px solid white',
              width: 12,
              height: 12,
            }
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            {getInitials(username)}
          </Avatar>
        </Badge>
      </ChatHeader>

      {/* Enhanced Message Container */}
      <MessageContainer className="message-container">
        {messageList.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              textAlign: 'center',
              gap: 2,
            }}
          >
            <ChatIcon sx={{ fontSize: 64, opacity: 0.3 }} />
            <Typography variant="body2">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          messageList.map((messageContent, index) => {
            const isOwn = username === messageContent.author;
            return (
              <Fade in={true} timeout={300} key={index}>
                <MessageBubble isOwn={isOwn}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
                    {!isOwn && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: '0.7rem',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          }}
                        >
                          {getInitials(messageContent.author)}
                        </Avatar>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                          {messageContent.author}
                        </Typography>
                      </Box>
                    )}
                    
                    <MessageContent isOwn={isOwn}>
                      <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                        {messageContent.message}
                      </Typography>
                    </MessageContent>
                    
                    <MessageMeta isOwn={isOwn}>
                      <AccessTimeIcon sx={{ fontSize: 12 }} />
                      <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        {formatTime(messageContent.time)}
                      </Typography>
                      {isOwn && (
                        <Chip
                          label="You"
                          size="small"
                          sx={{
                            height: 16,
                            fontSize: '0.65rem',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            '& .MuiChip-label': { px: 1 },
                          }}
                        />
                      )}
                    </MessageMeta>
                  </Box>
                </MessageBubble>
              </Fade>
            );
          })
        )}
        
        {/* Typing Indicator */}
        {isTyping && (
          <Fade in={true}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, opacity: 0.6 }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                <PersonIcon sx={{ fontSize: 16 }} />
              </Avatar>
              <Box
                sx={{
                  background: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: '20px 20px 20px 4px',
                  padding: '8px 16px',
                  display: 'flex',
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: 'text.secondary',
                    animation: 'typing 1.4s infinite ease-in-out',
                    '&:nth-of-type(1)': { animationDelay: '0s' },
                    '&:nth-of-type(2)': { animationDelay: '0.2s' },
                    '&:nth-of-type(3)': { animationDelay: '0.4s' },
                    '@keyframes typing': {
                      '0%, 60%, 100%': { transform: 'translateY(0)' },
                      '30%': { transform: 'translateY(-8px)' },
                    },
                  }}
                />
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'text.secondary', animation: 'typing 1.4s infinite ease-in-out 0.2s' }} />
                <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'text.secondary', animation: 'typing 1.4s infinite ease-in-out 0.4s' }} />
              </Box>
            </Box>
          </Fade>
        )}
      </MessageContainer>

      {/* Enhanced Footer */}
      <ChatFooter>
        <StyledTextField
          multiline
          maxRows={3}
          placeholder="Type your message..."
          value={currentMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          variant="outlined"
          size="small"
        />
        <SendButton 
          onClick={sendMessage}
          disabled={!currentMessage.trim()}
          sx={{
            opacity: currentMessage.trim() ? 1 : 0.5,
            cursor: currentMessage.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          <SendIcon />
        </SendButton>
      </ChatFooter>
    </ChatContainer>
  );
};

export default Chat;