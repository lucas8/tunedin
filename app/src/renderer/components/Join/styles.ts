import styled from 'styled-components';

export const Title = styled.h4`
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: #fff;
    margin: 0;
    margin-bottom: 14px;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 36px;
    margin-bottom: 46px;
`;

export const Input = styled.input`
    width: 100%;
    outline: none;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 6px 8px;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
`;
