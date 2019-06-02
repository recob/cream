import {fetchData} from '../fetchData';
import {StartOptions} from './createSurvey';

export async function postStop({host, port}: StartOptions): Promise<any> {
    return fetchData(`${host}:${port}`, `/survey/stop`, {useHttp: true});
}
