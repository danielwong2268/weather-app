import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ErrorMessage from '..';

describe('<ErrorMessage />', () => {
  it('Renders with an error message', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<ErrorMessage>my error message</ErrorMessage>);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});