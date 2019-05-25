import React from 'react';
import classnames from 'classnames';
import {OptionSchema, QuestionType, testSocketConnect} from '../../../utils/ws';
import {Button} from '../../shared/Button/Button';

import './control-panel.scss';

export interface SelectedOptions {
    [key: string]: boolean;
}

export interface ControlPanelProps {
    id: string;
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

    console.log(id);
    return (
        <div className="control-panel">
            <div
                className="control-panel__controls"
                style={{gridTemplateRows: `repeat(${Math.ceil(controls.length / 2)}, 1fr)`}}
            >
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
            </div>
                <Button
                    className="control-panel__submit"
                    onClick={() => {
                        testSocketConnect.sendAnswer(id, Object.keys(selected));
                    }}
                    main
                >
                    Next
                </Button>
        </div>
    );
};
