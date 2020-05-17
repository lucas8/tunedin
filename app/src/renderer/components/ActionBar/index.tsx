import React from 'react';
import * as S from './styles';
import { usePlayerState } from '../../contexts/PlayerContext';

interface ActionBarProps {
    setDirection(direction: string): void;
    children?: React.ReactNode;
}

export default function ActionBar({ setDirection, children }: ActionBarProps) {
    React.useEffect(() => {
        setDirection('left');
        return () => {
            setDirection('right');
        };
    }, []);

    return <S.Container>{children}</S.Container>;
}

export function JoinActionBar() {
    const { setView } = usePlayerState();
    return <S.SolidButton onClick={() => setView('createjoin')}>Back</S.SolidButton>;
}
