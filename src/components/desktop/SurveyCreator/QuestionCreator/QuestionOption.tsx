import * as React from 'react';
import {Form, Input, Icon} from 'antd';
import {OptionSchema} from '../../../../utils/ws';

export interface QuestionOptionProps {
    option: OptionSchema;
    onRemove: (option: OptionSchema) => void;
    onUpdate: (option: OptionSchema) => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> =
    function QuestionOption({option, onRemove, onUpdate}: QuestionOptionProps) {
        return (
            <div>
                <div className="control-row">
                    <Input
                        addonBefore={
                            <Icon
                                type={option.right ? 'check-circle' : 'close-circle'}
                                theme="twoTone"
                                twoToneColor={option.right ? '#52c41a' : '#eb2f96'}
                                onClick={() => {
                                    onUpdate({
                                        ...option,
                                        right: !option.right,
                                    });
                                }}
                            />
                        }
                        suffix={
                            <Icon
                                onClick={() => {onRemove(option); }}
                                type="close-circle"
                            />
                        }
                        placeholder={`Option Value`}
                        value={option.value}
                        onChange={(event) => {
                            onUpdate({
                                ...option,
                                value: event.target.value,
                            });
                        }}
                    />
                </div>
            </div>
        );
    };
