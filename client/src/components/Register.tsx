import React, { useEffect, useState } from 'react';
import { register } from '../api/usersApi';
import isEmail from '../utils/isEmail';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (!password || !email || !username || !name) {
      return setError('Please fill out all form fields');
    }
    if (!isEmail(email)) {
      return setError('Please enter a valid email address');
    }
    if (!(username.length >= 3 && username.length <= 32)) {
      return setError(
        'Username must be at least 3 characters long, and no more than 32 characters long',
      );
    }
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (!passwordRegex.test(password)) {
      return setError(
        'Password must be at least 8 characters long, have one uppercase and one lowercase letter, and one digit',
      );
    }
    setError('');
  }, [username, password, email, name]);
  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) return;
    const response = await register({ name, email, password, username }).catch(
      ({ response }) => {
        setError(response.data.message);
      },
    );
  }
  return (
    <div className="register">
      <div className="heading">
        <h1>Register</h1>
      </div>
      <form className="register-form" onSubmit={formSubmitHandler}>
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
        {error ? <div className="error-message">{error}</div> : null}
        <button type="submit" name="Submit">
          Register
        </button>
      </form>
    </div>
  );
}
