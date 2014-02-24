var Twitter = require('./lib/Twitter'),
    http = require('http');

var twitterSearchClient = new Twitter.SearchClient(
    'Cu3Ylz9uiMpFLNvkhmI4Mw',
    'O2fFwBH6vnNp0pPpPocHt447m8iwSwwwe351bFRsOXw',
    '236763870-JLRvxZ3GL2XnFVEfsr1OyJ92tUyz7GP6vDzpwX7M',
    'lIotGP5eeo24XSf6KbQyCUy4Xfl16rj3KBNu6QMGVGURm'
);






httpServer = http.createServer(function(req,res) {
  console.log('une nouvelle connexion');
  res.end('Bienvenue');
});

httpServer.listen(8080);
var lastId = 0;

var io = require('socket.io').listen(httpServer);

/*twitterSearchClient.search({'q': '@vincent_voisin','count':20,'since_id':lastId}, function(error, result) {
    if (error)
    {
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    }

    if (result)
    {
        var jsonStr = JSON.stringify(result);
    var tweets = JSON.parse(jsonStr);

        console.log(typeof(tweets));
      //  console.log(result['statuses']['coordinates']);
        for(var id in tweets['statuses']){
            //console.log(tweets['statuses'][id]['user']['name']);
            var tweet = {
                            user: tweets['statuses'][id]['user']['name'],
                            profilepicture:   tweets['statuses'][id]['user']['profil_image_url'],
                            text:  tweets['statuses'][id]['text'],
                            date: tweets['statuses'][id]['create_at']
                        }
                        lastId = tweets['statuses'][id]['id'];
                        console.log(tweets['statuses'][id]['text']);
              io.sockets.emit('newtweet', tweet);
        }
    }
});*/
var lastId = 0;
io.sockets.on('connection',function(socket) {
    console.log()
  socket.on('search', function(hashtag){
    console.log("Demande de recherche de hashtag du client");
    console.log(hashtag);
    twitterSearchClient.search({'q': hashtag.hashtag, 'since_id':lastId}, function(error, result) {
    if (error)
    {
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    }

    if (result)
    {
        var jsonStr = JSON.stringify(result);
    var tweets = JSON.parse(jsonStr);

        //console.log(typeof(tweets));
      //  console.log(result['statuses']['coordinates']);
        for(var id in tweets['statuses']){
            //console.log(tweets['statuses'][id]['user']['name']);
            //console.log(tweets['statuses'][id]['text']);
            var tweet = {
                            user: tweets['statuses'][id]['user']['name'],
                            profilepicture:   tweets['statuses'][id]['user']['profile_image_url'],
                            text:  tweets['statuses'][id]['text'],
                            date: tweets['statuses'][id]['created_at']
                        }
                        if(id === 0) {
                            lastId = tweets['statuses'][id]['id'];
                        }
              io.sockets.emit('newtweet', tweet);
        }
    }
    });
  });

});