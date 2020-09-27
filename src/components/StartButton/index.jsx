import React from 'react';

import { StyledButton } from './styles'; 

const StartButton = ({callback}) => {
  return (
    <StyledButton type='button' onClick={callback} > Start Game</StyledButton>
  )
}

export default StartButton;