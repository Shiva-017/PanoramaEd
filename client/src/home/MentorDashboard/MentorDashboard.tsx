import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { retrieveMentors, updateMentorStatus, clearMentors, loadMentors } from "../../store/slices/mentor-slice";
import Mentor from "../../models/mentor";
import './MentorDashboard.scss';
import * as io from "socket.io-client";
import MentorChat from "../MentorChat/MentorChat";
import { authFetch } from '../../helpers/authFetch';

const MentorDashboard: React.FC = () => {
    const mentorLoggedIn = useSelector(retrieveMentors())[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [socket, setSocket] = useState<any>(null);
    
    console.log('MentorDashboard - mentorLoggedIn:', mentorLoggedIn);
    console.log('MentorDashboard - localStorage mentor:', localStorage.getItem('mentor'));
    console.log('MentorDashboard - localStorage userType:', localStorage.getItem('userType'));

    const [helpQueue, setHelpQueue] = useState<any[]>([]);
    const [activeChat, setActiveChat] = useState<any>(null);
    const [activeChatList, setActiveChatList] = useState<any[]>([]);

    // Hydrate Redux/localStorage with mentor profile on mount
    React.useEffect(() => {
        const fetchMentorProfile = async () => {
            let email = mentorLoggedIn?.email;
            if (!email) {
                // Try to get from localStorage
                const storedMentor = localStorage.getItem('mentor');
                if (storedMentor) {
                    try {
                        const parsedMentor = JSON.parse(storedMentor);
                        email = parsedMentor.email;
                    } catch {}
                }
            }
            if (!email) return;
            const token = window.localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/mentors?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
            });
            const data = await response.json();
            const mentorData = Array.isArray(data) ? data[0] : data;
            if (mentorData) {
                dispatch(loadMentors([mentorData]));
                window.localStorage.setItem('mentor', JSON.stringify(mentorData));
            }
        };
        fetchMentorProfile();
    }, [dispatch, mentorLoggedIn?.email]);

    useEffect(() => {
        // Check if mentor is logged in
        if (!mentorLoggedIn) {
            const storedMentor = localStorage.getItem('mentor');
            const userType = localStorage.getItem('userType');
            if (!storedMentor || userType !== 'MENTOR') {
                navigate('/mentor-auth');
            }
        }
    }, [mentorLoggedIn, navigate]);

    useEffect(() => {
        // Initialize socket
        const newSocket = io.connect("http://localhost:4000");
        setSocket(newSocket);

        // Load initial queue
        loadHelpQueue();

        // Listen for new help requests
        newSocket.on("new_help_request", (request: any) => {
            setHelpQueue(prev => [...prev, request]);
            console.log('New help request from:', request.studentName);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleStatusChange = async (newStatus: 'online' | 'busy' | 'offline') => {
        try {
            const response = await authFetch(`http://localhost:3001/mentors/${mentorLoggedIn._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                dispatch(updateMentorStatus({ id: mentorLoggedIn._id, status: newStatus }));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleLogout = () => {
        // Set status to offline before logout
        if (mentorLoggedIn) {
            handleStatusChange('offline');
        }

        localStorage.removeItem('mentor');
        localStorage.removeItem('userType');
        dispatch(clearMentors());
        navigate('/mentor-auth');
    };

    const loadHelpQueue = async () => {
        try {
            const response = await authFetch('http://localhost:3001/help-queue/waiting');
            const data = await response.json();
            setHelpQueue(data || []);
        } catch (error) {
            console.error('Error loading help queue:', error);
            setHelpQueue([]);
        }
    };

    const acceptHelpRequest = async (requestId: string, request: any) => {
        try {
            const response = await authFetch(`http://localhost:3001/help-queue/accept/${requestId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mentorId: mentorLoggedIn._id,
                    mentorName: mentorLoggedIn.name
                })
            });

            const acceptedRequest = await response.json();

            if (acceptedRequest && acceptedRequest._id) {
                // Remove from local queue
                setHelpQueue(prev => prev.filter(req => req._id !== requestId));

                // Notify student via socket
                socket.emit("help_accepted", acceptedRequest);

                // Create chat data
                const chatData = {
                    chatRoomId: acceptedRequest.chatRoomId,
                    studentName: request.studentName,
                    studentId: request.studentId,
                    helpMessage: request.message,
                    requestId: acceptedRequest._id
                };

                // Add to active chats and set as current active chat
                setActiveChat(chatData);
                setActiveChatList(prev => [...prev, chatData]);

                // Join the chat room
                socket.emit("join_room", acceptedRequest.chatRoomId);

                console.log(`Started helping ${request.studentName}`);
            }
        } catch (error) {
            console.error('Error accepting help request:', error);
            alert('Failed to accept help request');
        }
    };

    const handleCloseChat = () => {
        if (activeChat) {
            // Remove from active chat list
            setActiveChatList(prev => prev.filter(chat => chat.chatRoomId !== activeChat.chatRoomId));
            setActiveChat(null);
        }
    };

    const openChat = (chat: any) => {
        setActiveChat(chat);
    };

    if (!mentorLoggedIn) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mentor-dashboard">
            <header className="mentor-header">
                <div className="mentor-info">
                    <div className="mentor-avatar">
                        {mentorLoggedIn.name.charAt(0)}
                    </div>
                    <div className="mentor-details">
                        <h2>Welcome, {mentorLoggedIn.name}</h2>
                        <p>Mentor Dashboard</p>
                    </div>
                </div>

                <div className="mentor-controls">
                    <div className="status-selector">
                        <label>Status:</label>
                        <select
                            value={mentorLoggedIn.status}
                            onChange={(e) => handleStatusChange(e.target.value as any)}
                        >
                            <option value="online">🟢 Online</option>
                            <option value="busy">🟡 Busy</option>
                            <option value="offline">🔴 Offline</option>
                        </select>
                    </div>

                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="stats-row">
                    <div className="stat-card">
                        <h3>Students in Queue</h3>
                        <div className="stat-number">{helpQueue.length}</div>
                    </div>

                    <div className="stat-card">
                        <h3>Active Chats</h3>
                        <div className="stat-number">{activeChatList.length}</div>
                    </div>

                    <div className="stat-card">
                        <h3>Total Helped</h3>
                        <div className="stat-number">{mentorLoggedIn.totalChats || 0}</div>
                    </div>

                    <div className="stat-card">
                        <h3>Rating</h3>
                        <div className="stat-number">{mentorLoggedIn.rating ? mentorLoggedIn.rating.toFixed(1) : '5.0'} ⭐</div>
                    </div>
                </div>

                <div className="dashboard-main">
                    {/* Help Queue Section */}
                    <div className="help-queue-section">
                        <h3>Students Waiting for Help ({helpQueue.length})</h3>

                        {helpQueue.length === 0 ? (
                            <div className="empty-state">
                                <p>No students in queue at the moment.</p>
                                <p>When students request help, they'll appear here.</p>
                            </div>
                        ) : (
                            <div className="queue-list">
                                {helpQueue.map((request) => (
                                    <div key={request._id} className="queue-item">
                                        <div className="student-info">
                                            <h4>{request.studentName}</h4>
                                            <p className="student-email">{request.studentEmail}</p>
                                            <p className="help-message">"{request.message}"</p>
                                            <p className="wait-time">
                                                Waiting since: {new Date(request.requestedAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <button
                                            className="accept-btn"
                                            onClick={() => acceptHelpRequest(request._id, request)}
                                        >
                                            Accept
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Active Chats Section */}
                    <div className="active-chats-section">
                        <h3>Your Active Chats ({activeChatList.length})</h3>

                        {activeChatList.length === 0 ? (
                            <div className="empty-state">
                                <p>No active chats.</p>
                                <p>Accept a help request to start chatting.</p>
                            </div>
                        ) : (
                            <div className="active-chats-list">
                                {activeChatList.map((chat) => (
                                    <div key={chat.chatRoomId} className="active-chat-item">
                                        <div className="chat-info">
                                            <h4>{chat.studentName}</h4>
                                            <p>"{chat.helpMessage}"</p>
                                        </div>
                                        <button
                                            className="open-chat-btn"
                                            onClick={() => openChat(chat)}
                                        >
                                            {activeChat?.chatRoomId === chat.chatRoomId ? 'Active' : 'Open Chat'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Specializations Section */}
                <div className="specializations-section">
                    <h3>Your Specializations</h3>
                    <div className="specialization-tags">
                        {mentorLoggedIn.specializations && mentorLoggedIn.specializations.length > 0 ? (
                            mentorLoggedIn.specializations.map((spec) => (
                                <span key={spec} className="specialization-tag">
                                    {spec}
                                </span>
                            ))
                        ) : (
                            <span className="specialization-tag">General</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Mentor Chat Component - Outside dashboard content */}
            {activeChat && (
                <MentorChat
                    socket={socket}
                    activeChat={activeChat}
                    onCloseChat={handleCloseChat}
                />
            )}
        </div>
    );
};

export default MentorDashboard;