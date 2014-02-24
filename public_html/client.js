/**
 client envoi search
 ->hashtag
 serveur newtweet
 newtweet 
 */

(function($) {

    var socket = io.connect('http://localhost:8080');

    // Envoie du hastage au serveur
    $('#hastagform').submit(function(event) {
        event.preventDefault();
        console.log($('#hashtag').val());
        socket.emit('search', {
            hashtag: $('#hashtag').val()
        });
    })
    
    // Nouveau tweet
    socket.on('newtweet', function(message) {
        console.log(message);
        var msgtpl = $('#mustache-modele-tweet').html();

        $('#les-tweets').append(' <div class="row tweet">' + Mustache.render(msgtpl, message) + '</div>');

    });
    
})(jQuery); 