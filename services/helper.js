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

export function random_string(length = 5) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function singularize(string = '') {
    const endings = {
        ves: 'fe',
        ies: 'y',
        i: 'us',
        zes: '',
        ses: '',
        es: '',
        s: ''
    };
    return string.replace(
        new RegExp(`(${Object.keys(endings).join('|')})$`),
        r => endings[r]
    );
}
export function capitalize(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
}