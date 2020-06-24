<<<<<<< HEAD
// GLOBAL VARIABLE & OJBJECTS
var HikingProjectAPIDataObject = {}
=======
// we want a random hike generated, 
// Then recieve hike input/ first api call from var randomHike .
// then we want the weather API to grab hikes lat and lon information 
// After weather API gathers lat and lon, 
// then display 6 hour forecast broken up into 3 displays
// Display .sunrise, .sunset, .Temp, .Wind, .Description 

// GLOBAL VARIABLE & OJBJECTS
var hikingProjectAPIDataObject = {}
var weatherForecastObject = {}
var randomTrailObject = {}

>>>>>>> dev
var userParameters = {
    latitude: ["lat=", "47.6062"],
    longitude: ["&lon=", "-122.3321"],
    maxDistance: ["&maxDistance=", "50"],
    maxResults: ["&maxResults=", "100"],
    sort: ["&sort=", "quality", "distance"],
    minLength: ["&minLength=", ""],
<<<<<<< HEAD
    minStars: ["&minStars=", ""]};
=======
    minStars: ["&minStars=", ""]
};
var lat = ""
var long = ""

>>>>>>> dev

// QUERIES HIKING PROJECT DATA API
function queryHikingProjectDataAPI() {

    // VARIABLES SPECIFIC TO THE FUNCTION
    var hikingProjectAPIKey = "&key=200805406-750e5250addc429fbca823b830432e1f"
<<<<<<< HEAD
    var queryURL = "https://www.hikingproject.com/data/get-trails?" + userParameters.latitude[0] + userParameters.latitude[1] + userParameters.longitude[0] + userParameters.longitude[1] + userParameters.maxDistance[0] + userParameters.maxDistance[1] + userParameters.maxResults[0] + userParameters.maxResults[1] + userParameters.minLength[0] + userParameters[1] + userParameters.minStars[0] + userParameters.minStars[1] + hikingProjectAPIKey

    // AJAX FUNCTION
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            HikingProjectAPIDataObject = response
=======
    var hikingQueryURL = "https://www.hikingproject.com/data/get-trails?" + userParameters.latitude[0] + userParameters.latitude[1] + userParameters.longitude[0] + userParameters.longitude[1] + userParameters.maxDistance[0] + userParameters.maxDistance[1] + userParameters.maxResults[0] + userParameters.maxResults[1] + userParameters.minLength[0] + userParameters[1] + userParameters.minStars[0] + userParameters.minStars[1] + hikingProjectAPIKey

    // AJAX FUNCTION
    $.ajax({
        url: hikingQueryURL,
        method: "GET"
    })
        .then(function (hikingAPIResponse) {
            hikingProjectAPIDataObject = hikingAPIResponse
>>>>>>> dev
            getRandomTrail()
        });
}

<<<<<<< HEAD
// FUNCTIONS
function getRandomTrail() {
    var randomNum = ""
    randomNum = Math.floor(Math.random() * userParameters.maxResults[1] +1)
    console.log(HikingProjectAPIDataObject.trails[randomNum])
}
=======
// GET RANDOM TRAIL FUNCTION
function getRandomTrail() {
    var randomNum = ""
    randomNum = Math.floor(Math.random() * userParameters.maxResults[1] + 1)
    randomTrailObject = hikingProjectAPIDataObject.trails[randomNum]
    lat = (randomTrailObject.latitude)
    long = (randomTrailObject.longitude)
    console.log(hikingProjectAPIDataObject.trails[randomNum])
}

// FORECAST FUNCTION
function sixHourForecast() {
    var weatherAPIkey = "20139dab005aa19921ee9f2798f4a2e7";
    var weatherQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${weatherAPIkey}`;

    $.ajax({
        url: weatherQueryURL,
        method: "GET"

    })
        // TWO HOUR TIME BLOCKS WILL BE LOOKED AT OVER A 6 HOUR TIME PERIOD
        .then(function (twoHourBlock) {
            weatherForecastObject = twoHourBlock
            console.log(twoHourBlock)
            // for (var i = 0; i < twoHourBlock.list.length; i++) {

            //     if (twoHourBlock.list[i].dt_txt.indexOf("12:00:00") !== -1) {
            //         console.log(twoHourBlock.list[i])
            //     }

            // }
        });
};
>>>>>>> dev
