import React, {useState, useEffect, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import './styles.scss';

import { loadUsers } from "../../store/slices/login-slice";

interface User {
  name: string;
  email: string;
  password: string;
}


const LoginPage: React.FC = () => {
  const { t } = useTranslation('login');
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn!.addEventListener('click', () => {
      container!.classList.add("active");
    });

    loginBtn!.addEventListener('click', () => {
      container!.classList.remove("active");
    });
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = user.email;
    const password = user.password;

    fetch(`http://localhost:3001/login?email=${email}&password=${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
            console.log(data, "got data");
            if (data[0]) {
              console.log("In dispatch");
              dispatch(loadUsers(data));
              window.localStorage.setItem('user',data[0]);
              navigate('/studentdetails');
            } else {
              alert("Given email or password is incorrect.");
              setUser({name: '', email: '', password: ''});
            }
        });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`http://localhost:3001/login`, {
        method: 'POST',
        body: JSON.stringify({ ...user, userType: "STUDENT" }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.name) {
                createChat(data._id);
                dispatch(loadUsers([data]));
                window.localStorage.setItem('user',data);
                navigate('/studentform');
            } else {
              alert("An account with this email-id already exists.");
              setUser({name: '', email: '', password: ''});
            }
        });
  };

  const createChat = (studentId: string) => {
    fetch(`http://localhost:3001/chats`, {
        method: 'POST',
        body: JSON.stringify({ studentId: studentId, consultantId: "6578ff2aef06bbc1e93d928b"}),
        headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => localStorage.setItem('chatId', data._id));
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>{t('create-account')}</h1>
          <span>{t('use-email-for-reg')}</span>
          <input type="text" placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} required/>
          <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required/>
          <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required/>
          <button>{t('Sign-Up')}</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>{t('Sign-In-h1')}</h1>
          <span>{t('use-password')}</span>
          <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required/>
          <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required/>
          <button>{t('Sign-In-button')}</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>{t('Welcome-Back')}</h1>
            <p>{t('Enter-personal-details')}</p>
            <button className="hidden" id="login">Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>{t('Welcome-PanaromaEd!')}</h1>
            <p>{t('Register-personal-details')}</p>
            <button className="hidden" id="register">{t('SignUp')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default LoginPage;
