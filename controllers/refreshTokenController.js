const jwt = require('jsonwebtoken');
const clientInfo = require('../configs/clientOptions');

const handleRefreshToken = async(req, res) => {
    const url = 'http://20.244.56.144/test/auth';
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientInfo.client)
    });

    console.log(response.json());

    return response.joson();
}

module.exports = { handleRefreshToken };
