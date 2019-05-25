import {fetchApi} from '../fetchData';
import {setStorageUser} from '../localStorage';

export interface User {
    id: string;
    name: string;
    username: string;
}

export async function fetchUser(name: string): Promise<Optional<User>> {
    try {
        let user = await fetchApi(`/auth?name=${name}`);

        setStorageUser(user);

        return user;
    } catch (error) {
        throw error;
    }
}
