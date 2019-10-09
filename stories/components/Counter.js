import React, { Component } from 'react';
import Session from '../../src'

class Counter extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }
  componentDidMount() {
    const counter = (data) => {
      this.setState({ counter: data["counter"] });
    };

    Session.onSet(counter);
  }
  componentWillUnmount() {
    Session.unmount("counter");
  }
  render() {
    return (
      <h5>
        Counter : 
        <span
          className={"badge " + (this.state.counter < 0 ? 'badge-warning color-white' : 'badge-primary')}>
          {this.state.counter}
        </span>
      </h5>
    )
  }
}

export default Counter;