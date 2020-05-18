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
