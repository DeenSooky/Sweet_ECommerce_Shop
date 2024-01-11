import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import Link from 'next/link';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login'); 
  const dispatch = useDispatch()

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login',  {
        username: loginUsername,
        password: loginPassword,
      },
      {withCredentials: true}
      );

      dispatch(loginUser({username: loginUsername}))

      console.log(response.data);
      setLoggedIn(true)
      // Redirect to the homepage after successful login
      router.push("/")
    } catch (err) {
      console.error('Login failed', err);
      setError(true);
      setLoginUsername('')
      setLoginPassword('')
      setErrorMessage('Incorrect Credentials, please try again')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  };

  const handleRegister = async () => {
    try {
      if(registerUsername != '' & registerPassword != ''){
        const response = await axios.post('http://localhost:3000/api/users/register', {
          username: registerUsername,
          password: registerPassword,
        },
        {withCredentials: true}
        );
        dispatch(loginUser({username: registerUsername}))
        console.log(response.data);
        setLoggedIn(true)
        // Redirect to the homepage or login page after successful registration
        router.push("/")
      }else{
        setError(true);
        setRegisterUsername('')
        setRegisterPassword('')
        setErrorMessage('Please enter valid credentials.')
        setTimeout(() => {
          setErrorMessage('')
        }, 3000);
      }
    } catch (error) {
      console.error('Registration failed', error);
      setError(true);
      setRegisterUsername('')
      setRegisterPassword('')
      setErrorMessage('Credentials already exist, please try new credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Welcome to Sweets4Every1</h1>
      </div>

      <p className={styles.introMessage}>
        {activeTab === 'login'
          ? 'Welcome back! We\'re delighted to see you again at Sweets4Every1. Log in to your account and continue enjoying our personalized experiences. Your sweet journey awaits!'
          : 'Welcome, new user! We\'re excited to have you join our community at Sweets4Every1. Create an account and unlock a world of personalized experiences. Your journey with us starts here!'
          }
      </p>

      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <span
            className={activeTab === 'login' ? styles.activeTab : styles.tab}
            onClick={() => {setActiveTab('login') 
            setErrorMessage('')
          }}
          >
            Login
          </span>
          <span
            className={activeTab === 'register' ? styles.activeTab : styles.tab}
            onClick={() => {setActiveTab('register') 
             setErrorMessage('')}
            }
          >
            Register
          </span>
        </div>

        <h1 className={styles.title}>{activeTab === 'login' ? 'Login' : 'Register'}</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          value={activeTab === 'login' ? loginUsername : registerUsername}
          onChange={(e) => (activeTab === 'login' ? setLoginUsername(e.target.value) : setRegisterUsername(e.target.value))}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={activeTab === 'login' ? loginPassword : registerPassword}
          onChange={(e) => (activeTab === 'login' ? setLoginPassword(e.target.value) : setRegisterPassword(e.target.value))}
        />
        <button className={styles.button} onClick={activeTab === 'login' ? handleLogin : handleRegister}>
          {activeTab === 'login' ? 'Login' : 'Register'}
        </button>

        <div className={styles.memberMsg}>
          <p className={styles.notMember}>Not a member?</p>
          <p className={styles.signUp} onClick={() => {setActiveTab('register')}}>Register now.</p>
        </div>
        
        <Link href="/admin">
          <div className={styles.adminMsg}>
            <p className={styles.notAdmin}>Are you an admin?</p>
            <p className={styles.adminLogin}>Login here.</p>
          </div>
        </Link>


        <p className={styles.errorMessage}>
          {error && <span className={styles.error}>{errorMessage}</span>}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
