import * as React from 'react';
import {Router} from '@reach/router';
import {Dashboard} from './components/desktop/Dashboard/Dashboard';
import {SurveyCreator} from './components/desktop/SurveyCreator/SurveyCreator';
import {SurveysList} from './components/desktop/Surveys/SurveysList';
import {Remote} from './components/mobile/Remote/Remote';
import {SelectName} from './components/mobile/SelectName/SelectName';
import {App} from './components/shared/App/App';

export interface RoutesProps {

}

export const Routes: React.FC<RoutesProps> =
    function Routes({}: RoutesProps) {
        return (
            <Router
                className="page"
            >
                <App path="/" />
                <App path="/:host" />
                <SelectName path="/name" />
                <SurveyCreator path="/create" />
                <SurveysList path="/surveys" />
                <Dashboard path="/surveys/:id" />
                <Remote path="/remote/:name" />
            </Router>
        );
    };
