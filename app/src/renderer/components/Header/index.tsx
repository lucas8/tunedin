import React from 'react';
import * as S from './styles';
import { H1 } from '../Typography';
import { AnimatePresence } from 'framer-motion';
import ScrollHeader from '../ScrollHeader';

interface HeaderProps {
    children?: React.ReactNode;
    scrollTitle?: string;
}

export default function Header({ children, scrollTitle }: HeaderProps) {
    const [scrollPos, setScrollPos] = React.useState(0);

    const trackScroll = React.useCallback(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrolled = winScroll / height;

        setScrollPos(scrolled);
    }, []);

    React.useEffect(() => {
        window.addEventListener(`scroll`, trackScroll);

        return () => {
            window.removeEventListener(`scroll`, trackScroll);
        };
    });
    return (
        <React.Fragment>
            {scrollTitle && (
                <AnimatePresence>{scrollPos > 0.2 && <ScrollHeader title={scrollTitle} />}</AnimatePresence>
            )}
            <S.Container>{children}</S.Container>
        </React.Fragment>
    );
}
