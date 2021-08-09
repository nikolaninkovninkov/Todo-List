import React from 'react';
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logOut } = useAuth();
  return (
    <div className="dashboard">
      Hello {user?.username}
      <button onClick={logOut}>Log out</button>
    </div>
  );
}
