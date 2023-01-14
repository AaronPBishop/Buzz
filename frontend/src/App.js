import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import SplashPage from './components/SplashPage/SplashPage.js';
import BaseContainer from './components/BaseContainer/BaseContainer.js';
import ProtectedRoute from './components/auth/ProtectedRoute.js';

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


        <ProtectedRoute path='/home' exact={true} >
          <BaseContainer />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
};

export default App;
