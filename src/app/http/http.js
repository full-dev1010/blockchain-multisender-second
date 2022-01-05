import axios from "axios";

export default axios.create({
    baseURL: 'https://eu.bsc.chaingateway.io/v1',
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        'Authorization':'ifxygq7umocwcw4cc0gok04sskwskow4w040c04gs8g4448og0wogowko0w8csog'
    }
});


// export default axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL+"/api",
//   headers: {
//     "Content-type": "application/json",
//     'Authorization':'ifxygq7umocwcw4cc0gok04sskwskow4w040c04gs8g4448og0wogowko0w8csog'
//   }
// });