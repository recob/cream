import {fetchApi} from '../fetchData';
import {SurveySchema} from '../ws';

export function fetchSurveys(): Promise<SurveySchema[]> {
    return fetchApi('/surveys');
}
