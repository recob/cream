import * as React from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {clearLocalstorage, getHostData, getStorageUser, setHostData} from '../../../utils/localStorage';
import {testSocketConnect, QuestionSchema, DoneSchema, SurveySchema} from '../../../utils/ws';
import {ControlPanel} from '../../mobile/ControlPanel/ControlPanel';
import {FinishPanel} from '../../mobile/FinishPanel/FinishPanel';
import {Question} from '../../mobile/Question/Question';

export interface AppProps extends RouteComponentProps {
    host?: string;
}

export const Survey: React.FC<AppProps> = (props: AppProps) => {

    let [question, setQuestion] = React.useState<Optional<QuestionSchema>>(undefined);

    let [isFinished, setFinished] = React.useState<boolean>(false);

    let [survey, setSurvey] = React.useState<Optional<SurveySchema>>(undefined);

    React.useEffect(() => {
        let {host} = props;
        let currentHost = getHostData();

        if (host && host !== currentHost) {
            clearLocalstorage();
            currentHost = host;
            setHostData(host);
        }

        let savedUser = getStorageUser();
        if (savedUser) {
            if (!currentHost) {
                clearLocalstorage();

                return;
            }
            testSocketConnect.connect(currentHost, savedUser.id, savedUser.name);
        } else {
            if (host) {
                navigate('/name');
            }
        }

        testSocketConnect.onMessage((question: QuestionSchema | DoneSchema | SurveySchema) => {
            if ((question as DoneSchema).done) {
                setFinished(true);
            }

            if ((question as SurveySchema).questions) {
                setSurvey(question as SurveySchema);
            }

            setQuestion(question as QuestionSchema);
        });

        testSocketConnect.onClose(() => {
            setFinished(true);
        });
    }, []);


    if (survey) {
        return (
            <div className="done-question">
            <h3>{survey.title}</h3>
            {survey.questions.map((question: QuestionSchema) => (
                <React.Fragment>
                    <h4>{question.title}</h4>
                    <ControlPanel
                        readOnly
                        id={question.id}
                        type={question.type}
                        controls={question.options}
                    />
                </React.Fragment>
            ))}
            </div>
        );
    }

    if (isFinished) {
        return <FinishPanel />;
    }

    return (
        <div className="main-wrapper">
            {
                question
                    ? (
                        <Question
                            id={question.id}
                            title={question.title}
                            type={question.type}
                            options={question.options}
                        />
                    )
                    : 'Wait, please...'
            }
        </div>
    );
};
