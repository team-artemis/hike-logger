// trails = angular.module('trails', [])
// All angular stuff here

$(document).ready(function(){

$('a').on('click', function(event){
	event.preventDefault();
	console.log("you prevented default");
	
	$.ajax({
			url: '/users',
			type: 'get',
			dataType: 'json'
		}).done(function(response){
			console.log("You win!");
			console.log(response);
			window.location = '/users'
		}).fail(function(response){
			console.log(response);
		})
	})
});
