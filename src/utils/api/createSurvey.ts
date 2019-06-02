import {fetchApi} from '../fetchData';

export interface StartOptions {
    host: string;
    port: number | string;
}

export async function createSurvey(id: string): Promise<StartOptions> {
    return fetchApi(`/surveys/${id}/start`);
}
