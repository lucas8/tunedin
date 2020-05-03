import React from 'react';
import Providers from './components/Providers';
import Router from './Router';

export default function App() {
    return (
        <Providers>
            <Router />
        </Providers>
    );
}
