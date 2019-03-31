import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './button.scss';

export interface ButtonProps {
    children: ReactNode;
    onClick?: (event: React.SyntheticEvent) => any;
    light?: boolean;
    className?: string;
    main?: boolean;
    disabled?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> =
    function Button({children, onClick, light, main, disabled}: ButtonProps) {
        let className = classnames('button', {
            'button_light': light,
            'button_disabled': disabled,
            'button_main': main,
        });
        return (
            <button
                className={className}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        );
    };
