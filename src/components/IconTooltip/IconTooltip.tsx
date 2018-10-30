import React from 'react';
import styled from 'react-emotion';
import { Tooltip } from 'antd';

const IconWrapper = styled('div')`
  display:inline-block;
  width:30px;
  height: 30px;
`

interface IconTooltipProps {
  children: React.ReactNode;
  text: string;
}

const IconTooltip = ({ children, text }: IconTooltipProps) => (
  <Tooltip placement="topRight" title={text}>
    <IconWrapper>
     {children}
    </IconWrapper>
  </Tooltip>
);

export default IconTooltip