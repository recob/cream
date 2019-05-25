import {postData} from '../fetchData';
import {SurveySchema} from '../ws';
import {User} from './fetchUser';

export interface StartOptions {
    users: User[];
    survey: SurveySchema;
}

export async function postStart(): Promise<StartOptions> {
    return postData(`/survey/start`);
}
