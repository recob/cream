import * as React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import {fetchUser} from '../../../utils/api/fetchUser';
import {getHostData, getStorageUser} from '../../../utils/localStorage';
import {Button} from '../../shared/Button/Button';
import {Input} from '../../shared/Input/Input';

import './select-name.scss';

export interface SelectNameProps extends RouteComponentProps {

}

export const SelectName: React.FC<SelectNameProps> =
    function SelectName({}: SelectNameProps) {
        React.useEffect(() => {
            let savedUser = getStorageUser();

            if (savedUser) {
                navigate('/');
            }
        }, []);

        let [name, setName] = React.useState<string>('');

        async function postName() {
            let host = getHostData();

            if (host) {
                try {
                    let user = await fetchUser(host, name);
                    setName('');

                    if (user) {
                        navigate('/');
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

        function onFormSubmit(event: React.FormEvent) {
            event.preventDefault();

            postName();
        }

        return (
            <form onSubmit={onFormSubmit} className="select-name-wrap">
                <Input
                    autoFocus
                    className="select-name-wrap__input"
                    placeholder="Enter name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <Button
                    className="select-name-wrap__submit"
                    onClick={postName}
                >
                    Submit
                </Button>
            </form>
        );
    };
