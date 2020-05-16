import React from 'react';
import * as S from './styles';
import { Icon } from '../Icon';
import theme from '../../theme';
import { usePlayerState } from '../../contexts/PlayerContext';

export default function CreateJoin() {
    const { setView } = usePlayerState();

    return (
        <S.Container>
            <S.Title>Create or Join a channel</S.Title>
            <S.ButtonContainer>
                <S.Button onClick={() => setView('create')} color="#ffffff" style={{ marginRight: 20 }}>
                    <Icon glyph="group" size={20} />
                    <span>Create</span>
                </S.Button>
                <S.Button color={theme.brand.primary}>
                    <Icon glyph="add-user" size={20} />
                    <span>Join</span>
                </S.Button>
            </S.ButtonContainer>
        </S.Container>
    );
}
