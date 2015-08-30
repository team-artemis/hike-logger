
$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';
  var userMap = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
  .setView([37.7833, -122.4167], 12);
  getTrailPoints(userMap);
  // Note: This featureLayer part is not what is putting the marker on the map
  // userMap.featureLayer.on("ready", function(e) {
  //   // getTrailPoints(userMap)
  // })

  var featureGroup = L.featureGroup().addTo(userMap);

  var drawControl = new L.Control.Draw({
    edit: {
      featureGroup: featureGroup
    }
  }).addTo(userMap);

  userMap.on('draw:created', function(e) {
    featureGroup.addLayer(e.layer);
    var markerLat = e.layer._latlng["lat"]
    var markerLng = e.layer._latlng["lng"]
    
  });
});

var getTrailPoints = function(userMap) {
  var location = window.location.pathname
  if (location.includes('trails')) {
      userPath = location
    }
    else {
      userPath = location + "/trails"
    }
    console.log(userPath)
  $.ajax({
    url: userPath,
    dataType: 'JSON'
    })
  .done(function(response){
    L.geoJson(response, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Trail: " + feature.properties.title + " Review: " + feature.properties.review);
    }
    }).addTo(userMap)
    })
  .fail(function(response){
      console.log(response);
    })
  };

/////// drop pin pseudocode ///////
// Place draggable pin on the map
// User drags pin to desired trailhead
// User clicks button to save the pin
// Draggable marker is hidden
// Single marker is created at the click location
// Marker location is added to the add trail form
// New marker/trailhead created. 


