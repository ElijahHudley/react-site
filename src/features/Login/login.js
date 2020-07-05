import React, { useState, useEffect } from 'react';
import './style.scss';

export default function Login(props) {
  const [key, setKey] = useState('');

  useEffect(() => {
    if(props.user.isAuthenticated || props.user.login) {
      props.history.push('/repositories');
    }
  });

  const doLogin = () => {
    if(key === null || key === '' || key.length < 10) {
      return;
    }

    props.login(key);
  }

  return (
    <div>
      <div className={'row'}>
        <input
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
        <button
          className={'button'}
          onClick={() => props.clearLogin()}
        >
          Clear
        </button>

        <div className={'sub-text'}> <span>{`logged In: ${props.user.isAuthenticated}`}</span></div>

      </div>
    </div>
  );
}
