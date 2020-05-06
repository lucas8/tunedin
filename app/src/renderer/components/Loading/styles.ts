import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
`;

const variants = {
    enter: {
        opacity: 0,
        scale: 0.95,
    },
    loaded: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: {
        opacity: 0,
        scale: 1.1,
    },
};

export const MotionContainer = styled(motion.div).attrs(() => ({
    variants,
    initial: 'enter',
    animate: 'loaded',
    exit: 'exit',
    transition: {
        type: 'spring',
    },
}))`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
`;

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
