import styled from 'styled-components';

export const Outline = styled.button`
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 0 14px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    transition: 100ms ease all;
    box-shadow: none;

    :hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    :active {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(0px);
        box-shadow: none;
    }
`;

export const Solid = styled.button<{ color: string }>`
    outline: none;
    border: 1px solid ${({ color }) => color}50;
    background: ${({ color }) => color};
    border-radius: 3px;
    padding: 0 14px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    transition: 100ms ease all;
    box-shadow: none;

    :hover {
        background: ${({ color }) => color}80;
        transform: translateY(-1px);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    :active {
        background: ${({ color }) => color}50;
        transform: translateY(0px);
        box-shadow: none;
    }
`;
