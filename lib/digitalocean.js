require('dotenv').config();

const axios = require('axios').create({
    baseURL: process.env.DIGITALOCEAN_API_URL,
    headers: {
        'Authorization': 'Bearer ' + process.env.DIGITALOCEAN_OAUTH_TOKEN,
        'Content-Type': 'application/json'
    }
});

axios.interceptors.response.use(response => response.data);

const domainRecords = {
    create: (domain, attributes) =>
        axios.post(`domains/${domain}/records`, attributes),

    remove: (domain, id) =>
        axios.delete(`domains/${domain}/records/${id}`)
};

exports.domainRecords = domainRecords;
