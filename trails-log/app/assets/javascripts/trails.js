$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
    .addControl(L.mapbox.geocoderControl('mapbox.places'))
    .setView([37.7833, -122.4167], 12);

  var userTrailsLayer = getUserTrails(map).addTo(map);
  var allHikersLayer = allHikersTrails(map);
  var drawLayer = L.featureGroup().addTo(map);
  var drawControl = new L.Control.Draw({edit: {featureGroup: drawLayer}})

  userTrailsLayer.on("ready", function(e) {
    map.fitBounds(userTrailsLayer.getBounds());
    var trailname;
    $('.trailtitle').on('mouseenter', function(e){
      trailname = $(this).find("b").text()
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.title === trailname){
          marker.openPopup();
        }
      })
    });

    $('.trailtitle').on('mouseleave', function(e){
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.title === trailname){
          marker.closePopup();
        }
      })
    });
  })
  
  // Return to main menu
  $('.back-button').on('click', function(event){
    event.preventDefault();
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

  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.log-hike-menu').removeClass('hideMenu');
    map.removeLayer(userTrailsLayer)

    if ($('div.leaflet-draw').length) {
      $('div.leaflet-draw').show();
    }
    else {
      drawControl.addTo(map)
    }
    map.on('draw:created', function(e) {
      drawLayer.addLayer(e.layer);
      var markerLat = e.layer._latlng["lat"]
      $('#user_trails_trailhead_lat').val(markerLat)
      var markerLng = e.layer._latlng["lng"]
      $('#user_trails_trailhead_lon').val(markerLng)
    });
    
  }) // END LOG HIKE ON CLICK
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

  var getUserTrails = function(map) {
    var userTrailsLayer = L.mapbox.featureLayer()
    .loadURL(userPath())
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


