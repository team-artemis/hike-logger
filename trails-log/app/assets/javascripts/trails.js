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
  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: window.location + "/trails/new",
      method: "GET",
      dataType: "HTML"
    }).done(function(response) {
      console.log(response);
      $('.navbar').html(response);
    })
    var featureGroup = L.featureGroup().addTo(userMap);
    var drawControl = 
      new L.Control.Draw({
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
      console.log($('#user_trails_trailhead_lon').val())
    });
    
  }) // END LOG HIKE ON CLICK

}); // END DOCUMENT READY

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
