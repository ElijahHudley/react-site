import React, { useState } from 'react';
import './style.scss';

export default function IssueItem(props) {
    const [order, setOrder] = useState(props.number);

    const sendOrder = (num) => {
        props.onClick(num);
    }

    return (<div className={'issueItem'} onClick={sendOrder(order)}>
        <span className={'issueItem-name'}>

            {props.editMode ?
                <span>
                    <input
                        className={props.editMode ? 'on' : 'off'}
                        aria-label="Issue order"
                        value={order}
                        onChange={e => setOrder(e.target.value)}
                    />
                    <span>{`${props.name}`}</span>
                </span>
                :
                <span>{`${props.number}: ${props.name}`}</span>
            }

        </span>
    </div>)
}
