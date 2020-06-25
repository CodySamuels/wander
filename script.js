// we want a random hike generated, 
// Then recieve hike input/ first api call from var randomHike .
// then we want the weather API to grab hikes lat and lon information 
// After weather API gathers lat and lon, 
// then display 6 hour forecast broken up into 3 displays
// Display .sunrise, .sunset, .Temp, .Wind, .Description 
// GLOBAL VARIABLE & OJBJECTS

var hikingProjectAPIDataObject = JSON.parse(localStorage.getItem("hikesData")) || {};
var randomTrailObject = JSON.parse(localStorage.getItem("randomHikeData")) || {};
var weatherForecastObject = {}
var randomTrailObject = {}
var userParameters = {
    latitude: ["lat=", "47.6062"],
    longitude: ["&lon=", "-122.3321"],
    maxDistance: ["&maxDistance=", "50"],
    maxResults: ["&maxResults=", "100"],
    sort: ["&sort=", "quality", "distance"],
    minLength: ["&minLength=", ""],
    minStars: ["&minStars=", ""]
};

var map;
var lat = ""
var long = ""

// QUERIES HIKING PROJECT DATA API
function queryHikingProjectDataAPI() {

    // VARIABLES SPECIFIC TO THE FUNCTION
    var hikingProjectAPIKey = "&key=200805406-750e5250addc429fbca823b830432e1f"
    var hikingQueryURL = "https://www.hikingproject.com/data/get-trails?" + userParameters.latitude[0] + userParameters.latitude[1] + userParameters.longitude[0] + userParameters.longitude[1] + userParameters.maxDistance[0] + userParameters.maxDistance[1] + userParameters.maxResults[0] + userParameters.maxResults[1] + userParameters.minLength[0] + userParameters[1] + userParameters.minStars[0] + userParameters.minStars[1] + hikingProjectAPIKey

    // AJAX FUNCTION
    $.ajax({
        url: hikingQueryURL,
        method: "GET"
    })
        .then(function (hikingAPIResponse) {
            hikingProjectAPIDataObject = hikingAPIResponse
            // getRandomTrail()
            // initMap(queryURL)
            fisherYatesShuffle(hikingProjectAPIDataObject.trails)
            localStorage.setItem("hikesData", JSON.stringify(hikingProjectAPIDataObject))
            console.log(hikingProjectAPIDataObject)
        });
}

// SELECTS A RANDOM TRAIL
function getRandomTrail() {
    var randomNum = ""
    randomNum = Math.floor(Math.random() * userParameters.maxResults[1] + 1)
    randomTrailObject = hikingProjectAPIDataObject.trails[randomNum]
    lat = (randomTrailObject.latitude)
    long = (randomTrailObject.longitude)
    console.log(hikingProjectAPIDataObject.trails[randomNum])
    sixHourForecast()

}

// GOOGLE MAPS FUNCTION
function initMap() {
    lat = randomTrailObject.latitude
    lng = randomTrailObject.longitude
    var loc = randomTrailObject.location
    var sum = randomTrailObject.summary
    var con = randomTrailObject.conditionDetails
    var img = randomTrailObject.imgSqSmall
    var myLatLng = { lat, lng };

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 12
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
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    //       console.log(randomTrailObject); 

    //       console.log(loc);
    //       console.log(sum);
    //       console.log(con);
    //       console.log(response);
    //       // $("#button").click(function () {
    //       // })
    //     var map = new google.maps.Map(document.getElementById('hikeMap'), {
    //       zoom: 12,
    //       center: myLatLng
    //     });

    //  }); 
    // }
}

// POPULATES THE RANDOM PAGE
function populateRandomPage() {
    // CONVERTS DIFFICULTY TO SOMETHING EASIER TO READ
    if (randomTrailObject.difficulty = "green") {
        randomTrailObject.difficulty = "Very Easy"
    } else if (randomTrailObject.difficulty = "greenBlue") {
        randomTrailObject.difficulty = "Easy"
    } else if (randomTrailObject.difficulty = "blue") {
        randomTrailObject.difficulty = "Intermediate"
    } else if (randomTrailObject.difficulty = "blueBlack") {
        randomTrailObject.difficulty = "Difficult"
    } else if (randomTrailObject.difficulty = "black") {
        randomTrailObject.difficulty = "Very Difficult"
    } else if (randomTrailObject.difficulty = "dblack") {
        randomTrailObject.difficulty = "Extreme"
    }
    // APPENDS TO PAGE
    $("#hikeName").text(randomTrailObject.name)
    $("#difficulty").text("Difficulty: " + randomTrailObject.difficulty)
    $("#length").text("Length: " + randomTrailObject.length + " miles")
    $("#elevationGain").text("Ascent: " + randomTrailObject.ascent + " feet")
    $("#hikeDescription").text(randomTrailObject.summary)
}

// POPULATES THE LIST PAGE
function populateListPage() {
    for (let i = 0; i < 10; i++) {

        // fisherYatesShuffle(hikingProjectAPIDataObject.trails)
        newLink = $("<a>")
        newLink.attr("href", "userSelection.html")
        newLink.addClass("collection-item")
        newLink.attr("id", `link+${i}`)
        newLink.text(hikingProjectAPIDataObject.trails[i].name)
        $(".collection").append(newLink)
        $(newLink).on("click", function (event) {
            event.preventDefault();
            var trailToLoad = hikingProjectAPIDataObject.trails[i]
            hikingProjectAPIDataObject.trails.splice(-1, 1, trailToLoad)
            localStorage.setItem("hikesData", JSON.stringify(hikingProjectAPIDataObject))
            window.location.href = './userSelection.html';
        })
    }
}

// POPULATES SELECTION PAGE
function populateSelectionPage() {

    // CONVERTS DIFFICULTY TO SOMETHING EASIER TO READ
    if (hikingProjectAPIDataObject.trails[99].difficulty = "green") {
        hikingProjectAPIDataObject.trails[99].difficulty = "Very Easy"
    } else if (hikingProjectAPIDataObject.trails[99].difficulty = "greenBlue") {
        hikingProjectAPIDataObject.trails[99].difficulty = "Easy"
    } else if (hikingProjectAPIDataObject.trails[99].difficulty = "blue") {
        hikingProjectAPIDataObject.trails[99].difficulty = "Intermediate"
    } else if (hikingProjectAPIDataObject.trails[99].difficulty = "blueBlack") {
        hikingProjectAPIDataObject.trails[99].difficulty = "Difficult"
    } else if (hikingProjectAPIDataObject.trails[99].difficulty = "black") {
        hikingProjectAPIDataObject.trails[99].difficulty = "Very Difficult"
    } else if (hikingProjectAPIDataObject.trails[99].difficulty = "dblack") {
        hikingProjectAPIDataObject.trails[99].difficulty = "Extreme"
    }
    // APPENDS TO PAGE
    $("#hikeName").text(hikingProjectAPIDataObject.trails[99].name)
    $("#difficulty").text("Difficulty: " + hikingProjectAPIDataObject.trails[99].difficulty)
    $("#length").text("Length: " + hikingProjectAPIDataObject.trails[99].length + " miles")
    $("#elevationGain").text("Ascent: " + hikingProjectAPIDataObject.trails[99].ascent + " feet")
    $("#hikeDescription").text(hikingProjectAPIDataObject.trails[99].summary)
    // FOR ADDING ANDREW'S WEATHER
    //$("#weather").text(randomTrailObject.name)

}

//  FORECAST FUNCTION
function sixHourForecast() {
    var APIKey = "20139dab005aa19921ee9f2798f4a2e7"
    var weatherQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely&appid=${APIKey}`

    $.ajax({
        url: weatherQueryURL,
        method: "GET"
    })

        .then(function (twoHourBlock) {
            weatherForecastObject = twoHourBlock
            console.log(twoHourBlock)
            var iconUrl = "http://openweathermap.org/img/w/" + twoHourBlock.current.weather[0].icon + ".png";
            $("#weather").append("<li class='sunrise collection-item'>" + "Sunrise: " + moment.unix(twoHourBlock.current.sunrise).format('LT') + "</li>")
            $("#weather").append("<li class='sunset collection-item'>" + "Sunset: " + moment.unix(twoHourBlock.current.sunset).format('LT') + "</i>")

            for (var i = 0; i < twoHourBlock.hourly.length; i++) {




                if (i % 2 !== 0 && i < 6) {
                    // console.log(twoHourBlock.hourly[i].temp.toFixed())
                    // console.log(twoHourBlock.hourly[i].humidity)
                    // console.log(timeConverter(weatherForecastObject.current.sunrise))
                    // console.log(timeConverter(weatherForecastObject.current.sunset))

                    $("#weather").append("<li class='collection-item'><h5>" + moment.unix(twoHourBlock.hourly[i].dt).format('LT') + "</h5>" + "<h5 class='imgIcon collection-item'><img src='" + iconUrl + "'</h5></li>")
                    $("#weather").append("<li class='collection-item'>"+"Temp F: " + twoHourBlock.hourly[i].temp.toFixed()+"</li>")
                    $("#weather").append("<li class='humidity collection-item'>" + "Humidity: " + twoHourBlock.hourly[i].humidity + "%" + "</li>")
                }
            }
        })
}

// FISHER-YATES SHUFFLE
function fisherYatesShuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
