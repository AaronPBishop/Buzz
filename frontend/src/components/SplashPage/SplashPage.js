import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

const SplashPage = () => {
  const history = useHistory();

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
          onClick={() => history.push('/login')}>
          Login
        </button>

        <button
          className='login-buttons'
          onClick={() => history.push('/sign-up')}>
          Sign Up
        </button>

      </div>
    </div>
  );
}

export default SplashPage;
