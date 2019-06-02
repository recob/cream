import {fetchData} from '../fetchData';
import {SurveySchema} from '../ws';
import {StartOptions} from './createSurvey';
import {User} from './fetchUser';

export interface SurveyStartOptions {
    users: User[];
    survey: SurveySchema;
}

export async function postStart({host, port}: StartOptions): Promise<SurveyStartOptions> {
    return fetchData(`${host}:${port}`, `/survey/start`, {useHttp: true});
}
