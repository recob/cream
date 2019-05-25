import {RouteComponentProps} from '@reach/router';
import * as React from 'react';
import {postSurvey} from '../../../utils/api/postSurvey';
import {QuestionSchema, QuestionType} from '../../../utils/ws';

import './survey-creator.scss';
import {Button} from '../../shared/Button/Button';
import {Input} from '../../shared/Input/Input';
import {QuestionCreator} from './QuestionCreator/QuestionCreator';

export interface SurveyCreatorProps extends RouteComponentProps {

}

export const SurveyCreator: React.FC<SurveyCreatorProps> =
    function SurveyCreator({}: SurveyCreatorProps) {

        let [surveyTitle, setSurveyTitle] = React.useState<string>('');
        let [surveyThumb, setSurveyThumb] = React.useState<string>('');
        let [questions, setQuestions] = React.useState<QuestionSchema[]>([]);

        function addQuestion() {
            setQuestions([...questions, {
                id: `${Date.now()}`,
                title: '',
                type: QuestionType.SINGLE,
                options: [],
            }]);
        }

        function updateQuestion(changedQuestion: QuestionSchema) {
            setQuestions(questions.map((question) => {
                return question.id === changedQuestion.id ? changedQuestion : question;
            }));
        }

        function removeQuestion(removeQuestion: QuestionSchema) {
            let filteredQuestions = questions.filter((question) => {
                return question.id !== removeQuestion.id;
            });

            setQuestions(filteredQuestions);
        }

        function createSurvey() {
            postSurvey(surveyTitle, questions, surveyThumb);
        }

        return (
            <div className="survey-creator">
                <Input
                    placeholder="Survey Title"
                    onChange={(e) => {setSurveyTitle(e.target.value); }}
                    value={surveyTitle}
                />
                <Input
                    placeholder="Survey Thumb"
                    onChange={(e) => {setSurveyThumb(e.target.value); }}
                    value={surveyThumb}
                />
                <Button onClick={() => {addQuestion(); }}>Add Question</Button>
                {questions.map((question) => (
                    <QuestionCreator
                        key={question.id}
                        question={question}
                        onUpdate={updateQuestion}
                        onRemove={removeQuestion}
                    />
                ))}

                <Button onClick={createSurvey}>Create Survey</Button>
            </div>
        );
    };
