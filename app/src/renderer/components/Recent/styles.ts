import styled from 'styled-components';
import theme from '../../theme';

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

export const RecentTrackContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    margin: 0 auto;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-auto-rows: minmax(150px, 150px);
    grid-gap: 8px;
    padding: 4px 8px;
    margin-top: 60px;
    z-index: 10;
`;

export const RecentTrack = styled.div<{ image: string }>`
    background-image: url('${(props) => props.image}');
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 7px;
`;

export const BackgroundImage = styled.div<{ image?: string }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 300px;
    z-index: 2;
    object-fit: cover;
    ${({ image }) => image && `background: url('${image}') center center no-repeat;`}
    background-size: cover;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(17, 17, 17, 0.4) 0%, #111111 100%);
    }
`;
