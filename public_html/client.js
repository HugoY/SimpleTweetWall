/**
 client envoi search
 ->hashtag
 serveur newtweet
 newtweet 
 */

(function($) {

    var socket = io.connect('http://localhost:8080');
    var gaucheDroite = 0;

    // Envoie du hastage au serveur
    $('#hastagform').submit(function(event) {
        event.preventDefault();
        //console.log($('#hashtag').val());
        socket.emit('search', {
            hashtag: $('#hashtag').val()
        });
    })

    // Nouveau tweet
    socket.on('newtweet', function(message) {
        //console.log(message);
        console.log(typeof message.date);
        var msgtpl = $('#mustache-modele-tweet').html();
        var gauche = '<div class="col-sm-8 col-sm-offset-2">';
        var droite = '<div class="col-sm-8 col-sm-offset-4">';
        var cote;
        if(gaucheDroite % 2 === 0){
            cote = gauche;
        }else{
            cote = droite;
        }
        gaucheDroite++;
        $('#les-tweets').prepend('<div class="row tweet">'+cote + Mustache.render(msgtpl, message) + '</div></div>');
        
    });

})(jQuery); 