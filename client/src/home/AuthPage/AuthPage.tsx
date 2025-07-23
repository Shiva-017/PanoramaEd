import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import './AuthPage.scss';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthConfig {
  // UI Configuration
  title: {
    signup: string;
    signin: string;
  };
  subtitle: {
    signup: string;
    signin: string;
  };
  togglePanel: {
    left: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
    right: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
  };
  
  // API Configuration
  endpoints: {
    login: string;
    signup: string;
  };
  
  // Navigation
  redirectAfterLogin: string;
  redirectAfterSignup: string;
  
  // Redux Actions
  loadUser: (data: any) => any;
  
  // Additional signup data
  additionalSignupData?: any;
  
  // Optional back button
  backButton?: {
    text: string;
    route: string;
  };
  
  // Storage key for localStorage
  storageKey: string;
  userTypeKey?: string;

  // Callback for handling signup response
  handleSignupResponse?: (data: any) => Promise<void>;
}

interface AuthPageProps {
  config: AuthConfig;
}

const AuthPage: React.FC<AuthPageProps> = ({ config }) => {
  const { t } = useTranslation('login');
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById('auth-container');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');

    registerBtn?.addEventListener('click', () => {
      container?.classList.add("active");
    });

    loginBtn?.addEventListener('click', () => {
      container?.classList.remove("active");
    });

    return () => {
      registerBtn?.removeEventListener('click', () => {});
      loginBtn?.removeEventListener('click', () => {});
    };
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(config.endpoints.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      });

      const data = await response.json();
      
      // Mentor login success case
      if (data.mentor && data.token) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('mentor', JSON.stringify(data.mentor));
        window.localStorage.setItem('userType', 'MENTOR');
        if (config.loadUser) {
          dispatch(config.loadUser([data.mentor]));
        }
        navigate(config.redirectAfterLogin);
        return;
      }
      if (data && data.user && data.token) {
        window.localStorage.setItem('token', data.token);
        const userData = data.user;
        window.localStorage.setItem(config.storageKey, JSON.stringify(userData));
        if (config.userTypeKey) {
          window.localStorage.setItem('userType', config.userTypeKey);
        }
        // Fetch and store student _id after login
        await fetchAndStoreStudent(userData.email, config.storageKey, dispatch);
        navigate(config.redirectAfterLogin);
      } else {
        alert("Given email or password is incorrect.");
        setUser({ name: '', email: '', password: '' });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const signupData = {
        ...user,
        ...config.additionalSignupData
      };

      const response = await fetch(config.endpoints.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData)
      });

      const data = await response.json();
      
      // Mentor signup success case
      if (config.handleSignupResponse && data.mentor && data.token) {
        await config.handleSignupResponse(data);
        navigate(config.redirectAfterSignup);
        return;
      }
      if (data && (data.user && data.token)) {
        window.localStorage.setItem('token', data.token);
        const userData = data.user;
        window.localStorage.setItem(config.storageKey, JSON.stringify(userData));
        if (config.userTypeKey) {
          window.localStorage.setItem('userType', config.userTypeKey);
        }
        // Fetch and store student _id after signup
        await fetchAndStoreStudent(userData.email, config.storageKey, dispatch);
        navigate(config.redirectAfterSignup);
      } else {
        alert("An account with this email-id already exists.");
        setUser({ name: '', email: '', password: '' });
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const fetchAndStoreStudent = async (email: string, storageKey: string, dispatchFn: any) => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/students/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });
      const data = await response.json();
      const studentData = Array.isArray(data) ? data[0] : data;
      if (studentData && studentData._id) {
        window.localStorage.setItem('studentId', studentData._id);
        dispatchFn([studentData]);
      }
    } catch (error) {
      console.error('Failed to fetch student profile after login/signup:', error);
    }
  };

  return (
    <div className="auth-page">
      {/* Optional back button */}
      {config.backButton && (
        <div className="auth-switcher">
          <button 
            className="switch-btn"
            onClick={() => navigate(config.backButton!.route)}
          >
            {config.backButton.text}
          </button>
        </div>
      )}

      <div className="container" id="auth-container">
        {/* SIGNUP FORM */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignup}>
            <h1>{config.title.signup}</h1>
            <span>{config.subtitle.signup}</span>
            
            <input 
              type="text" 
              placeholder="Name" 
              value={user.name} 
              onChange={e => setUser({ ...user, name: e.target.value })} 
              required
              disabled={loading}
            />
            
            <input 
              type="email" 
              placeholder="Email" 
              value={user.email} 
              onChange={e => setUser({ ...user, email: e.target.value })} 
              required
              disabled={loading}
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={user.password} 
              onChange={e => setUser({ ...user, password: e.target.value })} 
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* SIGNIN FORM */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>{config.title.signin}</h1>
            <span>{config.subtitle.signin}</span>
            
            <input 
              type="email" 
              placeholder="Email" 
              value={user.email} 
              onChange={e => setUser({ ...user, email: e.target.value })} 
              required
              disabled={loading}
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={user.password} 
              onChange={e => setUser({ ...user, password: e.target.value })} 
              required
              disabled={loading}
            />
            
            <button type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* TOGGLE SECTION */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>{config.togglePanel.left.title}</h1>
              <p>{config.togglePanel.left.subtitle}</p>
              <button className="hidden" id="login-btn">
                {config.togglePanel.left.buttonText}
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>{config.togglePanel.right.title}</h1>
              <p>{config.togglePanel.right.subtitle}</p>
              <button className="hidden" id="register-btn">
                {config.togglePanel.right.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;