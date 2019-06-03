import * as React from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {clearLocalstorage, getHostData, getStorageUser, setHostData} from '../../../utils/localStorage';
import {testSocketConnect, QuestionSchema, DoneSchema} from '../../../utils/ws';
import {FinishPanel} from '../../mobile/FinishPanel/FinishPanel';
import {Question} from '../../mobile/Question/Question';

export interface AppProps extends RouteComponentProps {
    host?: string;
}

export const Survey: React.FC<AppProps> = (props: AppProps) => {

    let [question, setQuestion] = React.useState<QuestionSchema | undefined>(undefined);

    let [isFinished, setFinished] = React.useState<boolean>(false);

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

        testSocketConnect.onMessage((question: QuestionSchema | DoneSchema) => {
            if ((question as DoneSchema).done) {
                setFinished(true);
            }

            setQuestion(question as QuestionSchema);
        });

        testSocketConnect.onClose(() => {
            setFinished(true);
        });
    }, []);

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
