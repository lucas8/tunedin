import styled from 'styled-components';
import theme from '../../theme';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${theme.ui.background};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 36px;
    color: #fff;
    margin-bottom: 18px;
`;

export const Button = styled.button`
    outline: none;
    border: none;
    background: ${theme.brand.primary};
    padding: 0 14px;
    height: 40px;
    border-radius: 7px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-in-out 150ms;

    span {
        margin-left: 6px;
    }

    :hover {
        background: #169643;
        transform: scale(1.05);
    }

    :active {
        background: #12642f;
        transform: scale(1);
    }
`;
