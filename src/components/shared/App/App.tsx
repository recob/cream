import * as React from 'react';
import {onClose, onMessage, QuestionSchema} from '../../../utils/ws';
import {FinishPanel} from '../../mobile/FinishPanel/FinishPanel';
import {Question} from '../../mobile/Question/Question';

export interface AppProps {

}

export const App: React.FC<AppProps> = (props: AppProps) => {

    let [question, setQuestion] = React.useState<QuestionSchema | undefined>(undefined);

    let [isFinished, setFinished] = React.useState<boolean>(false);

    React.useEffect(() => {
        onMessage((question: QuestionSchema) => {
            setQuestion(question);
            console.log(question);
        });

        onClose(() => {
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
                            id={question.questionId}
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
