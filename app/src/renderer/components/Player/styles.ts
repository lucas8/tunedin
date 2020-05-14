import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    hidden: {
        y: 70,
    },
    shown: {
        y: 0,
    },
};

export const Container = styled(motion.div).attrs(() => ({
    variants,
    initial: 'hidden',
    animate: 'shown',
    transition: {
        y: { type: 'spring', stiffness: 300, damping: 200 },
    },
}))`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: #2a2a2a95;
    backdrop-filter: blur(20px);
    transition: all ease 150ms;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 14px;
`;

export const AlbumImage = styled.img`
    border-radius: 7px;
    object-fit: center;
    width: 45px;
    height: 45px;
`;

export const AlbumTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
`;

export const AlbumTitle = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;

export const AlbumArtist = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
`;
