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
        let currentHost = getHostData();

        React.useEffect(() => {
            let savedUser = getStorageUser();

            if (savedUser && currentHost) {
                navigate(`/${currentHost}`);
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
                        navigate(`/${currentHost}`);
                    } else {
                        navigate('/');
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }

        function onFormSubmit(event: React.FormEvent) {
            console.log(event);
            event.preventDefault();

            postName();
        }

        return (
            <form onSubmit={(event1) => event1.preventDefault()} className="select-name-wrap">
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
