import React, { useState } from 'react';
import { FiArrowUp, FiArrowLeft, FiArrowRight, FiArrowDown } from 'react-icons/fi'

import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';

import { useInterval } from '../../hooks/useInterval';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { createStage, checkCollision } from '../../gameHelpers';
import { useGameStatus } from '../../hooks/useGameStatus';

import { SrtyledTetrisWrapper, StyledTetris } from './styles';
 
const Tetris = () => {
  const [ dropTime, setDropTime ] = useState(null);
  const [ gameOver, setGameOver ] = useState(false);

  const [ player, updatePlayerPos, resetPlayer, playerRotate ] = usePlayer();
  const [ stage, setStage, rowsCleared ] = useStage(player, resetPlayer);
  const [ score, setScore, rows, setRows, level, setLevel ] = useGameStatus(rowsCleared); 

  const movePlayer = dir => {
    if(!checkCollision(player, stage, { x: dir, y: 0 })){
      updatePlayerPos({ x: dir, y: 0});
    }
  };

  const startGame = () => {
    //Reset
    setStage(createStage());
    setDropTime(500);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // increase level when player cleared 10 rows
    if(rows > (level + 1) * 10){
      setLevel(prev => prev + 1);
      // also increase speed
      setDropTime( 500 / (level + 1) + 200 );
    }

    if(!checkCollision(player, stage, { x:0, y:1})){
      updatePlayerPos({ x:0, y:1, collided: false});
    }else {
      if( player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x:0, y:0, collided: true})
    }
  };

  const keyUp = ({keyCode}) => {
    if(!gameOver){
      if(keyCode === 40) {
        setDropTime(500 / (level + 1) + 200 );
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move =({keyCode}) => {
    if(!gameOver){
      if(keyCode === 37){
        movePlayer(-1);
      }else if (keyCode === 39){
        movePlayer(1);
      } else if (keyCode === 40){
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <SrtyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)} onKeyUp={keyUp} >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`}  />
              <Display text={`Level: ${level}`}  />
            </div>
          )}
          <div className='tutorial' >
            <div className='keyboardsUp' >
              <FiArrowUp size={30} color='#000'/>
            </div>
            <div className='keyboardsDown' >
              <FiArrowLeft size={30} color='#000'/>
              <FiArrowDown size={30} color='#000'/>
              <FiArrowRight size={30} color='#000'/>
            </div>
            <div className='tutorialOption' >
              <span>Move Left</span>
              <span>Move Down</span>
              <span>Move Right</span>
            </div>
          </div>
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </SrtyledTetrisWrapper>
  )
}

export default Tetris;