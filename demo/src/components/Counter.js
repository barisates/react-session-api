import React, { Component } from 'react';
import Session from '../Session';

export default class Counter extends Component {

  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    Session.onSet((data) => {
        this.setState({ counter: data["counter"] })
      });
  }
  render() {
    return (<h5>Counter : <span className={"badge mb-1 " + (this.state.counter < 0 ? 'badge-warning color-white' : 'badge-primary')}> {this.state.counter}</span></h5>)
  }
}