import fetch from "node-fetch";

export const arboxAjax = token => (method = "POST") => (url, body) => () => {
    return fetch(url,
        {
            method,
            body: JSON.stringify(body),
            headers: {
                "accessToken": token,
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
}