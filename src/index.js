let CONFIG = {
    hostname: process.env.BAACK_HOSTNAME,
    api_key: process.env.BAACK_API_BEARER
}

let entity = undefined;

async function fetchOwnerCompany() {
    const url = CONFIG.hostname  + '/n/v1/companies';
    const result = await fetchJson(url, {});
    if (undefined === result) {
        return undefined;
    }
    if (undefined === result.companies) {
        return undefined;
    }
    for (const company of result.companies) {
        if (company.organisation) {
            return company;
        }
    }
    return undefined;
}

async function readEntityView(path, options =
    {
        'Accept-Language': 'en-GB',
        'Variant' : ''
    }) {
    const url = CONFIG.hostname + '/v/v1/entityview' + path;
    return fetchJson(url, options);
}


async function fetchJson(url, headers, method = 'GET', bodyObject = undefined, errorHandler = null) {
    try {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = 'Bearer ' + CONFIG.api_key;
        const response = await fetch(url,
            {
                method: method,
                headers: headers,
                body: bodyObject? JSON.stringify(bodyObject) : null
            });
        return await response.json();
    } catch (error) {
        if (errorHandler) {errorHandler(error);}
        return undefined;
    }
}

function currentEntity(use) {
    entity = use;
}

function tv(name, order = 0) {
    return item(name, order, entity?.texts)?.value ?? '';
}

function textItem(name, order = 0) {
    return item(name, order, entity?.texts);
}

function item(name, order = 0, items) {
    if (undefined === items) {
        return undefined;
    }
    for (const item of items) {
        if (item.name === name && item.sortOrder === order) {
            return item;
        }
    }
    return undefined;
}

export {
    CONFIG,
    fetchOwnerCompany,
    readEntityView,
    tv, textItem,
    currentEntity,
};