import React from 'react';
import InnerPlayer from '../InnerPlayer';
import * as S from './styles';
import { useCurrentSocketState } from '../../contexts/CurrentSocketContext';
import { Icon } from '../Icon';
import Divider from '../Divider';
import { usePlayerState } from '../../contexts/PlayerContext';

export default function Player() {
    const { isOpen, setOpen, playerHeight, view } = usePlayerState();
    const { track, isTrackPlaying } = useCurrentSocketState();
    const artists = track?.artists
        .map((artist) => {
            return artist.name;
        })
        .join(', ');

    return (
        <S.Container view={view} isOpen={isOpen} isPlaying={!!isTrackPlaying} height={playerHeight}>
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
                <S.Button isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
                    <Icon glyph="chevron-down" size={28} />
                </S.Button>
            </S.PlayingContainer>
            <Divider />
            <InnerPlayer />
        </S.Container>
    );
}
