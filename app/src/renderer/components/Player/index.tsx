import React from 'react';
import * as S from './styles';
import { useCurrentSocketState } from '../../contexts/CurrentSocketContext';
import { Icon } from '../Icon';

interface PlayerProps {
    isOpen: boolean;
    setOpen: () => void;
}

export default function Player({ isOpen, setOpen }: PlayerProps) {
    const { track, isTrackPlaying } = useCurrentSocketState();
    const artists = track?.artists
        .map((artist) => {
            return artist.name;
        })
        .join(', ');

    return (
        <S.Container isOpen={isOpen} isPlaying={!!isTrackPlaying}>
            <S.PlayingContainer isPlaying={!!isTrackPlaying}>
                <S.AlbumContainer>
                    {isTrackPlaying && !!track ? (
                        <React.Fragment>
                            <S.AlbumImage src={track.album.images[0].url} />
                            <S.AlbumTextContainer>
                                <S.AlbumTitle>{track.name}</S.AlbumTitle>
                                <S.AlbumArtist>{artists}</S.AlbumArtist>
                            </S.AlbumTextContainer>
                        </React.Fragment>
                    ) : (
                        <S.AlbumTextContainer>
                            <S.AlbumTitle style={{ opacity: 0.5 }}>No track currently playing...</S.AlbumTitle>
                        </S.AlbumTextContainer>
                    )}
                </S.AlbumContainer>
                <S.Button isOpen={isOpen} onClick={() => setOpen()}>
                    <Icon glyph="chevron-down" size={28} />
                </S.Button>
            </S.PlayingContainer>
        </S.Container>
    );
}
