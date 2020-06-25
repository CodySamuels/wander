
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
    // VARIABLES NECESSARY
    var queryLongitude = "-122.3321"
    var queryLatitude = "47.6062"
    var userParameters = {
        latitude: ["lat=", "47.6062"],
        longitude: ["&lon=", "-122.3321"],
        maxDistance: ["&maxDistance=", "50"],
        maxResults: ["&maxResults=", "100"],
        sort: ["&sort=", "quality", "distance"],
        minLength: ["&minLength=", ""],
        minStars: ["&minStars=", ""]
    };
    var hikingProjectAPIKey = "&key=200805406-750e5250addc429fbca823b830432e1f"
    // var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + queryLatitude + "&lon=" + queryLongitude + "&maxResults=" + userParameters.maxResults[0] + "&maxDistance="+ userParameters.maxDistance[0] +"&key=" + hikingProjectAPIKey
    var queryURL = "https://www.hikingproject.com/data/get-trails?" + userParameters.latitude[0] + userParameters.latitude[1] + userParameters.longitude[0] + userParameters.longitude[1] + userParameters.maxDistance[0] + userParameters.maxDistance[1] + userParameters.maxResults[0] + userParameters.maxResults[1] + userParameters.minLength[0] + userParameters[1] + userParameters.minStars[0] + userParameters.minStars[1] + hikingProjectAPIKey
    // AJAX FUNCTION -->
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            HikingProjectAPIDataObject = response
            getRandomTrail()
            initMap(queryURL);
        });
}
// FUNCTIONS
function getRandomTrail() {

    return Math.floor(Math.random() * 101)
    // console.log(HikingProjectAPIDataObject.trails[randomNum]);
    // return (HikingProjectAPIDataObject.trails[randomNum]);
};

function initMap(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var trailsAR = response.trails
        var randomTrail = trailsAR[getRandomTrail()];
        console.log(randomTrail);

        var lat = randomTrail.latitude
        var lng = randomTrail.longitude
        var loc = randomTrail.location
        var sum = randomTrail.summary
        var con = randomTrail.conditionDetails
        var img = randomTrail.imgSqSmall
        console.log(loc);
        console.log(sum);
        console.log(con);
        console.log(response);
        $("#button").click(function () {


        })




        var myLatLng = { lat, lng };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: myLatLng
        });
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Enjoy your Hike.</h1>' +
            '<div id="bodyContent">' +
            '<h1>' + loc + '</h1>' +
            '<h2>' + sum + '</h2>' +
            '<h3>' + con + '</h3>' +
            '</div>' +
            '</div>';


        var infowindow = new google.maps.InfoWindow({
            content: contentString
        })

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    });
}

queryHikingProjectDataAPI()
