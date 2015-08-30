
$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';
  var userMap = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
  .setView([37.7833, -122.4167], 12);
  getTrailPoints(userMap);
  userMap.featureLayer.on("ready", function(e) {
    getTrailPoints(userMap)
  })
});

var getTrailPoints = function(userMap) {
    var userPath = window.location
  $.ajax({
    url: userPath+'/trails',
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

var trailPopUp = function(userMap) {

}
