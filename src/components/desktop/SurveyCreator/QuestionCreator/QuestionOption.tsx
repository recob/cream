import * as React from 'react';
import {OptionSchema} from '../../../../utils/ws';
import {Button} from '../../../shared/Button/Button';
import {Input} from '../../../shared/Input/Input';

export interface QuestionOptionProps {
    option: OptionSchema;
    onRemove: (option: OptionSchema) => void;
    onUpdate: (option: OptionSchema) => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> =
    function QuestionOption({option, onRemove, onUpdate}: QuestionOptionProps) {
        return (
            <div>
                <Input
                    type="checkbox"
                    checked={option.right}
                    onChange={(event) => {
                        onUpdate({
                            ...option,
                            right: event.target.checked,
                        });
                    }}
                />
                <Input
                    placeholder={`Option Value`}
                    value={option.value}
                    onChange={(event) => {
                        onUpdate({
                            ...option,
                            value: event.target.value,
                        });
                    }}
                />
                <Button onClick={() => {onRemove(option); }}>X</Button>
            </div>
        );
    };
