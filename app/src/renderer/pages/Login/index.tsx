import React from 'react';
import * as S from './styles';
import { ipcRenderer } from 'electron';
import { Icon } from '../../components/Icon';
import ScrollingBackground from '../../components/ScrollingBackground';

export default function Login() {
    const onButtonClick = () => {
        ipcRenderer.send('login');
    };
    return (
        <S.Container>
            <ScrollingBackground />
            <S.Wrapper>
                <S.Title>Login</S.Title>
                <S.Button onClick={onButtonClick}>
                    <Icon glyph="spotify" size={20} />
                    <span>Continue with Spotify</span>
                </S.Button>
            </S.Wrapper>
        </S.Container>
    );
}
