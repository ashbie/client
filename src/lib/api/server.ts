interface Body {
    query: string;
}
interface Options {
    endpoint: string,
    method: string,
    body?: string,
    authorization?: string
}

/* export const serverGraphQL = {
    fetch: async (body: Body) => {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        return res.json();
    }
}; */
export const server = {
    fetch: async <TData=any>({endpoint, method, body, authorization}: Options) => {
        /* const headers:HeadersInit = {
            'Content-Type': 'application/json',
            ...(authorization ? { 'Authorization': authorization } : {})
        } */
        const res = await fetch(endpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(authorization ? { 'Authorization': authorization } : {})
            },
            ...(body ? { body } : {} ),
        });

        return res.json() as Promise<TData>;
    },

};