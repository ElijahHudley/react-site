import React, {useEffect, useState} from 'react';
import './style.scss';

export default function IssueItem(props) {
    return (<div className={'issueItem'}>
        <span className={'issueItem-name'}>
                <span>{`${props.number}: ${props.name}`}</span>
        </span>
    </div>)
}
