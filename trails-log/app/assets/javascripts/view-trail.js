// Zoom in on hike pages
var zoomInHike = function(layer, clickedHikeId){
	layer.eachLayer(function(marker){
		if (marker.feature.properties.id == clickedHikeId){
			map.setView(marker._latlng, 15);
		}
	})
};

var setSlideshowContent = function(images, slideshowContent){
	if(images){
		for(var i = 0; i < images.length; i++) {
			var img = images[i];

			slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
			'<img src="' + img[0] + '" />' +
			'<div class="caption">' + img[1] + '</div>' +
			'</div>';
		}
	}
	return slideshowContent
}

var createPopUpForPhoto = function(feature, slideshowContent){
	var popUpContent = '<div id="' + feature.properties.id + '" class="popup">' +
	'<h2>' + feature.properties.title + '</h2>' +
	'<div class="slideshow">' +
	slideshowContent +
	'</div>' +
	'<div class="cycle">' +
	'<a href="#" class="prev">&laquo; Previous</a>' +
	'<a href="#" class="next">Next &raquo;</a>' +
	'</div>'
	'</div>';
	return popUpContent;
}

