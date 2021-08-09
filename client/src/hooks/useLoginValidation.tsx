import { useEffect, useState } from 'react';
import LoginData from '../types/LoginData';
import useAuth from './useAuth';

export default function useLoginValidation({ username, password }: LoginData) {
  const { error } = useAuth();
  const [validationError, setValidationError] = useState('');
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setShowError(true);
    if (!username && !password) {
      return setShowError(false);
    }
    if (!username || !password) {
      return setValidationError('Please fill out all form fields');
    }
    return setValidationError('');
  }, [username, password]);
  useEffect(() => {
    if (!error || validationError) return;
    if (error.response?.status == 400) {
      if (error.response.data.message == 'Invalid credentials') {
        return setValidationError('Invalid credentials');
      }
    }
  }, [error]);
  return { validationError, showError };
}
