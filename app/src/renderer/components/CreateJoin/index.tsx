import React from 'react';
import * as S from './styles';
import { Icon } from '../Icon';
import theme from '../../theme';
import { usePlayerState } from '../../contexts/PlayerContext';

export default function CreateJoin() {
    const { setView, setDirection, direction } = usePlayerState();

    React.useEffect(() => {
        setDirection('right');
    }, [direction]);

    return (
        <>
            <S.Title>Create or Join a channel</S.Title>
            <S.ButtonContainer>
                <S.Button color="#ffffff" style={{ marginRight: 20 }}>
                    <Icon glyph="group" size={20} />
                    <span>Create</span>
                </S.Button>
                <S.Button onClick={() => setView('join')} color={theme.brand.primary}>
                    <Icon glyph="add-user" size={20} />
                    <span>Join</span>
                </S.Button>
            </S.ButtonContainer>
        </>
    );
}
