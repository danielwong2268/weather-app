import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '..';

describe('<Spinner />', () => {
  it('Renders a div with className "lds-ripple" and two children divs', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Spinner />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});