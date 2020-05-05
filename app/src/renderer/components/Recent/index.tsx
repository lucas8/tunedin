import React from 'react';
import { H1 } from '../Typography';
import { AnimatedPageProps } from '../../pages/Home';
import { Icon } from '../Icon';
import * as S from './styles';
import { HeadingContainer } from '../../pages/Home/styles';

export default function Recent({ setDirection }: AnimatedPageProps) {
    return (
        <>
            <HeadingContainer>
                <H1>Recently Played</H1>
                <S.IconButton onClick={() => setDirection(true)}>
                    <Icon glyph="search" size={16} />
                </S.IconButton>
            </HeadingContainer>
            <div>helo world</div>
        </>
    );
}
