interface FetchApiConfig {
    method?: 'GET' | 'POST' | 'PATCH';
    body?: Dict<any>;
    headers?: Dict<any>;
}

export async function fetchApi(url: string, {method = 'GET', body, headers, ...config}: FetchApiConfig = {}) {
    headers = {
        ...headers,
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': true,
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

    let response: Response = await fetch(`http://${process.env.REACT_APP_TEST}${url}`, fetchConfig);

    if (response.ok) {
        return response.json();
    }

    throw new Error('Something went wrong');
}

export function postData(url: string, data?: Dict<any>, config?: FetchApiConfig) {
    return fetchApi(url, {method: 'POST', body: data});
}
