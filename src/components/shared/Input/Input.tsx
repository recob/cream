import * as React from 'react';
import classnames from 'classnames';

import './input.scss';

export interface InputProps {
    className?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    checked?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    autoFocus?: boolean;
}

export const Input: React.FC<InputProps> =
    function Input({className, placeholder, value, onChange, autoFocus, type = 'text'}: InputProps) {
        return (
            <div className="input-wrap">
                <input
                    autoFocus={autoFocus}
                    type={type}
                    className={classnames('input', className)}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <hr className="input__underline"/>
            </div>
        );
    };
