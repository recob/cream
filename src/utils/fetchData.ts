interface FetchApiConfig {
    method?: 'GET' | 'POST' | 'PATCH';
    body?: Dict<any>;
    headers?: Dict<any>;
    useHttp?: boolean
}

export async function fetchData(
    host: string,
    url: string,
    {method = 'GET', body, headers, useHttp, ...config}: FetchApiConfig = {},
) {
    headers = {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    let fetchConfig = {
        method,
        body: method === 'GET' ? undefined : JSON.stringify(body),
        headers: new Headers(headers),
        mode: 'cors' as any,
        credential: 'include',
        ...config,
    };

    let response: Response = await fetch(`${useHttp ? 'http' : 'https'}://${host}${url}`, fetchConfig);

    if (response.ok) {
        return response.json();
    }

    throw new Error('Something went wrong');
}

export async function fetchApi(url: string, fetchConfig: FetchApiConfig = {}) {
    return fetchData(process.env.REACT_APP_HOST as string, url, fetchConfig);
}

export function postData(url: string, data?: Dict<any>, config?: FetchApiConfig) {
    return fetchApi(url, {method: 'POST', body: data});
}
