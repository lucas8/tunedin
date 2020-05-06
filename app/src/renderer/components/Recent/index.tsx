import React from 'react';
import { H1 } from '../Typography';
import { AnimatedPageProps } from '../../pages/Home';
import { Icon } from '../Icon';
import * as S from './styles';
import { HeadingContainer } from '../../pages/Home/styles';
import { useRecentState } from '../../contexts/RecentContext';

export default function Recent({ setDirection }: AnimatedPageProps) {
    const { tracks } = useRecentState();

    return (
        <>
            <HeadingContainer>
                <H1>Recently Played</H1>
                <S.IconButton onClick={() => setDirection(true)}>
                    <Icon glyph="search" size={16} />
                </S.IconButton>
            </HeadingContainer>
            <S.RecentTrackContainer>
                {tracks?.map(({ track }, x) => {
                    return <S.RecentTrack image={track.album.images[1].url} key={x} />;
                })}
            </S.RecentTrackContainer>
        </>
    );
}
