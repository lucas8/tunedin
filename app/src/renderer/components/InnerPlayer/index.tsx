import React from 'react';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';
import { usePlayerState } from '../../contexts/PlayerContext';
import ActionBar from '../ActionBar';

export default function InnerPlayer() {
    const { view, isOpen, pages } = usePlayerState();
    const [direction, setDirection] = React.useState('right');

    return (
        <AnimatePresence>
            {isOpen && (
                <S.Wrapper>
                    {pages.map(({ name, component, height, actionBar }) => (
                        <AnimatePresence key={name} initial={false}>
                            {view == name && (
                                <S.Container custom={direction == 'right' ? 1 : -1}>
                                    <S.InnerWrapper height={height}>
                                        {component}
                                        <AnimatePresence>
                                            {!!actionBar && (
                                                <ActionBar
                                                    setDirection={(direction: string) => setDirection(direction)}
                                                >
                                                    {actionBar}
                                                </ActionBar>
                                            )}
                                        </AnimatePresence>
                                    </S.InnerWrapper>
                                </S.Container>
                            )}
                        </AnimatePresence>
                    ))}
                </S.Wrapper>
            )}
        </AnimatePresence>
    );
}
/*
 <AnimatePresence>
                                            {actionBar && (
                                                <ActionBar
                                                    setDirection={(direction: boolean) => setDirection(direction)}
                                                />
                                            )}
                                        </AnimatePresence>
*/
