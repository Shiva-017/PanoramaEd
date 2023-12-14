import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useSelector } from 'react-redux';
import { retrieveUsers } from "../../store/slices/login-slice";
import User from "../../models/user";

import './styles.scss';


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

const Chat: React.FC<ChatProps> = ({ socket, room }) => {
  const studentLoggedIn : User = useSelector(retrieveUsers())[0];
  console.log("stud", studentLoggedIn);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageData[]>([]);
  const username = studentLoggedIn.name;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const timeStamp =  new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
      console.log("Sending to room: ", room);
      const messageData: any = {
        room: room,
        author: username,
        message: currentMessage,
        time: timeStamp,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      
      fetch(`${chatURL}/${room}`, {
        method: 'PATCH',
        body: JSON.stringify({authorId: studentLoggedIn._id, authorName: username, messageBody: currentMessage, timeStamp: timeStamp}),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: MessageData) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
                <div
                    key={index}
                    className="message"
                    id={username !== messageContent.author ? "you" : "other"}
                >
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                        </div>
                    </div>
                </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.code === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;