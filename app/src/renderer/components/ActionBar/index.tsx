import React from 'react';
import * as S from './styles';

interface ActionBarProps {
    children?: React.ReactNode;
}

export default function ActionBar({ children }: ActionBarProps) {
    return <S.Container>{children}</S.Container>;
}
