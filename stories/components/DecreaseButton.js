
import React from 'react';
import Session from '../../src'

const DecreaseButton = () => {
  const onDecrease = () => {
    let counter = Session.get("counter") - 1;
    Session.set("counter", counter);
  }

  return (
    <button
      className="btn btn-sm btn-danger"
      onClick={(e) => onDecrease()}>
      Decrease Number
        </button>
  )
}

export default DecreaseButton;