import React, {FunctionComponent, useState} from "react";
import {Button} from "../Button/Button";
import {Control} from "../../shared/App/App";

export interface SingleChoiceProps {
    controls: Control[];
}

export const SingleChoice: FunctionComponent<SingleChoiceProps> =
    function MultipleChoice({controls}: SingleChoiceProps) {

        const [selectedId, setSelected] = useState<string | undefined>(undefined);

        return (
            <>
                {controls.map(control => (
                    <Button
                        key={control.id}
                        onClick={(event: React.SyntheticEvent) => {
                            setSelected(control.id);
                        }}
                        selected={selectedId === control.id}
                    >
                        {control.title}
                    </Button>
                ))}
            </>
        );
    };