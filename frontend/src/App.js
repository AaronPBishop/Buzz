import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/auth/LoginForm.js';
import SignUpForm from './components/auth/SignUpForm.js';
import SplashPage from './components/SplashPage/SplashPage.js';
import HomeBase from './components/HomeBase/HomeBase.js';

import { authenticate } from './store/sessionReducer';

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;

  return (
    <BrowserRouter>
      <Switch>

        <Route path='/' exact={true}>
          <SplashPage />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <Route path='/home' exact={true} >
          <HomeBase />
        </Route>

      </Switch>
    </BrowserRouter>
  );
};

export default App;
