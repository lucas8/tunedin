import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    initial: {
        y: '100%',
    },
    small: {
        y: 'calc(100% - 70px)',
    },
    big: {
        y: 30,
    },
};

interface ContainerProps {
    isOpen: boolean;
}

export const Container = styled(motion.div).attrs(({ isOpen }: ContainerProps) => ({
    variants,
    initial: 'initial',
    animate: isOpen ? 'big' : 'small',
    transition: { type: 'spring', stiffness: 200, damping: 30 },
}))<ContainerProps>`
    width: 100%;
    position: fixed;
    height: 100%;
    z-index: 100;
    background: #2a2a2a95;
    backdrop-filter: blur(20px);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 5px 5px 0 0;
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
