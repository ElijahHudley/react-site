import React, {useEffect, useState} from 'react';
import moment from 'moment';

import './style.scss';

export default function IssueItem(props) {
    const created = moment(props.created);
    const updated = moment(props.updated);
    const daysAgo = created.diff(updated);

    return (<div className={'issueItem'}>
        <div className={'issueItem-name'}>
            <img src={props.image} className={'issueItem-image'} />

            <span>{`${props.number}: ${props.name} - ${props.state}`}</span>
            <span>{`Create At: ${created.format('MM/DD/YYYY')}`}</span>
            <span>{`Updated: ${moment(daysAgo).get('Days')} Days Ago`}</span>
        </div>
    </div>)
}
