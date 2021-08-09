import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { register } from '../api/usersApi';
import useAuth from '../hooks/useAuth';
import useRegisterValidation from '../hooks/useRegisterValidation';
import isEmail from '../utils/isEmail';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { register } = useAuth();
  const { validationError, showError } = useRegisterValidation({
    name,
    password,
    username,
    email,
  });
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmittedOnce(true);
    if (validationError) return;
    register({ name, username, email, password });
  }
  return (
    <div className="auth">
      <div className="auth-heading">
        <h1>Register</h1>
      </div>
      <form className="auth-form" onSubmit={formSubmitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {validationError && (showError || hasSubmittedOnce) ? (
          <div className="auth-form-error-message">{validationError}</div>
        ) : null}
        <button type="submit" name="Submit" className="auth-form-submit-button">
          Register
        </button>
      </form>
      <div className="auth-footer">
        Already registered? Login{' '}
        <Link to="/login" className="auth-redirect-link">
          here
        </Link>
      </div>
    </div>
  );
}
