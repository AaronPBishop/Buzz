import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/sessionReducer';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) return <Redirect to='/home' />;

  return (
    <form onSubmit={onLogin}
      style={{
        border: '2px rgb(240, 210, 10) solid',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20vh',
        height: '40vh',
        justifyContent: 'center'
        // width: '20vw',
      }}>
      <div
        style={{
          color: 'rgb(240, 210, 10)',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          // marginBottom: '30px',
          margin: '0 auto 30px auto',
        }}>
        Log In
      </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label htmlFor='email'
          style={{
            color: 'yellow',

          }}></label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label htmlFor='password'
          style={{
            color: 'yellow'
          }}></label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px'
          }}
        />
      </div>
      <button type='submit'
        style={{
          borderRadius: '8px',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '30px',
          width: '150px',
          background: 'rgb(240, 210, 10)',
          cursor: 'pointer'
        }}>Login</button>
    </form>
  );
};

export default LoginForm;
