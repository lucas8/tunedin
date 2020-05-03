import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as S from './styles';
import { Icon } from '../Icon';
import { H1 } from '../Typography';

export default function SearchBar() {
    const [[direction, searchVisible], setSearchVisible] = useState([1, false]);

    return (
        <S.Container searchVisible={searchVisible}>
            <AnimatePresence initial={false} custom={direction}>
                {searchVisible && (
                    <S.MotionContainer custom={direction}>
                        <Icon glyph="search" size={16} style={{ opacity: 0.4 }} />
                        <S.Input placeholder="Search for a song, playlist or artist" />
                        <S.CancelButton onClick={() => setSearchVisible([-1, false])}>
                            <Icon glyph="cancel" size={16} />
                        </S.CancelButton>
                    </S.MotionContainer>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false} custom={direction}>
                {!searchVisible && (
                    <S.MotionContainer custom={direction}>
                        <H1>Recently Played</H1>
                        <S.IconButton onClick={() => setSearchVisible([1, true])}>
                            <Icon glyph="search" size={16} />
                        </S.IconButton>
                    </S.MotionContainer>
                )}
            </AnimatePresence>
        </S.Container>
    );
}
