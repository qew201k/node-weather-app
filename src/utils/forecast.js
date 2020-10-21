const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=223f7866baf38778de929692b8fc8462&query=${lat},${lon}&units=f`

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('specific error3 occured.', undefined)
        } else if (body.error) {
            callback('specific error4 occured.', undefined)
        } else {
            callback(undefined, { 
                location: body.location.name,
                temp: body.current.temperature
            })
        }
    })
}

module.exports = forecast







