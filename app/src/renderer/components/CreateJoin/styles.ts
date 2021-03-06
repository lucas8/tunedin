import styled from 'styled-components';

export const Title = styled.h4`
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #fff;
    margin: 0;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
`;

export const Button = styled.div<{ color: string }>`
    outline: none;
    border: none;
    background: ${({ color }) => `${color}10`};
    padding: 0 30px;
    height: 40px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ color }) => color};
    font-size: 16px;
    font-weight: 600;
    transition: all ease 100ms;

    div {
        opacity: 0.5;
    }
    span {
        margin-left: 8px;
    }

    :hover {
        background: ${({ color }) => `${color}20`};
    }
    :active {
        background: ${({ color }) => `${color}10`};
    }
`;
