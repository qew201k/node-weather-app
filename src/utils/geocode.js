const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoid29vcmkiLCJhIjoiY2tnYXhpaXdoMGJodzJybzBpYmdoY2U1MiJ9.GXjH2DSPtKhvIw00WYFaVw&limit=1`
    
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('specific error1111 occured.', undefined)
        } else if (response.body.features.length === 0) {
            callback('specific error2222 occured.', undefined)
        } else {
            callback(undefined, { 
                lon: response.body.features[0].center[0],
                lat: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode