import React, { useState, useEffect } from 'react';
import './style.scss';

export default function Login(props) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(props.user.isAuthenticated && props.user.login) {
      props.history.push('/repositories');
    }
  });

  const doLogin = () => {
    if(key == null || key === '' || key.length < 10) {
      setError('Must enter a valid api key');
      return;
    }

    props.login(key);
  }

  return (
    <div>
      <div className={'row'}>
        <input
            placeholder={'Insert github user api key'}
          className={'textbox'}
          aria-label="Login Token"
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <button
          className={'button'}
          onClick={() => doLogin()}
        >
          Login
        </button>

        <span>{error}</span>
      </div>
    </div>
  );
}
