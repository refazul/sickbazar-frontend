const API_URL = 'https://graphql.crescentcoder.com/graphql';
//const API_URL = 'http://localhost:4000/graphql';

export async function http_post(param) {
    const res = await fetch(API_URL,
        {
            body: JSON.stringify(param),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }
    )
    return res;
}