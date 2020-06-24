// GLOBAL VARIABLE & OJBJECTS
var HikingProjectAPIDataObject = {}
var userParameters = {
    latitude: ["lat=", "47.6062"],
    longitude: ["&lon=", "-122.3321"],
    maxDistance: ["&maxDistance=", "50"],
    maxResults: ["&maxResults=", "100"],
    sort: ["&sort=", "quality", "distance"],
    minLength: ["&minLength=", ""],
    minStars: ["&minStars=", ""]
};

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

// FUNCTIONS
function getRandomTrail() {
    var randomNum = ""
    randomNum = Math.floor(Math.random() * userParameters.maxResults[1] + 1)
    console.log(HikingProjectAPIDataObject.trails[randomNum])
}