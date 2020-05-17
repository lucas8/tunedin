import React from 'react';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';
import { usePlayerState } from '../../contexts/PlayerContext';
import CreateJoin from '../CreateJoin';

const pages = [
    {
        name: 'createjoin',
        component: <CreateJoin />,
    },
    { name: 'create', component: <div style={{ background: 'red' }}>hello world</div> },
];

export default function InnerPlayer() {
    const { view, isOpen } = usePlayerState();
    console.log(view);

    return (
        <AnimatePresence>
            {isOpen && (
                <S.Wrapper>
                    {pages.map(({ name, component }) => (
                        <AnimatePresence key={name} initial={false}>
                            {view == name && <S.Container custom={1}>{component}</S.Container>}
                        </AnimatePresence>
                    ))}
                </S.Wrapper>
            )}
        </AnimatePresence>
    );
}
