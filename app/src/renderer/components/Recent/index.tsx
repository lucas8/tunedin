import React from 'react';
import { H1 } from '../Typography';
import { AnimatedPageProps } from '../../pages/Home';
import { Icon } from '../Icon';
import * as S from './styles';
import { useRecentState } from '../../contexts/RecentContext';
import Header from '../Header';

export default function Recent({ setDirection }: AnimatedPageProps) {
    const { tracks } = useRecentState();

    let titleImage: string | undefined = undefined;
    if (tracks) {
        titleImage = tracks[0].track.album.images[0].url;
    }

    return (
        <>
            <S.BackgroundImage image={titleImage} />
            <Header scrollTitle="Recently Played">
                <H1>Recently Played</H1>
                <S.IconButton onClick={() => setDirection(true)}>
                    <Icon glyph="search" size={16} />
                </S.IconButton>
            </Header>
            <S.RecentTrackContainer>
                {tracks?.map(({ track }, x) => {
                    return <S.RecentTrack image={track.album.images[0].url} key={x} />;
                })}
            </S.RecentTrackContainer>
        </>
    );
}
