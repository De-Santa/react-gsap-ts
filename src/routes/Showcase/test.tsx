import React from 'react';
import ReactDOM from 'react-dom';
import { Showcase } from './';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Showcase />, div);
  ReactDOM.unmountComponentAtNode(div);
});
