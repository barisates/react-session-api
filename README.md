# react-session-api
Store the data throughout the session and move the data between components. You can easily move state between components.

[![npm package][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Dependencies Status][david-image]][david-url]
[![Package Size][bundlephobia-image]][bundlephobia-url]

## Getting started

#### Install with NPM:

```
$ npm install react-session-api
```

#### Usage

**Live Demo [CodeSandbox](https://codesandbox.io/s/react-session-api-xmg9v "CodeSandbox")**

With this component, you can create data that is stored throughout the session. You can access this data from anywhere in your project.

When the page is closed, the stored data is deleted. You can think of this data as a **global state**.

You can handle data changes from the ```Session.onSet(function UniqueName(data) { })``` event and set the ```state``` of the components.

##### Features
- Set and get data from all components. 
- You can easily handle data changes. 
- Timeout property for datas.
- ```sessionStorage``` or ```localStorage``` browser property not require.

#### Example
A simple example for sharing data and handling changes between components.

![Default Theme](http://barisates.com/git/rsa/example.jpg "Example")

```jsx
// Counter.js
import React, { Component } from 'react';
import Session from 'react-session-api'

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
```
```jsx
// IncreaseButton.js
import React, { Component } from 'react';
import Session from 'react-session-api'

const IncreaseButton = () => {
    const onIncrease = () => {
        let counter = Session.get("counter") + 1;
        Session.set("counter", counter);
    }
    return (
        <button
            className="btn btn-sm btn-success"
            onClick={(e) => onIncrease()}>
            Increase Number
        </button>
    )
}

export default IncreaseButton;
```
```jsx
// DecreaseButton.js
import React, { Component } from 'react';
import Session from 'react-session-api'

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
```
#### Properties

Descriptions and configuration settings for component properties.
- **```Session.set(key, value)``` Set session item.**
	- ```key``` ```{string}``` session item key.
	- ```value``` ```{Object|string}``` session item value, if you are using browser storage, it can only take ```{string}```.

- **```Session.get(key)```  Get session item.**
	- ```key``` ```{string}``` session item key.

- **```Session.remove(key)```  Remove session item by key.**
	- ```key``` ```{string}``` session item key.

- **```Session.items()```  Get all items.**

- **```Session.clear()```  Clear all items.**

- **```Session.unmount(callbackName)```  Unmount callback function.**
	- ```callbackName``` ```{string}``` callback unique name.

##### Events

- **```Session.onSet(function UniqueName(data) { /* do things */ })``` Triggered when session data changes.**

	- ```data``` new data set.

##### Configuration

- **```config(browserStorage = false, timeout = 0)``` Set session config.**

	- ```browserStorage``` ```{bool}``` use browser sessionStorage.
	- ```timeout``` ```{number}``` session timeout period, in minutes.

------------
#### Author

**Barış Ateş**
 - http://barisates.com
 - [github/barisates](https://github.com/barisates "github/barisates")

[npm-image]:https://img.shields.io/npm/v/react-session-api.svg
[npm-url]:https://www.npmjs.com/package/react-session-api
[travis-image]:https://travis-ci.org/barisates/react-session-api.svg?branch=master
[travis-url]:https://travis-ci.org/barisates/react-session-api
[david-image]:https://david-dm.org/barisates/react-session-api.svg
[david-url]:https://david-dm.org/barisates/react-session-api
[bundlephobia-image]:https://badgen.net/bundlephobia/minzip/react-session-api
[bundlephobia-url]:https://bundlephobia.com/result?p=react-session-api