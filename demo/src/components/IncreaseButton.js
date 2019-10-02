
import React from 'react';
import Session from '../Session'

export const IncreaseButton = () => {

    const onIncrease = () => {
        let counter = Session.get("counter") + 1;

        Session.set("counter", counter);
    }
    return (<button className="btn btn-sm btn-success" onClick={(e) => onIncrease()}> Increase Number </button>)

}