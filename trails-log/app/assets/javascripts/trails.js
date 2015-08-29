
$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';
  var map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
  .setView([37.7833, -122.4167], 12);
});
