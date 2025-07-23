import React from "react";
import { useNavigate } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import { loadUsers } from "../../store/slices/login-slice";
import './styles.scss';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const studentConfig = {
    title: {
      signup: "Create Account",
      signin: "Sign In"
    },
    subtitle: {
      signup: "Use your email for registration",
      signin: "Use your password"
    },
    togglePanel: {
      left: {
        title: "Welcome Back!",
        subtitle: "Enter your personal details to use all site features",
        buttonText: "Sign In"
      },
      right: {
        title: "Welcome PanoramaEd!",
        subtitle: "Register with your personal details to start journey with us",
        buttonText: "Sign Up"
      }
    },
    endpoints: {
      login: "http://localhost:3001/login",
      signup: "http://localhost:3001/signup"
    },
    redirectAfterLogin: "/studentdetails",
    redirectAfterSignup: "/studentform",
    loadUser: loadUsers,
    additionalSignupData: { userType: "STUDENT" },
    storageKey: "user"
  };

  return (
    <div className="student-login-page">
      <AuthPage config={studentConfig} />
      
      {/* Mentor entry point */}
      <div className="mentor-entry">
        <button 
          className="mentor-entry-btn"
          onClick={() => navigate('/mentor-auth')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor"/>
            <path d="M12 14C8.13401 14 5 17.134 5 21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21C19 17.134 15.866 14 12 14Z" fill="currentColor"/>
            <circle cx="18" cy="6" r="3" fill="#4CAF50"/>
          </svg>
          Mentor Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
