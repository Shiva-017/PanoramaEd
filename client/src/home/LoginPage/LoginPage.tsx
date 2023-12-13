import React, {useState, useEffect, FormEvent} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as io from "socket.io-client";
// import bcrypt from 'bcryptjs';
import './styles.css';

import { loadUsers } from "../../store/slices/login-slice";

import Chat from "../Chat/Chat";

interface User {
  name: string;
  email: string;
  password: string;
}
// const salt = bcrypt.genSaltSync(10);


const LoginPage: React.FC = () => {
  // const user = useSelector(retrieveUser());
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });
  
  const socket = io.connect("http://localhost:4000");
  socket.emit("join_room", "1234");

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

    console.log("Login", user);

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
              navigate('/');
            } else {
              alert("Given email or password is incorrect.");
              window.location.reload();
            }
        });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup", user);

    fetch(`http://localhost:3001/login`, {
        method: 'POST',
        body: JSON.stringify({ ...user, userType: "STUDENT" }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.name) {
                dispatch(loadUsers([data]));
                navigate('/');
            } else {
              alert("An account with this email-id already exists.");
              window.location.reload();
            }
        });
  };

  return (
    <div>
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <span>or use your email for registeration</span>
            <input type="text" placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} required/>
            <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required/>
            <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required/>
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} required/>
            <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required/>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* <Chat socket={socket} username={prompt('Enter name') || ""} room="1234" /> */}
    </div>
  );
}



export default LoginPage;
