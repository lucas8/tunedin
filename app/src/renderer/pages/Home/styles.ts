import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '../../theme';

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

const containerVariants = {
    small: {
        opacity: 0.4,
        scale: 0.95,
        borderRadius: 7,
    },
    full: {
        opacity: 1,
        scale: 1,
        borderRadius: 0,
    },
};

// TODO: Fix spotify not playing -> playing bug

interface MotionPageContainerProps {
    isOpen: boolean;
}

export const MotionPageContainer = styled(motion.div).attrs(({ isOpen }: MotionPageContainerProps) => ({
    variants: containerVariants,
    animate: isOpen ? 'small' : 'full',
    transition: {
        ease: 'easeInOut',
        duration: 0.25,
    },
}))<MotionPageContainerProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: ${theme.ui.background};
    overflow: auto;
`;
