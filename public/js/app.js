/* this is client side js */
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value 
    message.textContent = 'Now Loading...'
    
    //fetch api (by browser)
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) message.textContent = data.error
            else message.textContent = `${data.location}'s temp is ${data.temp}`
        })
    })  
})