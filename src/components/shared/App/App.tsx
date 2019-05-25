import * as React from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {getStorageUser} from '../../../utils/localStorage';
import {testSocketConnect, QuestionSchema, DoneSchema} from '../../../utils/ws';
import {FinishPanel} from '../../mobile/FinishPanel/FinishPanel';
import {Question} from '../../mobile/Question/Question';

export interface AppProps extends RouteComponentProps {

}

export const App: React.FC<AppProps> = (props: AppProps) => {

    let [question, setQuestion] = React.useState<QuestionSchema | undefined>(undefined);

    let [isFinished, setFinished] = React.useState<boolean>(false);

    React.useEffect(() => {
        let savedUser = getStorageUser();
        if (savedUser) {
            testSocketConnect.connect(savedUser.id, savedUser.name);
        } else {
            navigate('/name');
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
        return <FinishPanel/>;
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
