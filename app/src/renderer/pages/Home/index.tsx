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
    const [isOpen, setOpen] = React.useState(false);
    const [[direction, searchVisible], setSearchVisible] = React.useState([1, false]);
    const { isPending, isTrackPlaying } = useCurrentSocketState();
    const [scrollPos, setScrollPos] = React.useState(0);

    const trackScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        setScrollPos(e.currentTarget.scrollTop);
    };

    const setDirection = (direction: boolean) => {
        if (!direction) {
            setSearchVisible([-1, false]);
        } else {
            setSearchVisible([1, true]);
        }
    };

    const mainClick = () => {
        if (isOpen) {
            setOpen(false);
        }
    };

    return (
        <>
            <S.MotionPageContainer isOpen={isOpen} onScroll={trackScroll} onClick={mainClick}>
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
                            <Recent setDirection={setDirection} scrollPos={scrollPos} />
                        </S.MotionContainer>
                    )}
                </AnimatePresence>
            </S.MotionPageContainer>
            <AnimatePresence>
                {!isPending && isTrackPlaying !== null && <Player isOpen={isOpen} setOpen={() => setOpen(!isOpen)} />}
            </AnimatePresence>
        </>
    );
}
