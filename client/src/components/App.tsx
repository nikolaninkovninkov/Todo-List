import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Register from './Register';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Dashboard from './Dashboard';
import Login from './Login';
function App() {
  const { user } = useAuth();
  useEffect(() => {}, []);
  return (
    <div className="app">
      <Route path="/register" exact>
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/login" exact>
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/" exact>
        {user ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
    </div>
  );
}

export default App;
