import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/sessionReducer';

const SignUpForm = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstName, lastName, email, password));

      if (data) setErrors(data);
    };
  };

  if (user) return <Redirect to='/home' />;

  return (
    <form onSubmit={onSignUp}
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
        Sign Up
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
        <label
          style={{
            color: 'yellow',

          }}></label>
        <input
          type='text'
          name='username'
          onChange={e => setUsername(e.target.value)}
          placeholder='Username'
          value={username}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px',
          }}
        ></input>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label
          style={{
            color: 'yellow'
          }}></label>
        <input
          type='text'
          name='firstName'
          onChange={e => setFirstName(e.target.value)}
          placeholder='First Name'
          value={firstName}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px'
          }}
        ></input>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label
          style={{
            color: 'yellow'
          }}></label>
        <input
          type='text'
          name='lastName'
          onChange={e => setLastName(e.target.value)}
          placeholder='Last Name'
          value={lastName}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px'
          }}
        ></input>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label
          style={{
            color: 'yellow'
          }}></label>
        <input
          type='text'
          name='email'
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          value={email}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px'
          }}
        ></input>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label
          style={{
            color: 'yellow'
          }}></label>
        <input
          type='password'
          name='password'
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          value={password}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px'
          }}
        ></input>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px 10px'
        }}>
        <label
          style={{
            color: 'yellow'
          }}></label>
        <input
          type='password'
          name='repeat_password'
          onChange={e => setRepeatPassword(e.target.value)}
          placeholder='Repeat Password'
          value={repeatPassword}
          required={true}
          style={{
            width: '200px',
            height: '20px',
            borderRadius: '8px'
          }}
        ></input>
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
        }}>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
