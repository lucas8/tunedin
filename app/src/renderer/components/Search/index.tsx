import React from 'react';
import * as S from './styles';
import { Icon } from '../Icon';
import { AnimatedPageProps } from '../../pages/Home';

export default function Search({ setDirection }: AnimatedPageProps) {
    return (
        <S.Container>
            <Icon glyph="search" size={16} style={{ opacity: 0.4 }} />
            <S.Input placeholder="Search for a song, playlist or artist" />
            <S.CancelButton onClick={() => setDirection(false)}>
                <Icon glyph="cancel" size={16} />
            </S.CancelButton>
        </S.Container>
    );
}
