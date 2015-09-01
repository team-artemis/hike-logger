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
    var hoveredTrailId;
    $("[id^='trail']").on('mouseenter', function(e){
      hoveredTrailId = $(this).attr('id').slice(-1)
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.id == hoveredTrailId){
          marker.openPopup();
        }
      })
    });

    $("[id^='trail']").on('mouseleave', function(e){
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.id == hoveredTrailId){
          marker.closePopup();
        }
      });
    });
  });

  var allHikersLayerBehavior = function() {
    map.fitBounds(allHikersLayer.getBounds());
    var hoveredUserId;
    $("[id^='hiker']").on('mouseenter', function(e){
      var hoveredUserId = $(this).attr('id').slice(-1)
      allHikersLayer.eachLayer(function(marker) {
        if (marker.feature.properties.user == hoveredUserId){
          marker.openPopup();
        }
      })
    });

    $("[id^='hiker']").on('mouseleave', function(e){
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.user === hoveredUserId){
          marker.closePopup();
        }
      })
    });
  };

  // ajax call for hike page
  $("[id^='trail']").on('click', function(event){
    e.preventDefault;
    var urlVal = $(this).attr('action')
    var typeVal = $(this).attr('method')
    $.ajax({
      url: urlVal,
      type: typeVal
    }).done(function(hikeInfo){
      console.log(hikeInfo);
      console.log("Yay");
    }).fail(function(hikeInfo){
      console.log(hikeInfo);
      console.log("Nay");
    })
  });

  // Return to main menu
  $('.back-button').on('click', function(event){
    event.preventDefault();
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.leaflet-draw').hide()
    map.addLayer(userTrailsLayer)
    map.removeLayer(allHikersLayer);
  });

  // Show the my trails menu
  $('#my-trails').on('click', function(event){
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.my-hikes-menu').removeClass('hideMenu');
    map.addlayer(userTrailsLayer);
  });

  // Show all-hikers menu
  $('#all-hikers').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.all-hikers-menu').removeClass('hideMenu');
    allHikersLayer.addTo(map)
    allHikersLayerBehavior();
  });

  //START LOG HIKE ON CLICK
  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.log-hike-menu').removeClass('hideMenu');
    map.removeLayer(userTrailsLayer)

    var trailheadMarker = L.marker([37.7833, -122.4167], {
      icon: L.mapbox.marker.icon({
          'marker-color': '#f86767'
        }),
        draggable: true
    }).addTo(map);

    // every time the marker is dragged, update the coordinates container
    trailheadMarker.on('dragend', onDragEnd)

    // Set the initial marker coordinate on load.
    onDragEnd();

    function onDragEnd() {
        var m = trailheadMarker.getLatLng();
        $('#user_trails_trailhead_lat').val(m.lat)
        $('#user_trails_trailhead_lon').val(m.lng)
    }
  }); // END LOG HIKE ON CLICK

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
        console.log(response)
        console.log('Yay! request went through')
      }).fail(function(response){
        console.log(response)
        console.log('request did not go through');
      });
      location.reload();
  });
  //END SUBMIT NEW HIKE

}); // END DOCUMENT READY
  
  //Make an AJAX call for the current_user
  var currentUser;
   $.ajax({
     url: '/the_current_user',
     method: "GET",
     dataType: "JSON"
   }).done(function(user){
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
