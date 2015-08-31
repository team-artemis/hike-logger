$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
    .addControl(L.mapbox.geocoderControl('mapbox.places'))
    .setView([37.7833, -122.4167], 12);


  // getUserTrails() is returning the result of .featureLayer.loadURL.addTo which grabs the marker coordinates and adds to the map.
  userTrailsLayer = getUserTrails(map);

  // When the layer is ready, it zooms in the map to show all markers.
  userTrailsLayer.on("ready", function(e) {
    map.fitBounds(userTrailsLayer.getBounds());
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
  var drawLayer = L.featureGroup().addTo(map);
  var drawControl = new L.Control.Draw({edit: {featureGroup: drawLayer}})

  $('#my-trails').on('click', function(event){
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.all-hikes-menu').removeClass('hideMenu');
  })

  $('.back-button').on('click', function(event){
    event.preventDefault();
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.leaflet-draw').hide()
    // removeAllLayers(map);
    // map.removeLayer(drawLayer);
  })

  var allHikersLayer = allHikersTrails(map);
// On click of all-hikers, hide draw controls and show all users hikes
  $('#all-hikers').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/users",
      method: "GET",
      dataType: "HTML"
    }).done(function(response) {
      $('.navbar').html(response);
    })
    removeAllLayers(map);
    map.addLayer(allHikersLayer);
  })

  // WHAT THE @#!#$#!#%#!!@#$
    // console.log(drawLayer instanceof L.Control.Layers)
    // console.log(allHikersLayer instanceof L.featureLayer)
    // console.log(userTrailsLayer instanceof L.featureLayer)
    // console.log(drawControl instanceof L.featureLayer)

// On click of log-hike hide user's trails and show draw controls  
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
// This loads from /trails.json and adds markers to the map
// It is reaturning this as the variable featureLayer to be used later as userTrailsLayer
  var getUserTrails = function(map) {
    var featureLayer = L.mapbox.featureLayer()
    .loadURL(userPath())
    .addTo(map);
    return featureLayer
  };

// Get all hikers geojsons
  var allHikersTrails = function(map) {
    var allHikersLayer = L.mapbox.featureLayer().loadURL("http://localhost:3000/trails.json").addTo(map);
      return allHikersLayer
  }

// Will remove all layers from map
  var removeAllLayers = function(map) {
    map.removeLayer(userTrailsLayer);
    map.removeLayer(allHikersLayer);
    map.removeLayer(drawControl);
  };



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
//     }).addTo(map)
//   })
//   .fail(function(response){
//       console.log(response);
//     });

// OLD LOG HIKE AJAX
    // $.ajax({
    //   url: window.location + "/trails/new",
    //   method: "GET",
    //   dataType: "HTML"
    // }).done(function(response) {
    //   $('.navbar').html(response);
    // })

    // map.removeLayer(userTrailsLayer);
    // var featureGroup = L.featureGroup().addTo(map);
    // var drawControl = 
    //   new L.Control.Draw({
    //     position: 'topright',
    //     edit: {
    //       featureGroup: featureGroup
    //     }
    //   }).addTo(map);



// Show/hide the draw controls and add stuff to the map
    // if ($('div.leaflet-draw').length) {
    //   $('div.leaflet-draw').show();
    // }
    // else {
    //   drawControl.addTo(map)
    // }
    // map.on('draw:created', function(e) {
    //   drawLayer.addLayer(e.layer);
    //   var markerLat = e.layer._latlng["lat"]
    //   $('#user_trails_trailhead_lat').val(markerLat)
    //   var markerLng = e.layer._latlng["lng"]
    //   $('#user_trails_trailhead_lon').val(markerLng)
    // });
