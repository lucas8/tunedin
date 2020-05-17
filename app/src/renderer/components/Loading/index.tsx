import React from 'react';
import { ProviderProps } from '../../contexts';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';

export default function Loading({ children }: ProviderProps) {
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    });

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <S.MotionContainer>
                        <S.LoadingContainer>
                            <h1>Loading...</h1>
                        </S.LoadingContainer>
                    </S.MotionContainer>
                )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
                {!isLoading && <S.MotionContainer>{children}</S.MotionContainer>}
            </AnimatePresence>
        </>
    );
}
