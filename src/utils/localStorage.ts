import {User} from './api/fetchUser';

export function setItem(key: string, value: any) {
    if (window.localStorage) {
        window.localStorage.setItem(key, value);
    }
}

export function getItem(key: string): any {
    if (window.localStorage) {
        return window.localStorage.getItem(key);
    }
}

const USER_KEY = 'user';

export function getStorageUser(): Optional<User> {
    try {
        return JSON.parse(getItem(USER_KEY));
    } catch (error) {
        console.error(error);
    }
}

export function setStorageUser(user: User) {
    setItem(USER_KEY, JSON.stringify(user));
}
