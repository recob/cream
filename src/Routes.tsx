import * as React from 'react';
import {navigate, Router} from '@reach/router';
import {Dashboard} from './components/desktop/Dashboard/Dashboard';
import {SurveyCreator} from './components/desktop/SurveyCreator/SurveyCreator';
import {SurveysList} from './components/desktop/Surveys/SurveysList';
import {Remote} from './components/mobile/Remote/Remote';
import {SelectName} from './components/mobile/SelectName/SelectName';
import {App} from './components/shared/App/App';
import {Survey} from './components/shared/Survey/Survey';

export interface RoutesProps {

}

export const Routes: React.FC<RoutesProps> =
    function Routes({}: RoutesProps) {
        return (
            <React.Fragment>
                <ul className="nav-menu">
                    <li><a className="nav-menu__item" href="#" onClick={(event) => {
                        event.preventDefault();
                        navigate('/create');
                    }}>+</a></li>
                    <li><a className="nav-menu__item" href="#" onClick={(event) => {
                        event.preventDefault();
                        navigate('/surveys');
                    }}>≡</a></li>
                    <li><a className="nav-menu__item" href="#" onClick={(event) => {
                        event.preventDefault();
                        navigate('/remote/presentation');
                    }}>▶</a></li>
                </ul>
                <Router
                    className="page"
                >
                    <App path="/" />
                    <Survey path="/:host" />
                    <SelectName path="/name" />
                    <SurveyCreator path="/create" />
                    <SurveysList path="/surveys" />
                    <Dashboard path="/surveys/:id" />
                    <Remote path="/remote/:name" />
                </Router>
            </React.Fragment>
        );
    };
