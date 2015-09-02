$(document).on("ready", function() {
// These must be the first lines in the js file
// They toggle the login/signup forms on the landing page
  $('.landing-wrapper').on('click', '.sign-up', function(event){
    event.preventDefault();
      $('.login-wrapper').addClass('hideMenu');
      $('.signup-wrapper').removeClass('hideMenu');
  })

  $('.landing-wrapper').on('click', '.login-link', function(event){
    event.preventDefault();
    $('.login-wrapper').removeClass('hideMenu');
    $('.signup-wrapper').addClass('hideMenu');
  })

  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';

  var map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
    .addControl(L.mapbox.geocoderControl('mapbox.places'))
    .setView([37.7833, -122.4167]);

  var userTrailsLayer = getUserTrails(map).addTo(map);
  var allHikersLayer = allHikersTrails(map);

  userTrailsLayer.on("ready", function(event) {
    map.fitBounds(userTrailsLayer.getBounds());

    // Hovering on the trail in the navbar opens pop up
    var hoveredTrailId;
    $("[id^='trail']").on('mouseenter', function(event){
      hoveredTrailId = $(this).attr('id').slice(-1)
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.id == hoveredTrailId){
          marker.openPopup();
        }
      })
    });

    


    $("[id^='trail']").on('mouseleave', function(event){
      userTrailsLayer.eachLayer(function(marker) {
        if (marker.feature.properties.id == hoveredTrailId){
          marker.closePopup();
        }
      });

    });
  });

//*~**~**~**~**~**~**~**~**~**~**~**~**~*
  var myLayer = L.mapbox.featureLayer().addTo(map);

  // Set the geojson data
  var geoJson = myLayer.loadURL("http://localhost:3000/users/1/trails.json") 

    //On add of the layer
    myLayer.on('layeradd', function(e) {
    var marker = e.layer,
    feature = marker.feature;
    //Craft the popup content
      var popupContent =  
      '<a target="_blank" class="popup" href="' + feature.properties.title + '">' + '<img src="' + feature.properties.images[1] + '" />' + feature.properties.review +'</a>';

      //bindpopup of the popupcontent
      marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320,
      });
    });
    //Add layer w/geojson data (currently in global)
    myLayer.setGeoJSON(geoJson);

//*~**~**~**~**~**~**~**~**~**~**~**~**~*


  // Show hike page from both my trails list and hikers' trails list
 $('.navbar').on('click', "[id^='trail']", function(event){
      event.preventDefault();
      var clickedHikeId = $(this).attr('id').slice(-1)
      var urlVal = $(this).attr('href')
      $.ajax(urlVal).done(function(hikeInfo){
        $('.navbar').children().hide()
        $('.navbar').prepend(hikeInfo)
        userTrailsLayer.eachLayer(function(marker){
          if (marker.feature.properties.id == clickedHikeId){
             map.setView(marker._latlng, 15);
          }
        })
      })
    });

  // Return to main menu
  $('.back-button').on('click', function(event){
    event.preventDefault();
    console.log("back button working")
    // window.location = currentUser["id"]
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    //REFACTORED ALERT: Andrew removed add and save trailhead buttons here
    $('.leaflet-draw').hide()
    map.addLayer(userTrailsLayer)
    map.removeLayer(allHikersLayer);
  });

  // Show the my trails menu
  $('#my-trails').on('click', function(event){
    event.preventDefault();
    var urlVal = $('#my-trails a').attr('href')
    var typeVal = 'GET'
    $.ajax({
      url: urlVal,
      type: typeVal,
      dataType: 'json'
    }).done(function(response) {
      console.log(response)
      console.log('Yay! request went through')
      $('.main-menu').addClass('hideMenu');
      $('.my-hikes-menu').removeClass('hideMenu');
      //$('.navbar').children().hide()
      $('.navbar').prepend(response)
    }).fail(function(response){
      console.log(response)
      console.log('request did not go through');
    })
    map.addLayer(userTrailsLayer);
  });

  // ALL HIKERS

  // Show all-hikers menu
  $('#all-hikers').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.all-hikers-menu').removeClass('hideMenu');
    allHikersLayer.addTo(map)
    allHikersLayerBehavior();
  });

  var allHikersLayerBehavior = function() {
    map.fitBounds(allHikersLayer.getBounds());
    // Hover user's nav item to highlight their markers
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

  var otherHikerListener = (function() {
    $(".other-hiker").on('click', function(event) {
      event.preventDefault();
      var urlVal = $(this).attr('href')
      $.ajax(urlVal)
      .done(function(response){
        $('.navbar').children().hide()
        $('.navbar').prepend(response)
      })
      .fail(function(response){
        console.log("The request failed.")
      })
    })
  })()

// LOG HIKE
  //START LOG HIKE ON CLICK
  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.log-hike-menu').removeClass('hideMenu');
    map.removeLayer(userTrailsLayer)
    var addPathCreator = function(){
      directions = L.mapbox.directions({profile: 'mapbox.walking'});
      var directionsLayer = L.mapbox.directions.layer(directions)
          .addTo(map);
      var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
          .addTo(map);
      var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
          .addTo(map);
    }
    addPathCreator();
      $('#mapbox-directions-origin-input').hide();
      $('#mapbox-directions-destination-input').hide();
      $('#routes').hide();
      $('.mapbox-form-label').hide();


  }); // END LOG HIKE ON CLICK

  //START SUBMIT NEW HIKE
  $('.navbar').on("submit", '#new-trail-form', function(event){
    event.preventDefault();
      //var urlVal = $(this).attr('action')
      var userId = $('#user_trails_user_id').attr('value')
      var urlVal = '/users/' + userId + '/trails'
      var typeVal = $(this).attr('method')
      var fullPath = directions.query()
      var wayPoints = fullPath["_waypoints"]
      $('#user_trails_waypoints').val(wayPoints)
      var trailEndLat = fullPath["destination"]["geometry"]["coordinates"][1]
      $('#user_trails_trailend_lat').val(trailEndLat)
      var trailEndLon = fullPath["destination"]["geometry"]["coordinates"][0]
      $('#user_trails_trailend_lon').val(trailEndLon)
      var trailHeadLat = fullPath["origin"]["geometry"]["coordinates"][1]
      $('#user_trails_trailhead_lat').val(trailHeadLat)
      var trailHeadLon = fullPath["origin"]["geometry"]["coordinates"][0]
      $('#user_trails_trailhead_lon').val(trailHeadLon)

    $.ajax({
        url: urlVal,
        type: typeVal,
        data: $('#new-trail-form').serialize()
      }).done(function(response) {
        console.log(response)
        console.log('Yay! request went through')
        $('.navbar').children().hide()
        $('.navbar').prepend(response)
      }).fail(function(response){
        console.log(response)
        console.log('request did not go through');
      });
      //location.reload();
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

