import React from 'react';
import useSWR from 'swr';
import * as S from './styles';
import { Icon } from '../Icon';
import theme from '../../theme';
import { usePlayerState } from '../../contexts/PlayerContext';
import { APIResponse, Channel } from '../../types/types';
import { fetchWithAuth } from '../../utils/fetcher';
import { baseUrl } from '../../utils/config';
import { useChannelState } from '../../contexts/ChannelContext';

export default function CreateJoin() {
    const { setDirection, direction, setView } = usePlayerState();
    const [create, setCreate] = React.useState(false);
    const { joinChannel } = useChannelState();
    useSWR<APIResponse<Channel>>(
        () => (create ? `${baseUrl}/api/channels/new` : null),
        fetchWithAuth({ method: 'POST' }),
        {
            onSuccess: ({ success, message }) => {
                if (success) {
                    joinChannel(message.slug);
                }
            },
        },
    );

    React.useEffect(() => {
        setDirection('right');
    }, [direction]);

    return (
        <>
            <S.Title>Create or Join a channel</S.Title>
            <S.ButtonContainer>
                <S.Button onClick={() => setCreate(true)} color="#ffffff" style={{ marginRight: 20 }}>
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
