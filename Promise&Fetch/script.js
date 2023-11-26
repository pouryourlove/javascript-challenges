// create a promise

const promise = new Promise((resolve,reject) => {
    //Do some async task
    setTimeout(() => {
        console.log("Async task completed")
        resolve()
    }, 1000 )
})

//fetch

fetch('https://api.example.com/data').then((response) => response.json()).then((data) => console.log(data))