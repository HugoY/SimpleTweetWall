/**
client envoi search
->hashtag
serveur newtweet
newtweet 
*/

(function($){

	var socket = io.connect('http://localhost:8080');

	// Envoie du hastage au serveur
	$('#loginform').submit(function(event){
		event.preventDefault();
		socket.emit('search', {
		username  : $('#username').val(),
		mail    : $('#mail').val()
	});

	})

	// Récupération du ou des tweets
	socket.on('newusr', function(user) {
    $('#listusers').append('<li id=' +user.id +'>'+ user.username + '</li>'); //on modifie le code de la liste en ajoutant un id pour la suppression
});

	socket.on('disusr', function(user) {
    $('#' + user.id).remove(); //on supprime l'utilisateur de la liste
});
	socket.on('logged',function(){
		$('#login').fadeOut();
		$('#form').fadeIn();
		$('#users').fadeIn();
		$('#divMessage').fadeIn();
		$('#message').focus(); //met le focus pour la saisie du message
  });

  $('#form').submit(function(event) {
    event.preventDefault();
    socket.emit('newmsg', {message: $('#message').val()});
    $('#message').val(''); //pour éviter le flood...
    $('#message').focus(); //pour remettre le focus
  });

  socket.on('newmsg', function(message){
    
    var msgtpl = $('#msgtpl').html();
    
    $('#messages').append('<div class="message">' + Mustache.render(msgtpl,message) + '</div>');
    var wtf    = $('#messages');
  	var height = wtf[0].scrollHeight;
  	wtf.scrollTop(height);
});	

})(jQuery); 