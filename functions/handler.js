let fetch;
try {
    fetch = require('node-fetch');
} catch (e) {
    fetch = (await import('node-fetch')).default;
}


// exports.handler = async function(event, context) {
//     const { queryStringParameters } = event;

//     const shopName = 'dxretail';
//     const apiKey = '914b749b03fe17557930217aeb716aee';
//     const password = 'shpat_87217aeb716aee';
//     const apiVersion = '2024-04';
//     const variantID = queryStringParameters.variantID;

//     const encodedCredentials = Buffer.from(`${apiKey}:${password}`).toString('base64');
//     const variantUrl = `https://${shopName}.myshopify.com/admin/api/${apiVersion}/variants/${variantID}.json`;

//     try {
//         let fetch;
//         try {
//             fetch = require('node-fetch');
//         } catch (e) {
//             fetch = (await import('node-fetch')).default;
//         }

//         const variantResponse = await fetch(variantUrl, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Basic ${encodedCredentials}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const variantData = await variantResponse.json();
//         const inventoryItemId = variantData.variant.inventory_item_id;

//         const location = queryStringParameters.location;

//         const inventoryUrl = `https://${shopName}.myshopify.com/admin/api/${apiVersion}/inventory_levels.json?inventory_item_ids=${inventoryItemId}&location_ids=${location}`;
//         const inventoryResponse = await fetch(inventoryUrl, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Basic ${encodedCredentials}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const inventoryData = await inventoryResponse.json();

//         const responseData = {
//             variant: variantData.variant,
//             inventory: inventoryData
//         };

//         return {
//             statusCode: 200,
//             body: JSON.stringify(responseData),
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'application/json'
//             }
//         };
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: error.message }),
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Content-Type': 'application/json'
//             }
//         };
//     }
// };

// functions/handler.js


// functions/handler.js

module.exports = async (event, context) => {
    // Your handler logic here
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from serverless function!" })
    };
};
