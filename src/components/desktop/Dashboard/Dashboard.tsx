import {RouteComponentProps} from '@reach/router';
import * as React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import {postStart} from '../../../utils/api/postStart';
import {dashboardSocketConnect, SurveySchema} from '../../../utils/ws';
import './dahsboard.scss';

export interface DashboardProps extends RouteComponentProps {

}

interface SurveyStats {
    connected: number;
    finished: number;
}

export const Dashboard: React.FC<DashboardProps> =
    function Dashboard({}: DashboardProps) {

        let [surveyStat, setSurveyStat] = React.useState<SurveyStats>({
            connected: 0,
            finished: 0,
        });

        let [survey, setSurvey] = React.useState<Optional<SurveySchema>>(undefined);

        async function connect() {
            let response = await postStart();
            setSurvey(response.survey);

            dashboardSocketConnect.connect();

            dashboardSocketConnect.onMessage((stat: SurveyStats) => {
                setSurveyStat(stat);
            });
        }

        React.useEffect(() => {
            connect();
        }, []);

        let progress = surveyStat.finished / surveyStat.connected * 100;

        return (
            <div>
                <h1>{survey && survey.title}</h1>
                <CircularProgressbar value={progress || 0} text={`${surveyStat.finished}/${surveyStat.connected}`} />
            </div>
        );
    };
