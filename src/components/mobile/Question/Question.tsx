import React, {FunctionComponent} from 'react';
import {OptionSchema, QuestionType} from '../../../utils/ws';
import {ControlPanel} from '../ControlPanel/ControlPanel';
import './question.scss';

export interface QuestionProps {
    id: string;
    title: string;
    type: QuestionType;
    options: OptionSchema[];
}

export const Question: FunctionComponent<QuestionProps> =
    function Question({title, id, type, options}: QuestionProps) {
        return (
            <div className="question">
                <h3>{title}</h3>
                <ControlPanel
                    id={id}
                    type={type}
                    controls={options}
                />
            </div>
        );
    };
