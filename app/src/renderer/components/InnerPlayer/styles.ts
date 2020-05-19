import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? '100%' : '-100%',
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
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.9,
        };
    },
};

export const Container = styled(motion.div).attrs({
    variants,
    initial: 'enter',
    animate: 'center',
    exit: 'exit',
    transition: {
        ease: 'easeInOut',
        x: { type: 'spring', stiffness: 300, damping: 200 },
        opacity: { duration: 0.5 },
    },
})`
    width: 100%;
    height: 100%;
    position: absolute;
`;

export const Wrapper = styled(motion.div).attrs({
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 30,
    },
    transition: { opacity: { duration: 1 }, ease: 'easeInOut', type: 'spring', stiffness: 200, damping: 30 },
})`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const InnerWrapper = styled.div<{ height: number | string }>`
    width: 100%;
    height: ${({ height }) => (typeof height == 'number' ? `${height}px` : height)};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
`;
