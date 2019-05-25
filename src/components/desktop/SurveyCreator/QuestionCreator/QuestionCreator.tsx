import * as React from 'react';
import {OptionSchema, QuestionSchema} from '../../../../utils/ws';
import {Button} from '../../../shared/Button/Button';
import {Input} from '../../../shared/Input/Input';
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
                <Input
                    placeholder="Question Title"
                    value={question.title}
                    onChange={(event) => {
                        onUpdate({
                            ...question,
                            title: event.target.value,
                        });
                    }}
                />
                <Button onClick={() => {addOption(); }}>Add Option</Button>
                {question.options.map((option) => (
                    <QuestionOption
                        key={option.id}
                        option={option}
                        onUpdate={updateOption}
                        onRemove={removeOption}
                    />
                ))}
                <Button onClick={() => {onRemove(question); }}>Remove Question</Button>
            </div>
        );
    };
