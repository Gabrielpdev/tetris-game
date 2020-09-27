import React from 'react';

import { StyledCell } from './styles';
import { TETROMINOS } from '../../tetrominos';

const Cell = ({type}) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color} /> 
  )
}

export default React.memo(Cell);