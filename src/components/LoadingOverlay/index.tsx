import React from 'react';
import styled from 'react-emotion';
import Spinner from '../Spinner';
import { WHITE } from 'src/constants/colors';

const Overlay = styled('div')`
  opacity: 0.55;
  background-color: ${WHITE};
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  top: 0;
  left: 0;
`;

const LoadingOverlay = () => (
  <Overlay>
      <Spinner />
  </Overlay>
);

export default LoadingOverlay;