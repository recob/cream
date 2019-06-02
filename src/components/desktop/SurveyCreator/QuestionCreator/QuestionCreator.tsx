import * as React from 'react';
import {Form, Input, Button, Icon} from 'antd';
import {OptionSchema, QuestionSchema} from '../../../../utils/ws';
import {QuestionOption} from './QuestionOption';

import './question-create.scss';

export interface QuestionCreatorProps {
    question: QuestionSchema;
    onUpdate: (question: QuestionSchema) => void;
    onRemove: (question: QuestionSchema) => void;
}

export const QuestionCreator: React.FC<QuestionCreatorProps> =
    function QuestionCreator({question, onUpdate, onRemove}: QuestionCreatorProps) {
        function addOption() {
            let updatedOptions = [...question.options, {
                id: `${Date.now()}`,
                value: '',
                right: false,
            }];

            onUpdate({
                ...question,
                options: updatedOptions,
            });
        }

        function updateOption(changedOption: OptionSchema) {
            let updatedOptions = question.options.map((option) => {
                return option.id === changedOption.id ? changedOption : option;
            });

            onUpdate({
                ...question,
                options: updatedOptions,
            });
        }

        function removeOption(removeOption: OptionSchema) {
            let filteredOptions = question.options.filter((option) => {
                return option.id !== removeOption.id;
            });

            onUpdate({
                ...question,
                options: filteredOptions,
            });
        }

        return (
            <div className="question-create">
                <div className="question-create__controls">
                    <Form.Item>
                    <Input
                        placeholder="Question Title"
                        value={question.title}
                        onChange={(event) => {
                            onUpdate({
                                ...question,
                                title: event.target.value,
                            });
                        }}

                        suffix={
                            <Icon
                                onClick={() => {onRemove(question); }}
                                type="close-circle"
                            />
                        }
                    />
                    </Form.Item>
                    <Form.Item>

                    <Button
                        onClick={() => {addOption(); }}
                    >
                        +
                    </Button>
                    </Form.Item>
                </div>
                {question.options.map((option) => (
                    <QuestionOption
                        key={option.id}
                        option={option}
                        onUpdate={updateOption}
                        onRemove={removeOption}
                    />
                ))}
            </div>
        );
    };
