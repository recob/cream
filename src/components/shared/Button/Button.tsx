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
    green?: boolean;
    red?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> =
    function Button({className, children, onClick, light, main, disabled, green, red}: ButtonProps) {
        return (
            <button
                className={classnames('button', className, {
                    'button_light': light,
                    'button_disabled': disabled,
                    'button_main': main,
                    'button_green': green,
                    'button_red': red,
                })}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        );
    };
