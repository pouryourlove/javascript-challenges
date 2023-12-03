var map = L.map('map').setView([0,0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([0,0]).addTo(map)

navigator.geolocation.getCurrentPosition(function(pos){
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    marker.setLatLng([lat,lng]).update()
    map.setView([lat,lng], 13)

    marker.bindPopup('<strong>Hello World</strong><br>This is my location')
})











// function curSuccess(pos){
//     const coords = pos.coords;

//     console.log(`Latitude: ${coords.latitude}`);
//     console.log(`Longitude: ${coords.longitude}`)
//     console.log(`Within: ${coords.accuracy} meters`)
// }

// function curError(err){
//     console.log(`Error: ${err.code} - ${err.message}`)
// }

// const curOptions = {
//     enableHighAccuracy: true, // Use GPS if available
//     timeout: 5000,//Time to wait to stop trying for location
//     maximumAge: 0, 
// };


// navigator.geolocation.getCurrentPosition(curSuccess, curError, curOptions)