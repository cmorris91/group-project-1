var resultsEl = $("#results");
var weatherResults = $("#weather-results")
var searchTerm = localStorage.getItem("searchValue") || ""

function getWeather(input) {
    var baseWURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&APPID=2ac1259b720a1255fc6e48f2d466be01"; 
    fetch(baseWURL)
    .then(function(response) {
        return response.json()
        })
    .then(function(data) {
        for(var i = 0; i < data.list.length; i += 8) {
           
            var weatherIcon = data.list[i].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
            var myDiv = $('<div>')
            var weatherDate = $('<p>')
            var imgEl = $("<img>");
            var skyEl = $('<p>');
            var tempEl = $('<p>');
            
            skyEl.text("Sky Conditions: " + data.list[i].weather[0].description);
            tempEl.text("Temp: " + data.list[i].main.temp);
            weatherDate.text(data.list[i].dt_txt.substring(0,10))
            imgEl.attr("src", iconURL);
            imgEl.attr("alt", "weather-icon");
            myDiv.addClass('col-12 col-md-2')
            myDiv.css('background-color', '#eae0e0').css('margin', '2px').css('border-radius', '5px')

            myDiv.append(weatherDate);
            myDiv.append(imgEl);
            myDiv.append(tempEl);
            myDiv.append(skyEl);
            
            weatherResults.append(myDiv);
            resultsEl.append(weatherResults);
          
        }
       
    })    
    };

    getWeather(searchTerm)
    // console.log(searchTerm)

var hotelResults = $('.hotel-results');

function getHotels(location) {
        fetch("http://www.mapquestapi.com/geocoding/v1/address?key=JgWvLdgBrNVGSTkR4kIyGDAmLg2LVUkK&location=" + location)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            var lat = data.results[0].locations[0].latLng.lat.toString();
            var lng = data.results[0].locations[0].latLng.lng.toString();
            fetch("https://hotels-com-free.p.rapidapi.com/srle/listing/v1/brands/hotels.com?lat=" + lat + "&lon=" + lng + "&locale=en_US&currency=USD&pageNumber=1&per_page=5", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "a1d63ec0f8msh6f2ae02247681a1p1c8a9djsna249c725882e",
                    "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data1 => {
                console.log(data1);
                var myData1 = data1.data.body.searchResults.results;
                for(var i = 0; i < 5; i++) {
                    console.log(myData1[i]);
                var myDiv = $('<div>');
                var hotelName = $('<h3>');
                var price = $('<p>');
                var rating = $('<p>');
                var area =  $('<p>');
                
                hotelName.text(myData1[i].name);
                price.text("Price: " + myData1[i].ratePlan.price.current);
                rating.text("Overall Rating: " + myData1[i].starRating);
                area.text("Location: " + myData1[i].neighbourhood);
                myDiv.addClass('col-12 col-lg-4')

    
                myDiv.append(hotelName);
                myDiv.append(price);
                myDiv.append(rating);
                myDiv.append(area);

                hotelResults.append(myDiv);
            };

            }) 
            .catch(err => {
                console.error(err);
            });
        })
        .catch(function(err) {
            console.error(err);
        });
    };

    getHotels(searchTerm);