import styled from 'styled-components';

import bgImage from '../../img/bg.png';

export const SrtyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background : url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display:flex;
  align-items: flex-start;
  padding: 0.8% 0 1% 0;
  margin: 0 auto;
  max-width: 700px;

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
    

    .tutorial {
      display: flex;
      flex-direction:column;
      color: #fff;

      .keyboardsUp {
        width: 100%;
        display: flex;
        align-items:center;
        justify-content:center;
        position:relative;
        
        &::after {
          content:"Rotate";
          position: absolute;
          right: 0;
          margin-left: 10px;
          background: #333;
          border-radius: 5px;
          padding: 12px;
        }
        
        svg {
          background: #999;
          padding: 5px;
          border: 0;
          border-radius: 5px;
        }
      }
      .keyboardsDown {
        width: 100%;
        display: flex;
        align-items:center;
        justify-content:space-between;
        width: 70%;
        margin: 10px auto;
        
        svg {
          background: #999;
          padding: 5px;
          border: 0;
          border-radius: 5px;
        }
      }

      .tutorialOption{
        display: flex;
        justify-content:space-between;
        /* background: #333;? */
        margin-bottom: 10px;
        
        span {
          width: 40px;
          border-radius: 5px;
          font-size: 15px;
          padding: 12px;
          background: #333;
        }
      }
    }
  }

`;


