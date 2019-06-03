import {fetchData} from '../fetchData';
import {setStorageUser} from '../localStorage';

export interface User {
    id: string;
    name: string;
    username: string;
}

export async function fetchUser(host: string, name: string): Promise<Optional<User>> {
    try {
        let user = await fetchData(host, `/auth?name=${name}`);

        setStorageUser(user);

        return user;
    } catch (error) {
        throw error;
    }
}
