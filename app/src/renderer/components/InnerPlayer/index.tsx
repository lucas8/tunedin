import React from 'react';
import * as S from './styles';
import { AnimatePresence } from 'framer-motion';
import { usePlayerState } from '../../contexts/PlayerContext';
import CreateJoin from '../CreateJoin';

const pages = [
    {
        name: 'createjoin',
        component: <CreateJoin />,
        secondary: false,
    },
    { name: 'create', component: <div style={{ background: 'red' }}>hello world</div>, secondary: true },
];

export default function InnerPlayer() {
    const { isOpen, view } = usePlayerState();
    console.log(view);

    return (
        <AnimatePresence>
            {isOpen && (
                <S.Wrapper>
                    {pages.map(({ name, component, secondary }) => (
                        <AnimatePresence key={name} initial={false}>
                            {view == name && <S.Container custom={secondary ? -1 : 1}>{component}</S.Container>}
                        </AnimatePresence>
                    ))}
                </S.Wrapper>
            )}
        </AnimatePresence>
    );
}
