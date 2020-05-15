import React from 'react';
import * as S from './styles';
import { useCurrentSocketState } from '../../contexts/CurrentSocketContext';

interface PlayerProps {
    isOpen: boolean;
    setOpen: () => void;
}

export default function Player({ isOpen, setOpen }: PlayerProps) {
    const { track } = useCurrentSocketState();
    const artists = track?.artists
        .map((artist) => {
            return artist.name;
        })
        .join(', ');

    return (
        <S.Container isOpen={isOpen}>
            <S.AlbumImage src={track?.album.images[0].url || 'https://via.placeholder.com/150'} />
            <S.AlbumTextContainer>
                <S.AlbumTitle>{track?.name || 'Loading...'}</S.AlbumTitle>
                <S.AlbumArtist>{artists || 'Loading...'}</S.AlbumArtist>
            </S.AlbumTextContainer>
            <button onClick={() => setOpen()}>Click Me!</button>
        </S.Container>
    );
}
