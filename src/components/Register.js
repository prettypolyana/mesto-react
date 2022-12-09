import React, {useState} from 'react';
import AuthForm from './AuthForm';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  
  return (
    <AuthForm name="registration-form" title="Регистрация" btnText="Зарегистрироваться">
      <fieldset className="auth__input-field">
        <input 
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span id="email-error" className="auth__input-error"></span>
      </fieldset>

      <fieldset className="auth__input-field">
        <input 
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="40"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <span id="password-error" className="auth__input-error"></span>
      </fieldset>
    </AuthForm>
  );
}

export default Register;
