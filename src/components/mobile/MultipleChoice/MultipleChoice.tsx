import React, {FunctionComponent, useState} from "react";
import {Button} from "../Button/Button";
import {Control} from "../../shared/App/App";

export interface MultipleChoiceProps {
    controls: Control[];
}

export const MultipleChoice: FunctionComponent<MultipleChoiceProps> =
    function MultipleChoice({controls}: MultipleChoiceProps) {

        const [selectedControls, setSelected] = useState<{[key: string]: boolean;}>({});

        return (
            <>
                {controls.map(control => (
                    <Button
                        key={control.id}
                        onClick={(event: React.SyntheticEvent) => {
                            setSelected({
                                ...selectedControls,
                                [control.id]: !selectedControls[control.id],
                            });
                        }}
                        selected={selectedControls[control.id]}
                    >
                        {control.title}
                    </Button>
                ))}
            </>
        );
    };