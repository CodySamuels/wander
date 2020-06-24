console.log("Hello World!")
// we want a random hike generated, 
// Then recieve hike input/ first api call from var randomHike .
// then we want the weather API to grab hikes lat and lon information 
// After weather API gathers lat and lon, 
// then display 6 hour forecast broken up into 3 displays
// Display .sunrise, .sunset, .Temp, .Wind, .Description 
// GLOBAL VARIABLE & OJBJECTS
var HikingProjectAPIDataObject = {}
var userParameters = {
    latitude: ["lat=", "47.6062"],
    longitude: ["&lon=", "-122.3321"],
    maxDistance: ["&maxDistance=", "100"],
    maxResults: ["&maxResults=", "100"],
    sort: ["&sort=", "quality", "distance"],
    minLength: ["&minLength=", ""],
    minStars: ["&minStars=", ""]
};
var randomTrailObject = {}
var lat = ""
var long = ""
// QUERIES HIKING PROJECT DATA API
function queryHikingProjectDataAPI() {
    // VARIABLES SPECIFIC TO THE FUNCTION
    var hikingProjectAPIKey = "&key=200805406-750e5250addc429fbca823b830432e1f"
    var queryURL = "https://www.hikingproject.com/data/get-trails?" + userParameters.latitude[0] + userParameters.latitude[1] + userParameters.longitude[0] + userParameters.longitude[1] + userParameters.maxDistance[0] + userParameters.maxDistance[1] + userParameters.maxResults[0] + userParameters.maxResults[1] + userParameters.minLength[0] + userParameters[1] + userParameters.minStars[0] + userParameters.minStars[1] + hikingProjectAPIKey
    // AJAX FUNCTION
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (hikingAPIResponse) {
            HikingProjectAPIDataObject = hikingAPIResponse
            getRandomTrail()
        });
}
// GETS RANDOM TRAIL
function getRandomTrail() {
    var randomNum = ""
    randomNum = Math.floor(Math.random() * userParameters.maxResults[1] + 1)
    randomTrailObject = HikingProjectAPIDataObject.trails[randomNum]
    lat = JSON.stringify((randomTrailObject.latitude))
    long = JSON.stringify((randomTrailObject.longitude))
    console.log(HikingProjectAPIDataObject.trails[randomNum])
    sixHourForecast()
}
//  AJAX FUNCTION FOR WEATHER LAT LON QUERY---STILL NEED TO INTEGRATE WITH HIKING PROJECT DATA API
// function weatherLocation() {
//     $.ajax({
//         url: weatherQuery,
//         method: "GET"
//     })
//         .then(function (weatherCoord) {
//             console.log(weatherCoord)
//             // var lat = weatherCoord.city.coord.lat;
//             // var long = weatherCoord.city.coord.lon
//         })
// }
// 6 HOUR FORECAST USING THE CURRENT TIME. SPLIT INTO 3 TWO HOUR BLOCKS. 
// HOW DO GET THE CALL TO RECOGNIZE CURRENT TIME AND THEN DISPLAY THE FOLLOWING 6 HOURS?
function sixHourForecast(queryURL) {
    var APIKey = "20139dab005aa19921ee9f2798f4a2e7"
    
    var weatherQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely&appid=${APIKey}`
    $.ajax({
        url: weatherQuery,
        method: "GET"
    })
        // TWO HOUR TIME BLOCKS WILL BE LOOKED AT OVER A 6 HOUR TIME PERIOD
        .then(function (twoHourBlock) {
            // weatherQuery = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
            // exclude=minutely&appid=${APIkey}`
            var twoHour = []
            for (var i = 0; i < twoHourBlock.list.length; i++) {
                if (twoHourBlock.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    console.log(twoHourBlock.list[i])
                }
            }
        })
}