$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
    .addControl(L.mapbox.geocoderControl('mapbox.places'))
    .setView([37.7833, -122.4167], 12);

  var userTrailsLayer = getUserTrails(map).addTo(map);
  var allHikersLayer = allHikersTrails(map);
  var drawLayer = L.featureGroup().addTo(map);
  var drawControl = new L.Control.Draw({edit: {featureGroup: drawLayer}})


  // Make an AJAX call for the current_user
  // var currentUser;
  // $.ajax({
  //   url: "/current_user",
  //   method: "GET",
  //   dataType: "JSON"
  // }).done(function(user){
  //   currentUser = user;
  // })

  var otherHikerListener = function() {
    $(".other-hiker").on('click', function(event) {
      event.preventDefault();
      var url = $(this).attr('href')
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'HTML'
      }).done(function(response){
        console.log(response)
        window.history.pushState(null, null, url)
        $('.main-menu').addClass('hideMenu');
        $('.my-hikes-menu').removeClass('hideMenu');
      }).fail(function(response){
        console.log("fail")
        console.log(response)
      })
      // $('.main-menu').addClass('hideMenu');
      // $('.my-hikes-menu').removeClass('hideMenu');
    })
  }
  
  otherHikerListener();

  userTrailsLayer.on("ready", function(e) {
    map.fitBounds(userTrailsLayer.getBounds());
    var trailPopUpOnHoverOnNavHover;
    $('.trailtitle').on('mouseenter', function(e){
      // re-factor b tag to an ID name.
      trailPopUpOnHoverOnNavHover = $(this).find("b").text()
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.title === trailPopUpOnHoverOnNavHover){
          marker.openPopup();
        }
      })
    });

    $('.trailtitle').on('mouseleave', function(e){
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.title === trailPopUpOnHoverOnNavHover){
          marker.closePopup();
        }
      })
    });
  })

  // Return to main menu
  $('.back-button').on('click', function(event){
    event.preventDefault();
    window.location = currentUser["id"]
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.leaflet-draw').hide()
    map.addLayer(userTrailsLayer)
    map.removeLayer(allHikersLayer);
  })

  // Show the my trails menu
  $('#my-trails').on('click', function(event){
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.my-hikes-menu').removeClass('hideMenu');
    map.addlayer(userTrailsLayer);
  })

  // Show all-hikers menu
  $('#all-hikers').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.all-hikers-menu').removeClass('hideMenu');

    // removeAllLayers(map);
    // map.removeLayer(userTrailsLayer);
    allHikersLayer.addTo(map)
    // map.addLayer(allHikers);
  })

//Add Trails with "Log Hike"
  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.log-hike-menu').removeClass('hideMenu');
    $('#add-trailhead-button').removeClass('hidden').addClass('add-trailhead-button');
    map.removeLayer(userTrailsLayer)
    $('body').on("click", '#add-trailhead-button', function(e){
      var currentLon = map.getCenter().lng//e.latlng.lng;
      console.log(currentLon)
      var currentLat = map.getCenter().lat//e.latlng.lat;
      console.log(currentLat)
      clickAddTrailheadButton(currentLat,currentLon);
    })

    //Make a function to displaytrailheadMarker on button click to start trail

    var clickAddTrailheadButton = function(latitude, longitude){
      var trailheadMarker = L.marker([latitude, longitude], {
        icon: L.mapbox.marker.icon({
            'marker-color': '#f86767',
            'marker-symbol': 'park'
          }),
          draggable: true,
      }).addTo(map);
    trailheadMarker.on('dragend', onDragEnd)

    // Set the initial marker coordinate on load.
    function onDragEnd() {
        var m = trailheadMarker.getLatLng();
        $('#user_trails_trailhead_lat').val(m.lat)
        $('#user_trails_trailhead_lon').val(m.lng)
    }
    onDragEnd();

    }

// var lat = (e.latlng.lat);
// var lng = (e.latlng.lng);
// marker.setLatLng([lat, lng]).update();  // Updates your defined marker position


    // every time the marker is dragged, update the coordinates container
  }) // END LOG HIKE ON CLICK

//START SUBMIT NEW HIKE
$('.navbar').on("submit", '#new-trail-form', function(event){
  event.preventDefault();
    var urlVal = $(this).attr('action')
    var typeVal = $(this).attr('method')
  $.ajax({
      url: urlVal,
      type: typeVal,
      data: $('#new-trail-form').serialize()
    }).done(function(response) {
      // alert('Yay! request went through')
      console.log(response)
    }).fail(function(response){
      console.log(response)
      // alert('request did not go through');
    });
    location.reload();

    //Perhaps use setLatLng() method to set the location to the hike you just added
})
//END SUBMIT NEW HIKE

//Directions stuff

//shorthand
var directions = L.mapbox.directions({profile: 'mapbox.walking'});

//Create a new layer that displays a given set of directions on a map
var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(map);

//add the directions input control to the map object
var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(map);

//add the routes control to the map object
var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
    .addTo(map);

//Hide all the stuff that we don't want
$('#mapbox-directions-origin-input').hide()
$('#mapbox-directions-destination-input').hide()
//$('.mapbox-directions-route').hide()
$('#routes').hide();
$('.mapbox-form-label').hide()


var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
    .addTo(map);
}); // END DOCUMENT READY


  var userPath = function(){
    var windowLocation = window.location.pathname
    if (windowLocation.includes('/new')) {
      return windowLocation.replace('/new', '.json')
    }
    else if (windowLocation.includes('/trails')) {
      return windowLocation + '.json'
    }
    else {
      return windowLocation + "/trails.json"
    }
  }
  
  //Make an AJAX call for the current_user
  var currentUser;
   $.ajax({
     url: '/the_current_user',
     method: "GET",
     dataType: "JSON"
   }).done(function(user){
      console.log(user);
      currentUser = user;
   });

  var getUserTrails = function(map) {
    var currentUserId = currentUser.id
    var userTrailsLayer = L.mapbox.featureLayer()
    .loadURL("http://localhost:3000/users/" + currentUserId + "/trails.json")
    return userTrailsLayer
  };

  var allHikersTrails = function(map) {
    var allHikersLayer = L.mapbox.featureLayer().loadURL("http://localhost:3000/trails.json")
      return allHikersLayer
  }

  var removeAllLayers = function(map) {
    map.removeLayer(userTrailsLayer);
    map.removeLayer(allHikersLayer);
    map.removeLayer(drawControl);
  };

