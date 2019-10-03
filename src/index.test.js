import React from 'react';
import ReactDOM from 'react-dom';
import Session from './index'

it('renders without crashing', () => {

    Session.set("test", "jest");
    let jest = Session.get("test");

});