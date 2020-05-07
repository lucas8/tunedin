import React from 'react';
import * as S from './styles';

interface ScrollHeader {
    title: string;
}

export default function ScrollHeader({ title }: ScrollHeader) {
    return (
        <S.MotionContainer>
            <S.TextContainer>
                <S.Text>{title}</S.Text>
            </S.TextContainer>
        </S.MotionContainer>
    );
}
