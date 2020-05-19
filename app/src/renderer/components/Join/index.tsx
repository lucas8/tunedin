import React from 'react';
import * as S from './styles';
import * as B from '../Button';
import ActionBar from '../ActionBar';
import { usePlayerState } from '../../contexts/PlayerContext';
import theme from '../../theme';
import { useChannel } from '../../contexts/SocketContext';
import { ReducerAction } from '../../types/types';

interface State {
    test: string;
}

const eventReducer = (state: State, { event, payload }: ReducerAction) => {
    switch (event) {
        case 'phx_reply':
            console.log(payload);
            return { ...state, test: 'hello world' };
        default:
            return state;
    }
};

const initialState = {
    test: 'a',
};

export default function Join() {
    const [invite, setInvite] = React.useState('');
    const { setView, setDirection } = usePlayerState();
    const { socket, join } = useChannel(eventReducer, initialState);

    // React.useEffect(() => {
    //     setDirection('left');
    // }, []);

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        console.log('hi');
        join(`channel:${invite}`);
        event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvite(event.target.value);
    };

    return (
        <S.Form onSubmit={handleSubmit}>
            <div style={{ width: '80%' }}>
                <S.Title>Enter an invite code</S.Title>
                <S.Input value={invite} onChange={handleChange} placeholder="https://tunedin.app/jb2a" />
            </div>
            <ActionBar>
                <B.Outline onClick={() => setView('createjoin')}>Back</B.Outline>
                <B.Solid type="submit" color={theme.brand.primary}>
                    Join
                </B.Solid>
            </ActionBar>
        </S.Form>
    );
}
