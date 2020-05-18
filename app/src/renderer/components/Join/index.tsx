import React from 'react';
import * as S from './styles';
import * as B from '../Button';
import ActionBar from '../ActionBar';
import { usePlayerState } from '../../contexts/PlayerContext';
import theme from '../../theme';

export default function Join() {
    const { setView, setDirection } = usePlayerState();

    React.useEffect(() => {
        setDirection('left');
    }, []);

    return (
        <S.Container>
            <div style={{ width: '80%' }}>
                <S.Title>Enter an invite code</S.Title>
                <S.Input placeholder="https://tunedin.app/jb2a" />
            </div>
            <ActionBar>
                <B.Outline onClick={() => setView('createjoin')}>Back</B.Outline>
                <B.Solid color={theme.brand.primary}>Join</B.Solid>
            </ActionBar>
        </S.Container>
    );
}
