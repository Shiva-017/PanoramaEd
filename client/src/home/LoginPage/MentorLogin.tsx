import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import { loadMentors } from "../../store/slices/mentor-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MentorAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mentorConfig = {
    title: {
      signup: "Create Account",
      signin: "Sign In"
    },
    subtitle: {
      signup: "Use your email for registration as a mentor",
      signin: "Use your password to sign in as a mentor"
    },
    togglePanel: {
      left: {
        title: "Welcome Back!",
        subtitle: "Enter your personal details to use all mentor features",
        buttonText: "Sign In"
      },
      right: {
        title: "Welcome to PanoramaEd!",
        subtitle: "Register with your personal details to start helping students",
        buttonText: "Sign Up"
      }
    },
    endpoints: {
      login: "http://localhost:3001/mentors/login",
      signup: "http://localhost:3001/mentors"
    },
    redirectAfterLogin: "/mentor-dashboard",
    redirectAfterSignup: "/mentor-dashboard",
    loadUser: loadMentors,
    storageKey: "mentor",
    userTypeKey: "MENTOR",
    additionalSignupData: { userType: "CONSULTANT" },
    backButton: {
      text: "\u2190 Student Login Instead",
      route: "/login"
    },
    handleSignupResponse: async (data: any) => {
      console.log('Mentor signup response:', data);
      if (data && data.mentor && data.token) {
        console.log('Setting mentor data in localStorage and Redux');
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('mentor', JSON.stringify(data.mentor));
        window.localStorage.setItem('userType', 'MENTOR');
        // Load mentor data into Redux
        dispatch(loadMentors([data.mentor]));
        console.log('Mentor data set successfully');
        // Don't navigate here, let AuthPage handle it
      }
    }
  };

  return <AuthPage config={mentorConfig} />;
};

export default MentorAuth;
