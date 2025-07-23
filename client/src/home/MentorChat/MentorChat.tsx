import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from 'react-redux';
import { retrieveMentors } from "../../store/slices/mentor-slice";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Button,
  Fade,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

interface MentorChatProps {
  socket: any;
  activeChat: {
    chatRoomId: string;
    studentName: string;
    studentId: string;
    helpMessage: string;
    requestId: string;
  } | null;
  onCloseChat: () => void;
}

interface MessageData {
  room: string;
  author: string;
  message: string;
  time: string;
}

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  width: 450,
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

const MentorChat: React.FC<MentorChatProps> = ({ socket, activeChat, onCloseChat }) => {
  const mentorLoggedIn = useSelector(retrieveMentors())[0];
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageData[]>([]);

  const mentorName = mentorLoggedIn?.name || 'Mentor';

  // Join room when chat starts
  useEffect(() => {
    if (activeChat && socket) {
      socket.emit("join_room", activeChat.chatRoomId);
      console.log(`Mentor joined room: ${activeChat.chatRoomId}`);
    }
  }, [activeChat, socket]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data: MessageData) => {
      // Only add messages for this chat room
      if (data.room === activeChat?.chatRoomId) {
        setMessageList((list) => [...list, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, activeChat]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== "" && activeChat) {
      const timeStamp = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
      const messageData: MessageData = {
        room: activeChat.chatRoomId,
        author: mentorName,
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
      sendMessage();
    }
  };

  const endChat = async () => {
    // Mark the help request as completed
    if (activeChat && activeChat.requestId) {
      try {
        const token = window.localStorage.getItem('token');
        await fetch(`http://localhost:3001/help-queue/complete/${activeChat.requestId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        });
        console.log(`Completed help request for ${activeChat.studentName}`);
      } catch (error) {
        console.error('Error completing help request:', error);
      }
    }
    onCloseChat();
  };

  if (!activeChat) {
    return null;
  }

  return (
    <ChatContainer elevation={24}>
      <ChatHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(255,255,255,0.2)' }}>
            <ChatIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Helping {activeChat.studentName}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Mentor Chat • Active
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={endChat}
          sx={{ 
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </ChatHeader>

      {/* Help Context */}
      <Box sx={{ p: 2, bgcolor: 'rgba(102, 126, 234, 0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          Student's Question:
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
          "{activeChat.helpMessage}"
        </Typography>
      </Box>

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
              Start helping {activeChat.studentName}!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Send a message to begin the conversation
            </Typography>
          </Box>
        ) : (
          messageList.map((messageContent, index) => {
            const isOwn = mentorName === messageContent.author;
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

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type your response..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
          />
          <IconButton 
            onClick={sendMessage}
            disabled={!currentMessage.trim()}
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
        
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button 
            size="small" 
            onClick={endChat}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
            }}
          >
            End Chat
          </Button>
        </Box>
      </Box>
    </ChatContainer>
  );
};

export default MentorChat;