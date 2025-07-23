import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector, useDispatch } from 'react-redux';
import { retrieveUsers } from "../../store/slices/login-slice";
import { loadUsers } from "../../store/slices/login-slice";
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
  Button,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';

interface HelpChatProps {
  socket: any;
}

interface MessageData {
  room: string;
  author: string;
  message: string;
  time: string;
}

interface HelpRequest {
  _id: string;
  studentId: string;
  studentName: string;
  message: string;
  status: 'waiting' | 'accepted' | 'completed';
  mentorId?: string;
  mentorName?: string;
  chatRoomId?: string;
}

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
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  }
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(2.5),
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '24px 24px 0 0'
}));

const MessageContainer = styled(ScrollToBottom)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  background: 'linear-gradient(to bottom, #f8faff 0%, #ffffff 100%)',
  '& .message-container': {
    height: '100%',
    padding: theme.spacing(1)
  }
}));

const Chat: React.FC<HelpChatProps> = ({ socket }) => {
  const studentLoggedIn: User = useSelector(retrieveUsers())[0];
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageData[]>([]);
  const [helpRequest, setHelpRequest] = useState<HelpRequest | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isInChat, setIsInChat] = useState(false);

  const username = studentLoggedIn?.name || 'Student';

  // Hydrate Redux from localStorage on mount if needed
  useEffect(() => {
    if (!studentLoggedIn || !studentLoggedIn._id) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          dispatch(loadUsers([parsedUser]));
        } catch {}
      }
    }
  }, [dispatch, studentLoggedIn]);

  // Check for existing help request on mount
  useEffect(() => {
    if (studentLoggedIn && studentLoggedIn._id) {
      // Clear any old requests first
      const clearOldRequests = async () => {
        try {
          const token = window.localStorage.getItem('token');
          await fetch(`http://localhost:3001/help-queue/clear/${studentLoggedIn._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            },
          });
        } catch (error) {
          console.error('Error clearing old requests:', error);
        }
      };
      
      clearOldRequests().then(() => {
        checkHelpRequestStatus();
      });
    }
  }, [studentLoggedIn]);

  // Socket listeners
  useEffect(() => {
    socket.on("receive_message", (data: MessageData) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("help_accepted", (data: HelpRequest) => {
      console.log("Help accepted:", data);
      setHelpRequest(data);
      setIsWaiting(false);
      setIsInChat(true);
      // Join the chat room
      socket.emit("join_room", data.chatRoomId);
    });

    return () => {
      socket.off("receive_message");
      socket.off("help_accepted");
    };
  }, [socket]);

  const checkHelpRequestStatus = async () => {
    if (!studentLoggedIn || !studentLoggedIn._id) return;
    try {
      const token = window.localStorage.getItem('token');
      console.log('Checking help status for student:', studentLoggedIn._id);
      
      const response = await fetch(`http://localhost:3001/help-queue/status/${studentLoggedIn._id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data && data._id) {
        setHelpRequest(data);
        if (data.status === 'waiting') {
          setIsWaiting(true);
        } else if (data.status === 'accepted') {
          setIsInChat(true);
          socket.emit("join_room", data.chatRoomId);
        }
      }
    } catch (error) {
      console.error('Error checking help status:', error);
    }
  };

  const requestHelp = async () => {
    if (!studentLoggedIn || !studentLoggedIn._id || !currentMessage.trim()) return;

    try {
      const token = window.localStorage.getItem('token');
      
      // First, clear any old requests for this student
      await fetch(`http://localhost:3001/help-queue/clear/${studentLoggedIn._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      
      // Then create a new help request
      const response = await fetch('http://localhost:3001/help-queue/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          studentId: studentLoggedIn._id,
          studentName: studentLoggedIn.name,
          studentEmail: studentLoggedIn.email,
          message: currentMessage.trim()
        })
      });

      const data = await response.json();
      
      if (data && data._id) {
        setHelpRequest(data);
        setIsWaiting(true);
        setCurrentMessage("");
        
        // Notify mentors
        socket.emit("new_help_request", data);
      }
    } catch (error) {
      console.error('Error requesting help:', error);
    }
  };

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && isInChat && helpRequest) {
      const timeStamp = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
      const messageData: MessageData = {
        room: helpRequest.chatRoomId!,
        author: username,
        message: currentMessage.trim(),
        time: timeStamp,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (isInChat) {
        sendMessage();
      } else if (!isWaiting) {
        requestHelp();
      }
    }
  };

  const startNewChat = async () => {
    // Clear current chat state
    setHelpRequest(null);
    setIsWaiting(false);
    setIsInChat(false);
    setMessageList([]);
    setCurrentMessage("");
    
    // Clear old requests from server
    if (studentLoggedIn && studentLoggedIn._id) {
      try {
        const token = window.localStorage.getItem('token');
        await fetch(`http://localhost:3001/help-queue/clear/${studentLoggedIn._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });
      } catch (error) {
        console.error('Error clearing old requests:', error);
      }
    }
  };

  const renderContent = () => {
    if (isWaiting) {
      return (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          textAlign: 'center',
          p: 3
        }}>
          <CircularProgress sx={{ color: '#667eea', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Looking for a mentor...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Your request: "{helpRequest?.message}"
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Please wait while we connect you with an available mentor
          </Typography>
        </Box>
      );
    }

    if (isInChat) {
      return (
        <MessageContainer className="message-container">
          {messageList.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              textAlign: 'center',
              gap: 2 
            }}>
              <ChatIcon sx={{ fontSize: 64, opacity: 0.3 }} />
              <Typography variant="body2">
                Connected to {helpRequest?.mentorName}!
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Start your conversation below
              </Typography>
            </Box>
          ) : (
            messageList.map((messageContent, index) => {
              const isOwn = username === messageContent.author;
              return (
                <Fade in={true} timeout={300} key={index}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: isOwn ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}>
                    <Box sx={{
                      maxWidth: '75%',
                      p: 1.5,
                      borderRadius: isOwn ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      background: isOwn 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(0, 0, 0, 0.04)',
                      color: isOwn ? 'white' : 'black'
                    }}>
                      <Typography variant="body2">
                        {messageContent.message}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
                        {messageContent.author} • {messageContent.time}
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              );
            })
          )}
        </MessageContainer>
      );
    }

    // Initial state - request help
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%',
        textAlign: 'center',
        p: 3
      }}>
        <HelpIcon sx={{ fontSize: 64, color: '#667eea', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Need Help?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Describe what you need help with and we'll connect you with a mentor
        </Typography>
      </Box>
    );
  };

  return (
    <ChatContainer elevation={24}>
      <ChatHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)' }}>
            <ChatIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {isInChat ? `Chat with ${helpRequest?.mentorName}` : 'Get Help'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {isWaiting ? 'Finding mentor...' : isInChat ? 'Connected' : 'Request assistance'}
            </Typography>
          </Box>
        </Box>
        {isInChat && (
          <Button
            variant="outlined"
            size="small"
            onClick={startNewChat}
            sx={{
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'rgba(255,255,255,0.9)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.5)',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            New Chat
          </Button>
        )}
      </ChatHeader>

      {renderContent()}

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder={
              isWaiting 
                ? "Please wait..." 
                : isInChat 
                  ? "Type your message..."
                  : "Describe what you need help with..."
            }
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isWaiting}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                backgroundColor: isWaiting ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.04)'
              }
            }}
          />
          <IconButton 
            onClick={isInChat ? sendMessage : requestHelp}
            disabled={!currentMessage.trim() || isWaiting}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
              },
              '&:disabled': {
                background: 'rgba(0,0,0,0.1)',
                color: 'rgba(0,0,0,0.3)'
              }
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </ChatContainer>
  );
};

export default Chat;
