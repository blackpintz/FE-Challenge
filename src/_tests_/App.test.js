import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let connectWallet;
beforeEach(() => {
  connectWallet=jest.fn();
  wrapper = shallow(<App />);
})

test('renders app correctly', () => {
  // wrapper.find('button').simulate('click')
  const btn = wrapper.find('#connect')
  btn.simulate('click')
  console.log(btn.debug())
});
