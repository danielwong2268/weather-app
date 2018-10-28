import React from 'react';
import styled from 'react-emotion';
import { BLUE_1 } from 'src/constants/colors';

const HeaderContainer = styled('div')`
  height: 100px;
  background-color: ${BLUE_1};
`

interface HeaderProps {
  children?: React.ReactNode;
}

const Spacer = ({ children }: HeaderProps) => (
  <HeaderContainer>
    { children }
  </HeaderContainer>
)

export default Spacer;
