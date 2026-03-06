import {
    CONFIG as baackConfig,
    fetchOwnerCompany
} from "../src/index.js";

test("Test companies returns owner company", async () => {
    let company = await fetchOwnerCompany();
    expect(company).toBeDefined();
    // Test run in Baack context
    expect(company.name).toEqual('Baack');
});

test('Test companies returns undefined with no API key', async () => {
    baackConfig.api_key = '';
    let company = await fetchOwnerCompany();
    expect(company).toEqual(undefined);
});