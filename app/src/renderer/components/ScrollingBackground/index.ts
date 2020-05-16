import styled, { keyframes } from 'styled-components';

const move = keyframes`
  from {
    transform: rotate(-13deg) translateY(0);
  }

  to {
    transform: rotate(-13deg) translateY(-658px);
  }
`;

const ScrollingBackground = styled.div`
    height: 400%;
    width: 400%;
    top: -25%;
    left: -100%;
    background-size: 658px auto;
    background-image: url('public/background.png');
    position: absolute;
    display: block;
    animation: ${move} 35s linear infinite;
    z-index: 5;

    :after {
        content: '';
        width: 100%;
        height: 100%;
        background: #2a2a2a80;
        backdrop-filter: blur(8px);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
`;

export default ScrollingBackground;
