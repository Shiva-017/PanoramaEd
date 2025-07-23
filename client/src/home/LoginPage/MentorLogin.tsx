import React from "react";
import AuthPage from "../AuthPage/AuthPage";
import { loadMentors } from "../../store/slices/mentor-slice";

const MentorAuth: React.FC = () => {
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
    backButton: {
      text: "← Student Login Instead",
      route: "/login"
    }
  };

  return <AuthPage config={mentorConfig} />;
};

export default MentorAuth;
