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
  });

  // Nouveau tweet
  socket.on('newtweet', function(message) {
    console.log(message);
    var msgtpl = $('#mustache-modele-tweet').html();

    message.date = formatDate(message.date);
    $('#les-tweets').append('<div class="row tweet">' + Mustache.render(msgtpl, message) + '</div>');

  });

  var formatDate = function(dateStr) {
    var date = dateStr.split(" ");
    switch (date[0])
    {
      case "Mon":
        date[0] = "Lundi";        
        break;
      case "Tue":
        date[0] = "Mardi";
        break;
      case "Wed":
        date[0] = "Mercredi";
        break;
      case "Thu":
        date[0] = "Jeudi";
        break;
      case "Fri":
        date[0] = "Vendredi";
        break;
      case "Sat":
        date[0] = "Samedi";
        break;
      case "Sun":
        date[0] = "Dimanche";
        break;
      default:
        break;
    }
    // chg mois et num jour
    return date;
  };

})(jQuery);