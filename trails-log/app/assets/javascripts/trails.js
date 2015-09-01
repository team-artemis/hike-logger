$(document).on("ready", function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
    .addControl(L.mapbox.geocoderControl('mapbox.places'))
    .setView([37.7833, -122.4167], 12);

  var userTrailsLayer = getUserTrails(map).addTo(map);
  var allHikersLayer = allHikersTrails(map);
  var drawLayer = L.featureGroup().addTo(map);
  var drawControl = new L.Control.Draw({edit: {featureGroup: drawLayer}})


  // Make an AJAX call for the current_user
  // var currentUser;
  // $.ajax({
  //   url: "/current_user",
  //   method: "GET",
  //   dataType: "JSON"
  // }).done(function(user){
  //   currentUser = user;
  // })

  var otherHikerListener = function() {
    $(".other-hiker").on('click', function(event) {
      event.preventDefault();
      var url = $(this).attr('href')
      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'HTML'
      }).done(function(response){
        console.log(response)
        window.history.pushState(null, null, url)
        $('.main-menu').addClass('hideMenu');
        $('.my-hikes-menu').removeClass('hideMenu');
      }).fail(function(response){
        console.log("fail")
        console.log(response)
      })
      // $('.main-menu').addClass('hideMenu');
      // $('.my-hikes-menu').removeClass('hideMenu');
    })
  }
  
  otherHikerListener();

  userTrailsLayer.on("ready", function(e) {
    map.fitBounds(userTrailsLayer.getBounds());
    var trailPopUpOnHoverOnNavHover;
    $('.trailtitle').on('mouseenter', function(e){
      // re-factor b tag to an ID name.
      trailPopUpOnHoverOnNavHover = $(this).find("b").text()
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.title === trailPopUpOnHoverOnNavHover){
          marker.openPopup();
        }
      })
    });

    $('.trailtitle').on('mouseleave', function(e){
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.title === trailPopUpOnHoverOnNavHover){
          marker.closePopup();
        }
      })
    });
  })

  // Return to main menu
  $('.back-button').on('click', function(event){
    event.preventDefault();
    // window.location = currentUser["id"]
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('#add-trailhead-button').addClass('hidden');
    $("#save-trailhead-button").addClass('hidden')
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


    $('#add-trailhead-button').removeClass('hidden');
    $('#add-trailhead-button').on("click", function(event) {
      $(this).addClass('hidden');
      $("#save-trailhead-button").removeClass('hidden')
      addPathCreator();

      $('#mapbox-directions-origin-input').hide();
      $('#mapbox-directions-destination-input').hide();
      //$('.mapbox-directions-route').hide()
      $('#routes').hide();
      $('.mapbox-form-label').hide();
    })

    var addPathCreator = function(){
      directions = L.mapbox.directions({profile: 'mapbox.walking'});
      var directionsLayer = L.mapbox.directions.layer(directions)
          .addTo(map);
      var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
          .addTo(map);
      var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
          .addTo(map);
    }

     $("#save-trailhead-button").on("click", function(event) {
        event.preventDefault();
        var fullPath = directions.query()
        var wayPoints = fullPath["_waypoints"]
        var trailEndLat = fullPath["destination"]["geometry"]["coordinates"][0]
        var trailEndLon = fullPath["destination"]["geometry"]["coordinates"][1]
        var trailHeadLat = fullPath["origin"]["geometry"]["coordinates"][0]
        var trailHeadLon = fullPath["origin"]["geometry"]["coordinates"][1]
        debugger
      })

    //Hide all the stuff that we don't want


  }) // END LOG HIKE ON CLICK

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
      // alert('Yay! request went through')
      console.log(response)
    }).fail(function(response){
      console.log(response)
      // alert('request did not go through');
    });
    location.reload();

    //Perhaps use setLatLng() method to set the location to the hike you just added
})
//END SUBMIT new HIKE

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
  
  //Make an AJAX call for the current_user
  var currentUser;
   $.ajax({
     url: '/the_current_user',
     method: "GET",
     dataType: "JSON"
   }).done(function(user){
      console.log(user);
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

