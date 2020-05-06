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
