import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function Router() {
    return (
        <HashRouter>
            <div>
                <Route path="/" exact component={Home} />
            </div>
        </HashRouter>
    );
}
