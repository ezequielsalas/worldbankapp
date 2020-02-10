import URI from 'urijs';

export const GET = 'GET', PATCH = 'PATCH';

const request = (url, body = {}, method = GET, sendAsJson = true) => {


    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
    });

    const uri = new URI(`/api/${url}/`);
    const requestUrl = method === GET ? uri.setSearch(body) : uri;
    const requestOptions = {
        method,
        headers,
        redirect: 'error',
        credentials: 'same-origin'
    };

    if (method === PATCH) {
        requestOptions.body = !sendAsJson ? uri.setSearch(body).query() : JSON.stringify(body);
    }

    return fetch(new Request(`${requestUrl.pathname()}${method === GET ? requestUrl.search() : ''}`, requestOptions))
        .then(response => {
 
            const httpCode = response.status;
            if (httpCode === 401 || httpCode === 403 || httpCode === 404) {
                console.error("Error: "+httpCode)
            }

            return response.json().catch(err => {
                throw new Error(String(httpCode));
            });
        })
        .then(data => {
            if (!data.error) {
                return data;
            } else {
                throw new Error(data.error);
            }
        })

};

export default request;