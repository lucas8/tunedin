import React from 'react';
import * as S from './styles';
import * as B from '../Button';
import ActionBar from '../ActionBar';
import { usePlayerState } from '../../contexts/PlayerContext';
import theme from '../../theme';
import { useChannelState } from '../../contexts/ChannelContext';
import { Icon } from '../Icon';

export default function Join() {
    const [invite, setInvite] = React.useState('');
    const { setView, setDirection } = usePlayerState();
    const { joinChannel, error } = useChannelState();

    const handleBack = async () => {
        // Await actually has a very large effect on
        await setDirection('left');
        setView('createjoin');
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        joinChannel(invite);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvite(event.target.value);
    };

    return (
        <S.Form onSubmit={handleSubmit}>
            <div style={{ width: '80%' }}>
                <S.Title>Enter an invite code</S.Title>
                <S.Input value={invite} onChange={handleChange} placeholder="https://tunedin.app/jb2a" />
                {error && <S.Pre>{error.toString()}</S.Pre>}
            </div>
            <ActionBar>
                <B.Outline type="button" onClick={handleBack}>
                    <Icon glyph="chevron-down" size={16} style={{ transform: 'rotate(-90deg)' }} />
                    <span>Back</span>
                </B.Outline>
                <B.Solid type="submit" color={theme.brand.primary}>
                    Join
                </B.Solid>
            </ActionBar>
        </S.Form>
    );
}
