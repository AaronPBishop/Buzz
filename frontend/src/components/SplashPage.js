
import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const SplashPage = () => {
  const history = useHistory();

  return (
    <div style={{
      border: '1px black solid',
      borderRadius: '20px',
      width: '50vw',
      height: '50vh',
      display: 'flex',
      justifyContent: 'center',
      margin: 'auto',
      background: 'linear-gradient(rgb(240, 210, 10), rgb(155, 140, 0))'
    }}>
      <div style={{
        marginTop: '25vh'
      }}>
        <button
          style={{
            border: '1px black solid',
            borderRadius: '20px',
            background: 'black',
            color: 'yellow',
            height: '5vh',
            width: '10vw'
          }}
          onClick={() => history.push('/home')}>
          Login
        </button>
      </div>
      <div style={{
        marginTop: '25vh'
      }}>
        <button
          style={{
            border: '1px black solid',
            borderRadius: '20px',
            background: 'black',
            color: 'yellow',
            height: '5vh',
            width: '10vw'
          }}
          onClick={() => history.push('/sign-up')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SplashPage;
