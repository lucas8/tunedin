import React from 'react';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';
import { usePlayerState } from '../../contexts/PlayerContext';

export default function InnerPlayer() {
    const { view, isOpen, pages, direction } = usePlayerState();

    return (
        <AnimatePresence>
            {isOpen && (
                <S.Wrapper>
                    {pages.map(({ name, component, height }) => (
                        <AnimatePresence key={name} initial={false}>
                            {view == name && (
                                <S.Container custom={direction == 'right' ? 1 : -1}>
                                    <S.InnerWrapper height={height}>{component}</S.InnerWrapper>
                                </S.Container>
                            )}
                        </AnimatePresence>
                    ))}
                </S.Wrapper>
            )}
        </AnimatePresence>
    );
}
