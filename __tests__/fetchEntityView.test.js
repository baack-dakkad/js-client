import {
    CONFIG as baackConfig,
    readEntityView,
    tv,
    currentEntity, textItem,
} from '../src/index.js';


test('Test fetching home page content entity', async () => {
    let entity = await readEntityView('/home');
    expect(entity).toBeDefined();
    expect(entity.name).toBeDefined();
    expect(entity.variant).toEqual('');
    expect(entity.language).toEqual('en-GB');
    currentEntity(entity);
    expect(tv('title')).toBeDefined();

});

test('Test fetching fails with invalid API key', async () => {
    let key = baackConfig.api_key;
    baackConfig.api_key = '';
    let entity = await readEntityView('/home');
    baackConfig.api_key = key;
    expect(entity?.apiCode).toEqual('NOT_FOUND');
});

test('Test when entity context not set undefined value is empty', async () => {
   currentEntity(undefined);
   // calling t[ext]v[alue] returns empty as no current entity context
    expect(tv('title')).toEqual('');
});

test('Test reading undefined value returns empty', async () => {
   let entity = await readEntityView('/home');
   currentEntity(entity);
   expect(tv('unknown_value')).toEqual('');
});

test('Test retrieving the full text item from the name', async () => {
    let entity = await readEntityView('/home');
    currentEntity(entity);
    expect(textItem('title').name).toEqual('title');
    expect(textItem('title').value).toBeDefined();
    expect(textItem('title').sortOrder).toEqual(0);
});