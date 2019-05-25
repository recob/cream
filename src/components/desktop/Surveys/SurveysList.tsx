import * as React from 'react';
import {RouteComponentProps} from '@reach/router';
import {fetchSurveys} from '../../../utils/api/fetchSurveys';
import {SurveySchema} from '../../../utils/ws';
import {Survey} from './Survey/Survey';

import './surveys-list.scss';

export interface SurveysListProps extends RouteComponentProps {

}

export const SurveysList: React.FC<SurveysListProps> =
    function Surveys({}: SurveysListProps) {

        let [surveys, setSurveys] = React.useState<SurveySchema[]>([]);

        async function loadSurveys() {
            try {
                let surveys = await fetchSurveys();

                setSurveys(surveys);
            } catch (e) {
                console.log(e);
            }
        }

        React.useEffect(() => {
            loadSurveys();
        }, []);

        return (
            <div className="surveys-list">
                {surveys && surveys.map((survey) => (
                    <Survey
                        key={survey.id}
                        {...survey}
                    />
                ))}
            </div>
        );
    };
