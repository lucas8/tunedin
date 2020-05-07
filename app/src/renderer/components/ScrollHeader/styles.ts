import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    enter: {
        opacity: 0,
        y: -60,
    },
    top: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -60,
    },
};

export const MotionContainer = styled(motion.div).attrs(() => ({
    variants,
    initial: 'enter',
    animate: 'top',
    exit: 'exit',
    transition: {
        y: { type: 'spring', stiffness: 300, damping: 200 },
    },
}))`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    background: #11111195;
    backdrop-filter: blur(20px);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 8px;
`;

export const TextContainer = styled.div``;

const textVariants = {
    before: {
        opacity: 0,
        y: -50,
    },
    after: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 200,
            delay: 0.09,
        },
    },
};

export const Text = styled(motion.div).attrs(() => ({
    variants: textVariants,
    initial: 'before',
    animate: 'after',
}))`
    position: relative;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
`;
