import React from 'react';
import { css } from 'emotion';
import { CSSTransition } from 'react-transition-group';

const fadeStyle = css`
  .fade-in-enter {
    transition: opacity 250ms ease-in;
    transform: translateY(10px);
    opacity: 0.01;
  }

  .fade-in-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: all 250ms ease-out;
  }
`;

interface FadeProps {
  children: React.ReactNode;
  inProp: boolean;
}

const FadeTransition = ({
  children,
  inProp
}: FadeProps) => (
  <div className={fadeStyle}>
    <CSSTransition
      unmountOnExit
      in={inProp}
      timeout={{ enter: 250, exit: 250 }}
      classNames="fade-in"
    >
      <div>{children}</div>
    </CSSTransition>
  </div>
);

export default FadeTransition;