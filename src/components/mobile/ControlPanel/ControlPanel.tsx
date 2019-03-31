import React from 'react';
import {OptionSchema, QuestionType, sendAnswer} from '../../../utils/ws';
import {Button} from '../Button/Button';

import './control-panel.scss';

export interface SelectedOptions {
    [key: string]: boolean;
}

export interface ControlPanelProps {
    id: number;
    type: QuestionType;
    controls: OptionSchema[];
}

export const ControlPanel: React.FC<ControlPanelProps> = ({id, type, controls}: ControlPanelProps) => {
    let [selected, setSelected] = React.useState<SelectedOptions>({});

    function setSelectedItems(selectedId: string) {
        if (type === QuestionType.MULTIPLE) {
            setSelected({
                ...selected,
                [selectedId]: !selected[selectedId],
            });
        }

        if (type === QuestionType.SINGLE) {
            setSelected({
                [selectedId]: !selected[selectedId],
            });
        }
    }

    return (
        <div className="control-panel">
            {controls.map((control) => (
                <Button
                    key={control.id}
                    onClick={() => {
                        setSelectedItems(control.id);
                    }}
                    light={!selected[control.id]}
                >
                    {control.value}
                </Button>
            ))}
            <Button
                onClick={() => {
                    sendAnswer(id, Object.keys(selected)[0]);
                }}
                main
            >
                Next
            </Button>
        </div>
    );
};
