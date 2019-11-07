import React from 'react';
import App from './index';
import { shallow } from 'enzyme';
import { findByTestAttribute } from '../../../utils';

const setUp = (props = {}) => shallow(<App {...props} />);

describe('App Component', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('Should render without errors', () => {
    const component = findByTestAttribute(wrapper, 'appComponent');
    expect(component).toHaveLength(1);
  });
});