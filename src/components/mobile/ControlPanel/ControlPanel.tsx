import React from 'react';
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
    readOnly?: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({id, type, controls, readOnly}: ControlPanelProps) => {
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
            <div
                className="control-panel__controls"
                style={{gridTemplateRows: `repeat(${Math.ceil(controls.length / 2)}, 1fr)`}}
            >
                {controls.map((control) => (
                    <Button
                        key={control.id}
                        onClick={() => {
                            if (!readOnly) {
                                setSelectedItems(control.id);
                            }
                        }}

                        light={!readOnly ? !selected[control.id] : control.userAnswer}

                        green={control.right && control.userAnswer}

                        red={control.right || control.userAnswer}
                    >
                        {control.value}
                    </Button>
                ))}
            </div>
            {!readOnly &&
                <Button
                    className="control-panel__submit"
                    onClick={() => {
                        if (!readOnly) {
                            testSocketConnect.sendAnswer(id, Object.keys(selected));
                        }
                    }}
                    main
                >
                    Next
                </Button>
            }
        </div>
    );
};
