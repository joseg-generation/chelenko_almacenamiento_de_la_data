const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../logs/historical_data.json');

const saveToJSON = (data) => {
    fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
    let jsonData = []
    if (!err && fileData) {
        jsonData = JSON.parse(fileData);
    }
    jsonData.push(data);
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.log('Error writing file', err)
            }
        })
    })
}

const logReservation = (reservation) => {
    saveToJSON(reservation)
}   

module.exports = { logReservation }