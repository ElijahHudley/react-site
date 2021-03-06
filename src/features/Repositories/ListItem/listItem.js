import React, { useState } from 'react';

import './style.scss';

export default function ListItem(props) {
    return (<div className={props.selected ? 'listItem selected' : 'listItem'} onClick={props.onClick}>
        <span className={'listItem-name'}>
            {props.name}
        </span>
    </div>)
}
