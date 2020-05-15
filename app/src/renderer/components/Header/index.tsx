import React from 'react';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';
import ScrollHeader from '../ScrollHeader';

interface HeaderProps {
    children?: React.ReactNode;
    scrollTitle?: string;
    scrollPos?: number;
}

export default function Header({ children, scrollTitle, scrollPos }: HeaderProps) {
    return (
        <React.Fragment>
            {scrollTitle && scrollPos !== undefined && (
                <AnimatePresence>{scrollPos > 30 && <ScrollHeader title={scrollTitle} />}</AnimatePresence>
            )}
            <S.Container>{children}</S.Container>
        </React.Fragment>
    );
}
