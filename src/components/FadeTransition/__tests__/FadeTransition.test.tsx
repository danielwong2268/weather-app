import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FadeTransition from '..';

describe('<FadeTransition />', () => {
  it('Renders with children', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<FadeTransition inProp>child</FadeTransition>);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});