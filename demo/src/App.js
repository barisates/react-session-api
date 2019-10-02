import React from 'react';
import Counter from './components/Counter'
import './App.css';

import Session from './Session'
import { IncreaseButton } from './components/IncreaseButton';
import { DecreaseButton } from './components/DecreaseButton';


console.log(Session);

function App() {

  Session.set("counter", 0);

  return (
    <div className="App">
      <header className="App-header">
        <div className="row main-div">
          <div className="col-md-12">
            <div className="component-div set float-left">
              <p>Counter.js</p>
              <Counter />
            </div>
            <div className="component-div float-right">
            <p>IncreaseButton.js</p>
            <IncreaseButton />
            </div>
            <br></br>
            <div className="component-div float-right">
            <p>DecreaseButton.js</p>
            <DecreaseButton />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}


export default App;
