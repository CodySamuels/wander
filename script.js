console.log("Hello World!")

var APIkey = "4af87ee91531ff09b1ce9e3392587b3a"
var weatherQuery = `https://api.openweathermap.org/data/2.5/forecast?q=seattle&units=imperial&appid=${APIkey}`;


// we want a random hike generated, 
// Then recieve hike input from var randomHike .
// then we want the weather API to grab hikes lat and lon information 
// After weather API gathers lat and lon, 
// then display 6 hour forecast broken up into 3 displays
// Display .sunrise, .sunset, .Temp, .Wind, .Description 


// ajax call for One-Call-API: weather data
$.ajax({
    url: weatherQuery,
    method: "GET"
})
.then(function(response){
console.log(response)

var trailLat = response.city.coord.lat;
var trailLon = respone.city.coord.lon

weatherQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${trailLat}&lon=${trailLon}&
exclude=minutely&appid=${APIkey}`


})