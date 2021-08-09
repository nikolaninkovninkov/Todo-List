import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLoginValidation from '../hooks/useLoginValidation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { validationError, showError } = useLoginValidation({
    username,
    password,
  });
  function formSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validationError) login({ username, password });
    setHasSubmitted(true);
  }
  return (
    <div className="auth">
      <div className="auth-heading">
        <h1>Login</h1>
      </div>
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="username"
          placeholder="Username/email"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {validationError && (hasSubmitted || showError) ? (
          <div className="auth-form-error-message">{validationError}</div>
        ) : null}
        <button type="submit" className="auth-form-submit-button">
          Login
        </button>
      </form>
      <div className="auth-footer">
        Don&apos;t have an account? Register{' '}
        <Link to="/register" className="auth-redirect-link">
          here
        </Link>
      </div>
    </div>
  );
}
