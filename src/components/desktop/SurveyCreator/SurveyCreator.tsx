import {RouteComponentProps} from '@reach/router';
import * as React from 'react';
import {Form, Input, Button} from 'antd';
import {postSurvey} from '../../../utils/api/postSurvey';
import {QuestionSchema, QuestionType} from '../../../utils/ws';

import './survey-creator.scss';
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
                <Form layout="inline" onSubmit={createSurvey}>
                    <Form.Item>
                        <Input
                            placeholder="Survey Title"
                            onChange={(e) => {
                                setSurveyTitle(e.target.value);
                            }}
                            value={surveyTitle}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="Survey Thumb Link"
                            onChange={(e) => {
                                setSurveyThumb(e.target.value);
                            }}
                            value={surveyThumb}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => {
                            addQuestion();
                        }}>Add Question</Button>
                    </Form.Item>
                    {questions.map((question) => (
                        <QuestionCreator
                            key={question.id}
                            question={question}
                            onUpdate={updateQuestion}
                            onRemove={removeQuestion}
                        />
                    ))}

                    <Button onClick={createSurvey}>Create Survey</Button>
                </Form>
            </div>
        );
    };
