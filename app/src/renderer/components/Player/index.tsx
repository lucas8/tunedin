import React from 'react';
import InnerPlayer from '../InnerPlayer';
import * as S from './styles';
import { useCurrentSocketState } from '../../contexts/CurrentContext';
import { Icon } from '../Icon';
import Divider from '../Divider';
import { usePlayerState } from '../../contexts/PlayerContext';

export default function Player() {
    const { isOpen, setOpen, currentPage, view } = usePlayerState();
    const { track, isTrackPlaying } = useCurrentSocketState();
    const artists = track?.artists
        .map((artist) => {
            return artist.name;
        })
        .join(', ');

    return (
        <S.Container
            view={view}
            isOpen={isOpen}
            isPlaying={!!isTrackPlaying}
            // The +1 is to account for the divider
            height={
                typeof currentPage.height == 'number' && !!isTrackPlaying
                    ? (currentPage.height as number) + (70 - 1)
                    : (currentPage.height as number) + (40 - 1)
            }
        >
            <S.PlayingContainer isPlaying={!!isTrackPlaying}>
                <S.AlbumContainer>
                    {isTrackPlaying && !!track ? (
                        <React.Fragment>
                            <S.AlbumImage src={track.album.images[0].url} draggable={false} />
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
