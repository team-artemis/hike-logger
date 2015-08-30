$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var userMap = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
  .addControl(L.mapbox.geocoderControl('mapbox.places'))
  .setView([37.7833, -122.4167], 12);

  // getUsersTrails() is returning the result of .featureLayer.loadURL.addTo which grabs the marker coordinates and adds to the map.
  userTrailsLayer = getUsersTrails(userMap);

  // When the layer is ready, it zooms in the map to show all markers.
  userTrailsLayer.on("ready", function() {
    userMap.fitBounds(userTrailsLayer.getBounds());
  })

  // This creates a featuregroup and adds it to the map
  var featureGroup = L.featureGroup().addTo(userMap);

  // This creates a draw controls menu with an edit option to "save" the new pin, this only makes the pin non-draggable and a able to be added to the featureGroup variable from line 17.
  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: featureGroup
    }
  }).addTo(userMap);

  // When a draw feature is created, this adds it as a layer to the featureGroup variable on line 17. It also saves to variables the lat/lon of the marker.
  userMap.on('draw:created', function(e) {
    featureGroup.addLayer(e.layer);
    var markerLat = e.layer._latlng["lat"]
    var markerLng = e.layer._latlng["lng"]

  });
});

// This loads from /trails.json and adds markers to the map
// It is reaturning this as the variable featureLayer to be used later as userTrailsLayer
  var getUsersTrails = function(userMap) {
    var featureLayer = L.mapbox.featureLayer()
    .loadURL(userPath())
    .addTo(userMap);
    return featureLayer
  };

// Show map from either /users/:id or /users/:id/trails
  var userPath = function(){
    var windowLocation = window.location.pathname
    if (windowLocation.includes('trails')) {
      return windowLocation + ".json"
    }
    else {
      return windowLocation + "/trails.json"
    }
  }
/////// drop pin pseudocode ///////
// Place draggable pin on the map
// User drags pin to desired trailhead
// User clicks button to save the pin
// Draggable marker is hidden
// Single marker is created at the click location
// Marker location is added to the add trail form
// New marker/trailhead created.

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
