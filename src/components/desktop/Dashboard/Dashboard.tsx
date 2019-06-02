import {RouteComponentProps} from '@reach/router';
import {Button} from 'antd';
import * as React from 'react';
import QRCode from 'qrcode.react';
import {CircularProgressbar} from 'react-circular-progressbar';
import {createSurvey, StartOptions} from '../../../utils/api/createSurvey';
import {postStart} from '../../../utils/api/postStart';
import {postStop} from '../../../utils/api/postStop';
import {getTestLink} from '../../../utils/getTestLink';
import {dashboardSocketConnect, SurveySchema} from '../../../utils/ws';
import './dahsboard.scss';

export interface DashboardProps extends RouteComponentProps {
    id?: string;
}

interface SurveyStats {
    connected: number;
    finished: number;
}

export const Dashboard: React.FC<DashboardProps> =
    function Dashboard({id}: DashboardProps) {
        let [surveyStat, setSurveyStat] = React.useState<SurveyStats>({
            connected: 0,
            finished: 0,
        });

        let [survey, setSurvey] = React.useState<Optional<SurveySchema>>(undefined);
        let [connectData, setConnectData] = React.useState<Optional<StartOptions>>(undefined);

        async function connect() {
            if (id) {
                let response = await createSurvey(id);

                setConnectData(response);

                dashboardSocketConnect.connect(response.host, response.port);

                dashboardSocketConnect.onMessage((stat: SurveyStats) => {
                    setSurveyStat(stat);
                });
            }
        }

        async function startSurvey() {
            if (connectData) {
                let {survey} = await postStart(connectData);

                setSurvey(survey);
            }
        }

        React.useEffect(() => {
            connect();
        }, []);

        if (!connectData) {
            return <React.Fragment>loading</React.Fragment>;
        }

        let progress = surveyStat.finished / surveyStat.connected * 100;

        if (!survey) {
            return (
                <div className="dashboard">
                    <div className="dashboard__qr">
                    <QRCode
                        value={getTestLink(connectData.host, connectData.port)}
                        size={480}
                        level="L"
                        renderAs="svg"
                    />
                    </div>
                    <div>
                        <a
                            href={getTestLink(connectData.host, connectData.port)}
                            target="_blank"
                        >
                            {getTestLink(connectData.host, connectData.port)}
                        </a>
                    </div>
                    <Button
                        onClick={startSurvey}
                    >
                        Start
                    </Button>
                </div>
            );
        }

        return (
            <div className="dashboard">
                <CircularProgressbar value={progress || 0} text={`${surveyStat.finished}/${surveyStat.connected}`} />

                <Button
                    onClick={() => {postStop(connectData as StartOptions); }}
                >
                    Stop
                </Button>
            </div>
        );
    };
