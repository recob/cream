import {RouteComponentProps} from '@reach/router';
import * as React from 'react';
import {RemoteDirection, remoteSocketConnect} from '../../../utils/ws';
import {Button} from '../../shared/Button/Button';

import './remote.scss';

export interface RemoteProps extends RouteComponentProps {
    name?: string;
}

export const Remote: React.FC<RemoteProps> =
    function Remote({name}: RemoteProps) {
        React.useEffect(() => {
            if (name) {
                remoteSocketConnect.connect(name);
            }
        }, []);

        return (
            <div className="remote">
                <Button
                    className="remote__up"
                    onClick={() => {
                        remoteSocketConnect.sendAnswer(RemoteDirection.UP);
                    }}
                >
                    UP
                </Button>
                <Button
                    className="remote__down"
                    onClick={() => {
                        remoteSocketConnect.sendAnswer(RemoteDirection.DOWN);
                    }}
                >
                    DOWN
                </Button>
                <Button
                    className="remote__right"
                    onClick={() => {
                        remoteSocketConnect.sendAnswer(RemoteDirection.RIGHT);
                    }}
                >
                    RIGHT
                </Button>
                <Button
                    className="remote__left"
                    onClick={() => {
                        remoteSocketConnect.sendAnswer(RemoteDirection.LEFT);
                    }}
                >
                    LEFT
                </Button>
            </div>
        );
    };
