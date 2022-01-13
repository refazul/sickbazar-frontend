import { API_URL } from './api';

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
        s: ''
    };
    return string.replace(
        new RegExp(`(${Object.keys(endings).join('|')})$`),
        r => endings[r]
    );
}
export function pluralize(string) {
    return string.slice(-1) == 'y' ? string.slice(0, -1) + 'ies' : string + 's';
}
export function capitalize(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}