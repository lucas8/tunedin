import styled from 'styled-components';
import theme from '../../theme';
import { motion } from 'framer-motion';

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

export const CancelButton = styled(motion.button).attrs(() => ({
    initial: { opacity: 0, transform: 'translate(30px)' },
    animate: { opacity: 0.2, transform: 'translate(0px)', transition: { delay: 0.4 } },
}))`
    outline: none;
    border: none;
    background: none;
    color: ${theme.text.primary};
`;
