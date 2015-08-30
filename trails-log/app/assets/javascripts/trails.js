
$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';
  var userMap = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
  .setView([37.7833, -122.4167], 12);
  getTrailPoints(userMap);
  userMap.featureLayer.on("ready", function(e) {
    console.log("inside featurelayer.on")
    getTrailPoints(userMap)
  })
});

var getTrailPoints = function(userMap) {
  console.log("inside gettrailpoints");
  $.ajax({
    url: '/users/2/trails',
    dataType: 'JSON'
    })
  .done(function(response){
    L.geoJson(response).addTo(userMap)
    })
  .fail(function(response){
      console.log("Failed");
      console.log(response);
    })
  };
