const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-30',
    headers: {
        authorization: '8bfbbd8d-da69-4f60-b945-0ada8a3820a6',
        'Content-Type': 'application/json'
    }
};

export const getCurrentUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}
