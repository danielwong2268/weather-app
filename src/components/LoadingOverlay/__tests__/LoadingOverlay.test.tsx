import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoadingOverlay from '..';

describe('<FadeTransition />', () => {
  it('Renders an the overlay', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<LoadingOverlay />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});