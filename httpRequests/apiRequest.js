// const axios = require('axios');
const config = require('config');

// exports.listStreamById = async id => {

//     try {
//         const result = await axios
//             .get(`${config.get("dacast.baseUrl")}/channel/${id}`);
//         return result;
//     } catch (error) {
//         console.log(error)
//     }


// }

const sdk = require('api')('@vzaar/v2#4hbaf12l3txjia6');

exports.listStreamById = async id => {
    sdk.auth(config.get("dacast_apiKey"));
    sdk.lookupStream({ id, 'X-Format': 'default' })

        .then(res => {
            console.log(res)
            return res
        })

        .catch(err => {
            console.error(err);
        });

}