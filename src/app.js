const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//set app config
const app = express()
app.set('view engine', 'hbs') //express의 view engine을 hbs로 설정
//set public directory path
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
//set view path
const viewPath = path.join(__dirname, '../templates/views')
app.set('views', viewPath)
//set partials path
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath) //partials 기능은 express가 아닌 hbs가 관여함.

app.get('', (req, res) => {
    res.render('index', { //veiwPath의 원하는 뷰 파일과 같은 이름으로. 확장자는 샹략.
        title: 'Weather app', //뷰에서 파마리터의 json 데이터를 받아서 사용할 수 있게.
        name: 'Woori'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Woori Jo'
    }) 
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'please input address'
        })
    }  
    geocode(address, (error, {lat, lon} = {}) => {
        if (error) return res.send({
            error
        })
        else {
            forecast(lat, lon, (error, {location, temp}) => {
                if (error) return res.send(error)
                else {
                    res.send({
                        location,
                        temp
                    })
                }
            })
        } 
    })    
})

/*
app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })  
})
*/

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'how may I help you?',
        title: 'Help',
        name: 'Woori Jo'
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'Woori Jo',
        errorMsg: 'Help Page Not Found.'
    }) 
})

//404 핸들링 : 맨 마지막에 와야 함.
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'Woori Jo',
        errorMsg: 'Page Not Found.'
    }) 
})

//서버 시작
app.listen(3000, () => {
    console.log('server is up on port 3000')
})