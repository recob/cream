import React, {FunctionComponent} from 'react';
import {ControlPanel, ControlPanelType} from "../ControlPanel/ControlPanel";
import {Control} from "../../shared/App/App";
import {Button} from "../Button/Button";

export interface QuestionProps {
    title: string;
    type: ControlPanelType;
    controls: Control[];
}

export const Question: FunctionComponent<QuestionProps> =
    function Question({title, type, controls}: QuestionProps) {
        return (
            <div>
                <h3>{title}</h3>
                <ControlPanel type={type} controls={controls} />
            </div>
        );
    };