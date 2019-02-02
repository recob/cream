import React, {FunctionComponent} from 'react';
import {MultipleChoice, MultipleChoiceProps} from "../MultipleChoice/MultipleChoice";
import {SingleChoice} from "../SingleChoice/SingleChoice";

import './control-panel.scss';

export enum ControlPanelType {
    MULTIPLE = 'multiple',
    SINGLE = 'multiple',
}

export interface ControlPanelProps extends MultipleChoiceProps {
    type: ControlPanelType;
}

export const ControlPanel: FunctionComponent<ControlPanelProps> =
    function ControlPanel({type, ...props}: ControlPanelProps) {
        return (
            <div className="control-panel">
                {type === ControlPanelType.MULTIPLE && (
                    <MultipleChoice {...props} />
                )}
                {type === ControlPanelType.SINGLE && (
                    <SingleChoice {...props} />
                )}
            </div>
        );
    };