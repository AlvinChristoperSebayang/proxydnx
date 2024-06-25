exports.handler = async function(event, context) {
    const { queryStringParameters } = event;

    const shopName = 'dxretail';
    const apiKey = '914b749b03fe17557930217aeb716aee';
    const password = 'shpat_87217aeb716aee';
    const apiVersion = '2024-04';
    const variantID = queryStringParameters.variantID;

    const encodedCredentials = Buffer.from(`${apiKey}:${password}`).toString('base64');
    const variantUrl = `https://${shopName}.myshopify.com/admin/api/${apiVersion}/variants/${variantID}.json`;

    try {
        // Dynamic import untuk node-fetch
        let fetch;
        try {
            fetch = require('node-fetch');
        } catch (e) {
            fetch = (await import('node-fetch')).default;
        }

        // Fetch pertama untuk mendapatkan inventory_item_id
        const variantResponse = await fetch(variantUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
                'Content-Type': 'application/json'
            }
        });

        const variantData = await variantResponse.json();
        const inventoryItemId = variantData.variant.inventory_item_id;

        // Tentukan locationID berdasarkan data-market
        const location = queryStringParameters.location;

        // Fetch kedua untuk mendapatkan informasi inventory
        const inventoryUrl = `https://${shopName}.myshopify.com/admin/api/${apiVersion}/inventory_levels.json?inventory_item_ids=${inventoryItemId}&location_ids=${location}`;
        const inventoryResponse = await fetch(inventoryUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${encodedCredentials}`,
                'Content-Type': 'application/json'
            }
        });

        const inventoryData = await inventoryResponse.json();

        // Menggabungkan data variant dan inventory
        const responseData = {
            variant: variantData.variant,
            inventory: inventoryData
        };

        return {
            statusCode: 200,
            body: JSON.stringify(responseData),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
    }
};
