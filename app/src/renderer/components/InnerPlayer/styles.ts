import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    initial: (direction: number) => {
        return {
            opacity: 0,
            x: direction > 0 ? '100%' : '-100%',
        };
    },
    animate: {
        opacity: 1,
        x: 0,
    },
    exit: (direction: number) => {
        return {
            opacity: 0,
            x: direction < 0 ? '100%' : '-100%',
        };
    },
};

export const Container = styled(motion.div).attrs({
    variants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    transition: { opacity: { duration: 1 }, ease: 'easeInOut', type: 'spring', stiffness: 200, damping: 30 },
})`
    width: 100%;
    height: 100%;
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
    width: 100%;
    height: 100%;
`;
