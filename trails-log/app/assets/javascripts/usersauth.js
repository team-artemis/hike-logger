$('document').ready(function(){
  login();
})

var login = function (){
  $('.login').on('click', function(event){
      event.preventDefault();
    $.ajax({
      url: '/sessions/new',
      method: 'GET',
      dataType: 'html'
     }).done(function(serverResponse){
        $('.landing-div').empty();
        $('.landing-div').html('hey');
        console.log(response)
     }).fail(function(serverResponse){
        console.log('it failed');
        console.log(serverResponse);
     })
  });
}

