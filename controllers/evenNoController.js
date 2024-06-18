const clientInfo = require('../configs/clientOptions');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

const fileData = {
    numbers: require('../models/data.json'),
    setData: async(data) => {
        try {
            this.numbers = data;
            await fsPromises.writeFile(path.join(__dirname, '..', 'models', 'employees.json'), JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
    }
};


const getToken = async() => {
    const url = 'http://20.244.56.144/test/auth';
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientInfo.client)
    });

    return response.json();
}

const getPrime = async(req, res) => {
    const windowSize = 10;
    let accessToken = "";
    getToken()
        .then((data) => {
            accessToken = data.access_token;
            const url = 'http://20.244.56.144/test/even';
            const bearerToken = "Bearer " + accessToken;

            fetch(url, {
                method: "GET",
                headers: {
                    "Authorization" : bearerToken
                },
            })
                .then((response) => response.json())
                .then(data => {
                    const numbers = data.numbers;

                    const prevWindow = fileData.numbers[fileData.numbers.length - 1].windowCurrState;
                    console.log(prevWindow);

                    if(numbers.length + prevWindow.length > windowSize) {
                        const newArr = prevWindow.concat(numbers);
                        const finalArr = newArr.slice(-10);
                        console.log(finalArr);

                        const average = finalArr.reduce((a, b) => a + b, 0) / arr.length;

                        const newData = {
                            "numbers" : numbers,
                            "windowPrevState" : prevWindow,
                            "windowCurrState" : finalArr,
                            "avg" : average
                        }
                        fileData.setData(newData);

                        return res.json(newData);
                    }
                })
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = { getPrime };