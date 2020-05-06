import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '../../theme';

export const HeadingContainer = styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    backdrop-filter: blur(20px);
    padding: 8px;
    transition: all ease 150ms;
    z-index: 10;
    position: fixed;
    background: #11111195;
    left: 0;
    top: 0;
    right: 0;
    margin-bottom: 60px;
`;

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        };
    },
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        };
    },
};

export const MotionContainer = styled(motion.div).attrs(() => ({
    variants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: {
        x: { type: 'spring', stiffness: 300, damping: 200 },
        opacity: { duration: 0.5 },
    },
}))`
    transform-origin: top;
    display: flex;
    padding: 0px 8px 8px 8px;
    align-items: flex-start;
    justify-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
`;
