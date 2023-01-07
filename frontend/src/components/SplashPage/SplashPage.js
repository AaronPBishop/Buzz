import { useState } from 'react';

import LogInForm from '../auth/LoginForm.js';
import SignUpForm from '../auth/SignUpForm.js';

import './styles.css';

const SplashPage = () => {
  const [clickedLogIn, setClickedLogIn] = useState(false);
  const [clickedSignUp, setClickedSignUp] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black',
      border: '1px black solid',
      borderRadius: '20px',
      boxShadow: '0px 0px 8px black',
      width: '50vw',
      height: '84vh',
      margin: 'auto',
      marginTop: '4vh'
    }}>
      {
        !clickedLogIn && !clickedSignUp ?
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <p style={{
          fontSize: '40px',
          fontWeight: 'bold',
          position: 'absolute',
          color: 'rgb(240, 210, 10)'
          }}>
            Buzz
          </p>
      
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto'
          }}>
          
            <button
              className='login-buttons'
              onClick={() => {
                setClickedLogIn(clicked => !clicked)
              }}>
              Login
            </button>
        
            <button
              className='login-buttons'
              onClick={() => {
                setClickedSignUp(clicked => !clicked)
              }}>
              Sign Up
            </button>
          </div>
        </div>
        : clickedLogIn ?
        <LogInForm /> 
        : clickedSignUp &&
        <SignUpForm />
      }

    </div>
  );
}

export default SplashPage;
