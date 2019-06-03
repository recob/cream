import {navigate, RouteComponentProps} from '@reach/router';
import * as React from 'react';
import {Button} from '../Button/Button';

export interface AppProps extends RouteComponentProps {

}

export const App: React.FC<AppProps> =
    function App({}: AppProps) {
        return (
            <div className="app">
                <h1>Welcome to recob app!</h1>
                <p>To create your presentation press button below.</p>
                <Button onClick={() => {
                    navigate('create');
                }}>Create Survey</Button>
            </div>
        );
    };
