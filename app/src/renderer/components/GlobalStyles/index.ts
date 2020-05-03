import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import theme from '../../theme';

export default createGlobalStyle`
  ${normalize}
  
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
    line-height: 1.5;
    background-color: ${theme.ui.background};
    color: ${theme.text.primary};
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  
  p {
    margin: 0;
  }
  a, button {
    text-decoration: none;
    cursor: pointer;
  }
`;
