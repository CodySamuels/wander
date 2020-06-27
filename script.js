// GLOBAL VARIABLE & OJBJECTS
var hikingProjectAPIDataObject = JSON.parse(localStorage.getItem("hikesData")) || {};
var randomTrailObject = JSON.parse(localStorage.getItem("randomHikeData")) || {};
var currentWeatherObject = {}
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

// GOOGLE MAPS FUNCTIONALITY
var map;
var lat = ""
var long = ""

//HOME PAGE SLIDESHOW
var images = new Array("./assets/IMG-1219.JPG", "./assets/F12DB34E-630B-4231-A0DF-5532A3D8B36F.JPG", "./assets/IMG_5925.jpg", "./assets/IMG-2722.jpg", "./assets/mistyforest.jpg", "./assets/IMG-9687.jpg", "./assets/IMG-9365.jpg");
var nextimage = 0;


// FUNCTIONS

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

// GOOGLE MAPS FUNCTION FOR RANDOM PAGE
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
}

// GOOGLE MAPS FUNCTION FOR USER SELECTION PAGE
function initMapSelection() {
    lat = hikingProjectAPIDataObject.trails[99].latitude
    lng = hikingProjectAPIDataObject.trails[99].longitude
    var loc = hikingProjectAPIDataObject.trails[99].location
    var sum = hikingProjectAPIDataObject.trails[99].summary
    var con = hikingProjectAPIDataObject.trails[99].conditionDetails
    var img = hikingProjectAPIDataObject.trails[99].imgSqSmall
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
}

// MULTIPIN FUNCTION FOR PINING THE 10 TRAILS
function multiplepins() {
    console.log(hikingProjectAPIDataObject);
    var locations = []

    for (var i = 0; i < 10; i++) {
        var newArr = [hikingProjectAPIDataObject.trails[i].name, hikingProjectAPIDataObject.trails[i].latitude, hikingProjectAPIDataObject.trails[i].longitude, i]
        locations.push(newArr)
    }

    console.log(locations);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(47.6062, -122.3321),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
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
    console.log(hikingProjectAPIDataObject);

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
    lat = hikingProjectAPIDataObject.trails[99].latitude
    long = hikingProjectAPIDataObject.trails[99].longitude

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

    sixHourForecast()
}


function currentConditions() {
    var APIKey = "20139dab005aa19921ee9f2798f4a2e7"
    var weatherNow = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely&appid=${APIKey}`

    ajax({
        url: weatherNow,
        method: "GET"
    })
        .then(function (trailWeather) {


        })
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
                    var newCard = $("<div>")
                    newCard.addClass("card")
                    newCard.attr("id", `card${i}`)

                    $(newCard).append("<h4 class=card-title>" + (moment.unix(twoHourBlock.hourly[i].dt).format('LT') + "</h4>") + "<h5 class='imgIcon collection-item'><img src='" + iconUrl + "'</h5>" + "</div>")
                    $(newCard).append("<div class='temp'>" + "Temp F: " + twoHourBlock.hourly[i].temp.toFixed() + "</div>")

                    $(newCard).append("<div class='humidity'>" + "Humidity: " + twoHourBlock.hourly[i].humidity + "%" + "</div>")

                } $("#weatherCards").append(newCard)
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

function doSlideshow() {
    if (nextimage >= images.length) { nextimage = 0; }
    $('.slideshow-container')
        .css('background-image', 'url("' + images[nextimage++] + '")')
        .fadeIn(500, function () {
            setTimeout(doSlideshow, 3000);
        });
}

