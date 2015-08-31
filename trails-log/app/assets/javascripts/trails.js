$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var userMap = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
    .addControl(L.mapbox.geocoderControl('mapbox.places'))
    .setView([37.7833, -122.4167], 12);


  // getUserTrails() is returning the result of .featureLayer.loadURL.addTo which grabs the marker coordinates and adds to the map.
  userTrailsLayer = getUserTrails(userMap);

  // When the layer is ready, it zooms in the map to show all markers.
  userTrailsLayer.on("ready", function(e) {
    userMap.fitBounds(userTrailsLayer.getBounds());
    var trailname;
    $('.trailtitle').on('mouseenter', function(e){
      trailname = $(this).find("b").text()
      userTrailsLayer.eachLayer(function(marker) {
        // if ($(this a span b))
        if (marker.feature.properties.title === trailname){
          marker.openPopup();
        }
      })
    });

    $('.trailtitle').on('mouseleave', function(e){
      userTrailsLayer.eachLayer(function(marker) {
        // if ($(this a span b))
        if (marker.feature.properties.title === trailname){
          marker.closePopup();
        }
      })
    });
  })

// On click of all-hikers, hide draw controls and show all users hikes
  $('#all-hikers').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/users",
      method: "GET",
      dataType: "HTML"
    }).done(function(response) {
      $('.navbar').html(response);
      console.log(response);
    })

    var allHikersLayer = allHikersTrails(userMap);
    userMap.addLayer(allHikersLayer);
  })

// On click of log-hike hide user's trails and show draw controls  
  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: window.location + "/trails/new",
      method: "GET",
      dataType: "HTML"
    }).done(function(response) {
      $('.navbar').html(response);
    })

    userMap.removeLayer(userTrailsLayer);
    // removeAllLayers(userMap);
    var featureGroup = L.featureGroup().addTo(userMap);
    var drawControl = 
      new L.Control.Draw({
        position: 'topright',
        edit: {
          featureGroup: featureGroup
        }
      }).addTo(userMap);

    userMap.on('draw:created', function(e) {
      featureGroup.addLayer(e.layer);
      var markerLat = e.layer._latlng["lat"]
      $('#user_trails_trailhead_lat').val(markerLat)
      var markerLng = e.layer._latlng["lng"]
      $('#user_trails_trailhead_lon').val(markerLng)
    });
    
  }) // END LOG HIKE ON CLICK
}); // END DOCUMENT READY

// This loads from /trails.json and adds markers to the map
// It is reaturning this as the variable featureLayer to be used later as userTrailsLayer
  var getUserTrails = function(userMap) {
    var featureLayer = L.mapbox.featureLayer()
    .loadURL(userPath())
    .addTo(userMap);
    return featureLayer
  };

// Get all hikers geojsons
  var allHikersTrails = function(userMap) {
    var allHikersLayer = L.mapbox.featureLayer().loadURL("http://localhost:3000/trails.json").addTo(userMap);
      return allHikersLayer
  }

// Show map from either /users/:id or /users/:id/trails
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

// Will remove all layers from map
  // var removeAllLayers = function(userMap) {
  //   userMap.eachLayer(function(layer) {
  //     // if(layer._tilejson.name != "Run, Bike, and Hike");
  //     userMap.removeLayer(layer);
  //   })
  // }

// OLD AJAX CALL
//   $.ajax({
//     url: userPath,
//     dataType: 'JSON'
//     })
//   .done(function(response){
//     console.log(response);
//     L.geoJson(response, {
//       onEachFeature: function(feature, layer) {
//         layer.bindPopup("Trail: " + feature.properties.title + " Review: " + feature.properties.review);
//       }
//     }).addTo(userMap)
//   })
//   .fail(function(response){
//       console.log(response);
//     });


