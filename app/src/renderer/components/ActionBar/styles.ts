import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    initial: {
        y: '100%',
    },
    animate: {
        y: 0,
    },
};

export const Container = styled(motion.div).attrs(() => ({
    variants,
    initial: 'initial',
    animate: 'animate',
    transition: { delay: 0.1, ease: 'easeInOut', type: 'spring', stiffness: 100, damping: 30 },
}))`
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
`;

export const SolidButton = styled.button`
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    padding: 0 14px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    transition: 100ms ease all;
    box-shadow: none;

    :hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    :active {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(0px);
        box-shadow: none;
    }
`;
