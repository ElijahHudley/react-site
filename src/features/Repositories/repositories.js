import React, { useState, useEffect } from 'react';

import './style.scss';

export default function Repositories(props) {
  const { user } = props;
  // const [repos, setrepos] = useState(data);

  useEffect(() => {
    const { user, repositories } = props;

    if(!user.isAuthenticated) {
      props.history.push('/');
    }

    console.log('props', props)
    console.log('repositories', repositories);
  });


  const leftColumn = (data) => {
    //const listItems = list.items.map((item, index) => <ListItem key={index} name={item.name} />);

  }

  const rightColumn = data => {

  }

  return (
    <div>
      <div className={'row'}>
        <div className={'header'}>{`(${user.login}) Logged In`}</div>

        <div className={'content'}>
          <div className={'content-left'}>
          </div>

          <div className={'content-right'}>
          </div>
        </div>

        <div className={'footer'}>
          <button
            className={'button'}
            onClick={() => props.clearLogin()}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
