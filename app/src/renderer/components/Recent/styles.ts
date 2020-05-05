import styled from 'styled-components';
import theme from '../../theme';

export const IconButton = styled.button`
    display: flex;
    border: none;
    outline: none;
    height: 30px;
    width: 30px;
    border-radius: 4px;
    background: none;
    margin-left: auto;
    opacity: 0.4;
    color: ${theme.text.primary};
`;
