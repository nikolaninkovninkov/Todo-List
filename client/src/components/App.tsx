import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Register from './Register';
function App() {
  return (
    <div className="app">
      <Register />
    </div>
  );
}

export default App;
