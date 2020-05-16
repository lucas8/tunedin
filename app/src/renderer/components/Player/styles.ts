import styled from 'styled-components';
import { motion } from 'framer-motion';
interface ContainerProps {
    isOpen: boolean;
    isPlaying: boolean;
    height: number;
}

export const Container = styled(motion.div).attrs(({ isOpen, isPlaying }: ContainerProps) => ({
    variants: {
        initial: {
            y: '100%',
        },
        small: {
            y: `calc(100% - ${isPlaying ? '70px' : '40px'})`,
        },
        big: {
            y: 0,
        },
    },
    initial: 'initial',
    animate: isOpen ? 'big' : 'small',
    transition: { ease: 'easeInOut', type: 'spring', stiffness: 200, damping: 30 },
}))<ContainerProps>`
    width: 100%;
    position: fixed;
    bottom: 0;
    height: ${({ height }) => height}px;
    z-index: 100;
    background: #2a2a2a95;
    backdrop-filter: blur(20px);
    border-radius: 5px 5px 0 0;
`;

interface PlayingContainerProps {
    isPlaying: boolean;
}

export const PlayingContainer = styled.div<PlayingContainerProps>`
    padding: ${({ isPlaying }) => (isPlaying ? '14px' : '8px')};
    width: 100%;
    height: ${({ isPlaying }) => (isPlaying ? '70px' : '40px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
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

interface ButtonProps {
    isOpen: boolean;
}

export const Button = styled(motion.button).attrs(({ isOpen }: ButtonProps) => ({
    variants: buttonVariants,
    animate: isOpen ? 'down' : 'up',
    transition: { ease: 'easeInOut', type: 'spring', stiffness: 200, damping: 30 },
}))<ButtonProps>`
    outline: none;
    border: none;
    background: none;
    color: rgba(255, 255, 255, 0.5);

    div {
        margin: auto;
    }
`;
