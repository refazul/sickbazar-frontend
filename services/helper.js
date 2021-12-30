const API_URL = 'https://graphql.crescentcoder.com/graphql';

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