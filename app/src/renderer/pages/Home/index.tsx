import React from 'react';
import Search from '../../components/Search';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import Recent from '../../components/Recent';
import Player from '../../components/Player';
import { useCurrentSocketState } from '../../contexts/CurrentSocketContext';

export interface AnimatedPageProps {
    setDirection: (arg: boolean) => void;
}

export default function Home() {
    const [[direction, searchVisible], setSearchVisible] = React.useState([1, false]);
    const { track, isPending } = useCurrentSocketState();

    const setDirection = (direction: boolean) => {
        if (!direction) {
            setSearchVisible([-1, false]);
        } else {
            setSearchVisible([1, true]);
        }
    };

    return (
        <>
            <AnimatePresence initial={false} custom={direction}>
                {searchVisible && (
                    <S.MotionContainer custom={direction}>
                        <Search setDirection={setDirection} />
                    </S.MotionContainer>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false} custom={direction}>
                {!searchVisible && (
                    <S.MotionContainer custom={direction}>
                        <Recent setDirection={setDirection} />
                    </S.MotionContainer>
                )}
            </AnimatePresence>
            <AnimatePresence>{!!track && !isPending && <Player />}</AnimatePresence>
        </>
    );
}
