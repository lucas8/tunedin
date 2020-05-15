import styled from 'styled-components';
import { motion } from 'framer-motion';

const variants = {
    initial: {
        y: 'calc(100% + 70px)',
    },
    small: {
        y: '100%',
    },
    big: {
        y: 70,
    },
};

// TODO: Besiar curve

interface ContainerProps {
    isOpen: boolean;
}

export const Container = styled(motion.div).attrs(({ isOpen }: ContainerProps) => ({
    variants,
    initial: 'initial',
    animate: isOpen ? 'big' : 'small',
    transition: { ease: 'easeInOut', type: 'spring', stiffness: 200, damping: 30 },
}))<ContainerProps>`
    width: 100%;
    position: fixed;
    height: calc(100% - 70px);
    z-index: 100;
    background: #2a2a2a95;
    backdrop-filter: blur(20px);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
    padding: 14px;
`;

export const AlbumContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-width: 0;
`;

export const AlbumImage = styled.img`
    border-radius: 7px;
    object-fit: cover;
    width: 45px;
    height: 45px;
    min-width: 45px;
`;

export const AlbumTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
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

const buttonVariants = {
    up: { rotate: 0 },
    down: {
        rotate: 180,
    },
};

export const Button = styled(motion.button).attrs(({ isOpen }: ContainerProps) => ({
    variants: buttonVariants,
    animate: isOpen ? 'down' : 'up',
    transition: { ease: 'easeInOut', type: 'spring', stiffness: 200, damping: 30 },
}))<ContainerProps>`
    outline: none;
    border: none;
    background: none;
    width: 32px;
    height: 32px;
    color: rgba(255, 255, 255, 0.5);

    div {
        margin: auto;
    }
`;
