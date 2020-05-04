import styled from 'styled-components';
import theme from '../../theme';
import { motion } from 'framer-motion';

export const Container = styled.div<{ searchVisible: boolean }>`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: ${({ searchVisible }) =>
        searchVisible ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(255, 255, 255, 0)'};
    transition: all ease 150ms;
`;

export const Input = styled.input`
    outline: none;
    border: none;
    width: 100%;
    height: 100%;
    margin-left: 8px;
    background: none;
    color: ${theme.text.primary};
    font-size: 16px;
    font-weight: 500;
`;

export const IconButton = styled.button`
    display: flex;
    border: none;
    outline: none;
    height: 30px;
    width: 30px;
    border-radius: 4px;
    background: none;
    margin-left: auto;
    opacity: 0.4;
    color: ${theme.text.primary};
`;

export const CancelButton = styled(motion.button).attrs(() => ({
    initial: { opacity: 0, transform: 'translate(30px)' },
    animate: { opacity: 0.2, transform: 'translate(0px)', transition: { delay: 0.4 } },
}))`
    outline: none;
    border: none;
    background: none;
    color: ${theme.text.primary};
`;

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
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
        opacity: { duration: 0.2 },
    },
}))`
    display: flex;
    padding: 8px 16px;
    align-items: center;
    width: 100%;
    position: absolute;
`;
