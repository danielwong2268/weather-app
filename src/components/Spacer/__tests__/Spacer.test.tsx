import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spacer from '..';

describe('<Spacer />', () => {
  it('Renders with children', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Spacer>child</Spacer>);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});