import React, {ReactNode} from 'react';
import classnames from 'classnames';

import './button.scss';

export interface ButtonProps {
    children: ReactNode;
    onClick?: (event: React.SyntheticEvent) => any;
    selected?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> =
    function Button({children, onClick, selected}: ButtonProps) {
        let className = classnames('button', {
            'button_selected': selected,
        });
        return (
            <button className={className} onClick={onClick}>
                {children}
            </button>
        );
    };