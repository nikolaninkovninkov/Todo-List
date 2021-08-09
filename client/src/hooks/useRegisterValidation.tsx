import { useEffect, useState } from 'react';
import RegisterData from '../types/RegisterData';
import isEmail from '../utils/isEmail';
import useAuth from './useAuth';

export default function useRegisterValidate({
  name,
  email,
  password,
  username,
}: RegisterData) {
  const [validationError, setValidationError] = useState('');
  const [showError, setShowError] = useState(false);
  const [duplicate, setDuplicate] = useState({
    duplicate: '',
    duplicateValue: '',
  });
  const errorMessages = {
    fillOutAll: 'Please fill out all form fields',
    emailError: 'Please enter a valid email address',
    usernameError:
      'Username must be at least 3 characters long, and no more than 32 characters long',
    passwordError:
      'Password must be at least 8 characters long, have one uppercase and one lowercase letter, and one digit',
    emailDuplicate: 'A user with that email already exists',
    usernameDuplicate: 'A user with that username already exists',
  };
  const { error } = useAuth();
  useEffect(() => {
    const anyHasContent = !!password || !!username || !!email || !!name;
    const anyIsEmpty = !password || !username || !email || !name;
    if (anyHasContent) setShowError(true);
    else if (!anyHasContent) {
      // none have content
      setShowError(false);
    }
    if (anyIsEmpty) {
      return setValidationError(errorMessages.fillOutAll);
    }
    if (!isEmail(email)) {
      return setValidationError(errorMessages.emailError);
    }
    if (!(username.length >= 3 && username.length <= 32)) {
      return setValidationError(errorMessages.usernameError);
    }
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if (!passwordRegex.test(password)) {
      return setValidationError(errorMessages.passwordError);
    }
    if (!duplicate.duplicate) return setValidationError('');
    if (duplicate.duplicate == 'email') {
      if (email == duplicate.duplicateValue)
        return setValidationError(errorMessages.emailDuplicate);
      return setValidationError('');
    }
    if (duplicate.duplicate == 'username') {
      if (duplicate.duplicateValue == username)
        return setValidationError(errorMessages.usernameDuplicate);
      return setValidationError('');
    }
  }, [name, email, password, username]);
  useEffect(() => {
    if (
      error?.response?.status == 400 &&
      error.response.data.message.split(' ')[0] == 'Duplicate'
    ) {
      const message = error.response.data.message;
      setDuplicate({
        duplicate: message.split(' ')[1], // email || username
        duplicateValue: message.split(' ')[1] == 'email' ? email : username, // username or email that exists in database as string
      });
      setValidationError(
        duplicate.duplicate == 'email'
          ? errorMessages.emailDuplicate
          : errorMessages.usernameDuplicate,
      );
    }
  }, [error]);
  return { validationError, showError };
}
