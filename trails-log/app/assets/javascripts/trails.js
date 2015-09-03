var map;

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

  // START DASHBOARD/MAP
  L.mapbox.accessToken = 'pk.eyJ1IjoidGlzZGVyZWsiLCJhIjoiNDQ5Y2JiODdiZDZmODM0OWI0NmRiNDI5OGQzZWE4ZWIifQ.rVJW4H9TC1cknmRYoZE78w';
  map = L.mapbox.map('user-map', 'mapbox.run-bike-hike')
  map.addControl(L.mapbox.geocoderControl('mapbox.places'))
  map.setView([37.7833, -122.4167]);

  var userTrailsLayer = getUserTrails(map).addTo(map);
  var allHikersLayer = allHikersTrails(map);
  var photoLayer = hikerPhotos(map);

  var addHikeButton =  L.Control.extend({options: {position: 'topleft'},
    onAdd: function(map){
      var addHike = L.DomUtil.create('div', 'hikeButton leaflet-bar leaflet-control leaflet-control-button');
      L.DomEvent
      .addListener(addHike, 'click', L.DomEvent.stopPropagation)
      .addListener(addHike, 'click', L.DomEvent.preventDefault)

      addHike.style.backgroundColor = 'white';
      addHike.style.backgroundImage = "url(http://localhost:3000/Crosspin.png)";
      addHike.style.backgroundSize = "30px 30px";
      addHike.style.width = '30px';
      addHike.style.height = '30px';

      addHike.onclick = function(){
        directions = L.mapbox.directions({profile: 'mapbox.walking'});
        directionsLayer = L.mapbox.directions.layer(directions)
        .addTo(map);
        directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
        .addTo(map);
        directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
        .addTo(map);

        hideExtraPathControls();
      }
      return addHike;
    }
  });

var logHikeButton = new addHikeButton

userTrailsLayer.on("ready", function(event) {
  map.fitBounds(userTrailsLayer.getBounds());
  var hoveredTrailId;
  hoverNavToPopUp(userTrailsLayer);
  map.addLayer(photoLayer)
});

var hoverNavToPopUp = function(layer){

  $("[id^='trail']").on('mouseenter', function(event){
    hoveredTrailId = $(this).attr('id').slice(-1)
    layer.eachLayer(function(marker) {
      if (marker.feature.properties.id == hoveredTrailId){
        marker.openPopup();
      }
    })
  });

  $("[id^='trail']").on('mouseleave', function(event){
    layer.eachLayer(function(marker) {
      if (marker.feature.properties.id == hoveredTrailId){
        marker.closePopup();
      }
    });
  });
};

// *~**~**~**~**~**~**~**~**~**~**~**~**~*
photoLayer.on('layeradd', function(e) {
  var marker = e.layer;
  var slideshowContent = '';
  var feature = marker.feature;
  var images = feature.properties.images;
    // Set slideshow content - Check view-trail.js 
    slideshowContent = setSlideshowContent(images, slideshowContent);
    // Set popup content - Check view-trail.js 
    var popupContent = createPopUpForPhoto(feature, slideshowContent);
    // Bind popup for each marker to the content
    marker.bindPopup(popupContent,{
      closeButton: false,
      minWidth: 320,
    });
  });  

$('.map').on('click', '.popup .cycle a', function() {
  var $slideshow = $('.slideshow'),
  $newSlide;

  if ($(this).hasClass('prev')) {
    $newSlide = $slideshow.find('.active').prev();
    if ($newSlide.index() < 0) {
      $newSlide = $('.image').last();
    }
  } else {
    $newSlide = $slideshow.find('.active').next();
    if ($newSlide.index() < 0) {
      $newSlide = $('.image').first();
    }
  }

  $slideshow.find('.active').removeClass('active').hide();
  $newSlide.addClass('active').show();
  return false;
});
//*~**~**~**~**~**~**~**~**~**~**~**~**~*

  // Show hike page from both my trails list and hikers' trails list
  $('.navbar').on('click', "[id^='trail']", function(event){
    event.preventDefault();
    var clickedHikeId = $(this).attr('id').slice(-1)
    var currentTrail;
    $.ajax({
      url: '/the_current_trail_path/' + clickedHikeId,
      method: "GET",
      dataType: "JSON"
    }).done(function(response){
      currentTrail = response;
      renderTrail(currentTrail, map);
    }).fail(function(){
      console.log('There was a server problem.')
      console.log(response)
    });

    var urlVal = $(this).attr('href')
    $.ajax(urlVal).done(function(response){
      $('.navbar').children().hide()
      $('.navbar').prepend(response)
      zoomInHike(userTrailsLayer, clickedHikeId);
      zoomInHike(hikerTrailsLayer, clickedHikeId);
    })
  });

  // Return to main menu from trail-page
  $('.navbar').on('click', '#show-page-back', function(event){
    event.preventDefault();
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.main-menu').show();
    $('#nav-content').hide();
    $('.my-hikes-menu').hide();
    map.addLayer(userTrailsLayer);
    map.addLayer(photoLayer);
    map.fitBounds(userTrailsLayer.getBounds());
  })

  // Return to main menu from my-trails page
  $('#my-hikes-back').on('click', function(event){
    event.preventDefault();
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.my-hikes-menu').hide();
  });

  // Return to main menu from the log hike page
  $('.navbar').on('click', '#log-hike-back', function(event){
    event.preventDefault();
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.main-menu').show();
    map.removeControl(logHikeButton);
    if(directionsLayer){map.removeLayer(directionsLayer)}
  })

  // Return to main menu from all hikers page
  $('#all-hikers-back').on('click', function(event){
    event.preventDefault();
    $('.navbar').children().addClass('hideMenu');
    $('.main-menu').removeClass('hideMenu');
    $('.main-menu').show();
    $('.all-hikers-menu').hide();
    map.removeLayer(allHikersLayer);
  })

  // Return to main menu from the show other hikers list
  $('.navbar').on('click', '#show-user-back', function(event){
    event.preventDefault();
    $('.show-other-user-menu').hide();
    $('.main-menu').removeClass('hideMenu');
    $('.main-menu').show();
  })

  // Show the my trails menu
  $('#my-trails').on('click', function(event){
    event.preventDefault();
    var urlVal = $('#my-trails').attr('href')
    var typeVal = 'GET'
    $.ajax({
      url: urlVal,
      type: typeVal,
      dataType: 'json'
    }).done(function(response) {
      $('.main-menu').addClass('hideMenu');
      $('.my-hikes-menu').removeClass('hideMenu');
      $('.my-hikes-menu').show();
      $('.navbar').prepend(response)
    }).fail(function(response){
      console.log(response)
      console.log('The request did not go through.');
    })
    map.addLayer(userTrailsLayer);
    map.addLayer(photoLayer);
  });

  // ALL HIKERS

  // Show all-hikers menu
  $('#all-hikers').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.all-hikers-menu').removeClass('hideMenu');
    $('.all-hikers-menu').show();

    allHikersLayer.addTo(map)
    allHikersLayerBehavior();
  });

  // Add hover on all hikers layer
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
      allHikersLayer.eachLayer(function(marker) {
        if (marker.feature.properties.user === hoveredUserId){
          marker.closePopup();
        }
      })
    });
  };

  // Show specific hiker's trails and allow for hover
  var otherHikerListener = (function() {
    $(".other-hiker").on('click', function(event) {
      event.preventDefault();
      var urlVal = $(this).attr('href')
      var hikerId = $(this).parent().attr('id').slice(-1)
      $.ajax(urlVal)
      .done(function(response){
        map.removeLayer(userTrailsLayer);
        map.removeLayer(allHikersLayer);
        debugger
        $('.navbar').children().hide();
        $('.navbar').prepend(response);
        hikerTrailsLayer = hikerTrails(hikerId).addTo(map)
        hoverNavToPopUp(hikerTrailsLayer);
      })
      .fail(function(response){
        console.log("The request failed.")
      })
    })
  })()

  var directionsLayer;

  // LOG HIKE
  $('#log-hike').on('click', function(event) {
    event.preventDefault();
    $('.main-menu').addClass('hideMenu');
    $('.main-menu').hide();
    $('.log-hike-menu').removeClass('hideMenu');
    $('.log-hike-menu').show();

    map.removeLayer(userTrailsLayer);
    map.addControl(logHikeButton);
  });

  //START SUBMIT NEW HIKE
  $('.navbar').on("submit", '#new-trail-form', function(event){
    event.preventDefault();
      var userId = $('#user_trails_user_id').attr('value')
      var urlVal = '/users/' + userId + '/trails'
      var typeVal = $(this).attr('method')
      var fullPath = directions.query()
      var waypointString = "";

      for (var i = 0;i < fullPath["_waypoints"].length;i++){
        if (fullPath["_waypoints"].length !== 0){
          var wayPoint = fullPath["_waypoints"][i]["geometry"]["coordinates"]
          var waypointLons = wayPoint[0]
          var waypointLats = wayPoint[1]
          waypointString += waypointLons+","+waypointLats+";"
        }
        else {
          waypointString = ""
        }
      }
      var trailEndLat = fullPath["destination"]["geometry"]["coordinates"][1]
      $('#user_trails_trailend_lat').val(trailEndLat)
      var trailEndLon = fullPath["destination"]["geometry"]["coordinates"][0]
      $('#user_trails_trailend_lon').val(trailEndLon)
      var trailHeadLat = fullPath["origin"]["geometry"]["coordinates"][1]
      $('#user_trails_trailhead_lat').val(trailHeadLat)
      var trailHeadLon = fullPath["origin"]["geometry"]["coordinates"][0]
      $('#user_trails_trailhead_lon').val(trailHeadLon)
      var waypointPlusLonLat = trailHeadLon+","+trailHeadLat +";" + waypointString +trailEndLon+","+trailEndLat
      $('#user_trails_waypoints').val(waypointPlusLonLat)

      $.ajax({
        url: urlVal,
        type: typeVal,
        data: $('#new-trail-form').serialize()
      }).done(function(response) {
        console.log(response)
        console.log('Yay! request went through')
        $('.navbar').children().hide()
        $('.navbar').prepend(response)
        //remove the draw layer
        map.removeLayer(directionsLayer);
        map.removeControl(logHikeButton);
        //place the new Trail layer
        var trailId = $('.trail-id').text()
        var currentTrail;
        $.ajax({
          url: '/the_current_trail_path/' + trailId,
          method: "GET",
          dataType: "JSON"
        }).done(function(serverResponse){
          currentTrail = serverResponse;
          renderTrail(currentTrail, map);
        }).fail(function(){
          console.log('fail')
        })
      }).fail(function(response){
        console.log(response)
        console.log('request did not go through');
      });
    });


var bejewelGroup = new L.featureGroup()
bejewelGroup.addTo(map)


var drawControl = new L.Control.Draw({
  draw: {
    position: 'topleft'
  },
  edit: {
    featureGroup: bejewelGroup
  }
});
map.addControl(drawControl);









}); // END DOCUMENT READY

  

  //Make an AJAX call for the current_user
  var currentUser;
  $.ajax({
    url: '/the_current_user',
    method: "GET",
    dataType: "JSON"
  })
  .done(function(user){
    currentUser = user;
  });


  var getUserTrails = function(map) {
    var currentUserId = currentUser.id
    var userTrailsLayer = L.mapbox.featureLayer()
    .loadURL("http://localhost:3000/users/" + currentUserId + "/trails.json")
    return userTrailsLayer
  };

//Not currently in use, but this logic is used three times. How can I get it to work?
var getLastTrail = function(currentTrailId) {
    //var currentUserId = currentUser.id
    var currentTrail;
    $.ajax({
      url: '/the_current_trail_path/' + currentTrailId,
      method: "GET",
      dataType: "JSON"
    }).done(function(serverResponse){
      console.log(serverResponse)
      currentTrail = serverResponse;
      return currentTrail
    }).fail(function(){
      console.log('fail')
    })
  }

  var renderTrail = function(trail, map) {
    var startCoordinates = trail["origin"]["geometry"]["coordinates"].reverse();
    var endCoordinates = trail["destination"]["geometry"]["coordinates"].reverse();
    var pathCoordinates = trail["routes"][0]["geometry"]["coordinates"]

    for (var i = 0; i < pathCoordinates.length; i++){
      pathCoordinates[i] = pathCoordinates[i].reverse()
    }

    var polyline = L.polyline(pathCoordinates).addTo(map)
    $('path').attr('style', 'stroke:#3D0D3E !important')

    map.fitBounds(polyline.getBounds());
    var trailPointsLayer = L.mapbox.featureLayer().addTo(map);

    var startEndMarkers = [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": startCoordinates.reverse()
      },
      "properties": {
        "title": "Trailhead Marker",
        "icon": {
          "iconUrl": "http://localhost:3000/Pinadd.png",
                  "iconSize": [50, 50], // size of the icon
                  "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                  "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                  "className": "dot"
                }
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": endCoordinates.reverse()
              },
              "properties": {
                "title": "End of Trail Marker",
                "icon": {
                  "iconUrl": "http://localhost:3000/PinOK.png",
                  "iconSize": [50, 50],
                  "iconAnchor": [25, 25],
                  "popupAnchor": [0, -25],
                  "className": "dot"
                }
              }
            }];

      // Set a custom icon on each marker based on feature properties.
      trailPointsLayer.on('layeradd', function(e) {
        var marker = e.layer,
        feature = marker.feature;

        marker.setIcon(L.icon(feature.properties.icon));
      });

      // Add features to the map.
      trailPointsLayer.setGeoJSON(startEndMarkers);
    }

    var allHikersTrails = function(map) {
      var allHikersLayer = L.mapbox.featureLayer()
      .loadURL("http://localhost:3000/trails.json")
      return allHikersLayer
    }

    var hikerTrails = function(userId) {
      var hikerTrails = L.mapbox.featureLayer()
      .loadURL("http://localhost:3000/users/"+userId+"/trails.json")
      return hikerTrails
    }
    var hikerPhotos = function(map){
      photoLayer = L.mapbox.featureLayer()
      .loadURL("http://localhost:3000/users/1/trails.json")
      return photoLayer
    } 