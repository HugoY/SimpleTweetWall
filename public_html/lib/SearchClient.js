var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');

/**
 * Creates an instance of SearchClient.
 *
 * @constructor
 * @this {SearchClient}
 * @param {String} consumerKey OAuth consumer key.
 * @param {String} consumerSecret OAuth consumer secret.
 * @param {String} token OAuth token.
 * @param {String} tokenSecret OAuth token secret.
 */
var SearchClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);

    this._apiBaseUrlString = Constants.RestApiBaseURLString;
    this._apiVersion = Constants.RestApiVersion;
};

Util.inherits(SearchClient, Client);

/**
 * Returns tweets that match the specified parameters.
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/search">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
SearchClient.prototype.search = function(parameters, callback)
{
    console.log(parameters);
    console.log(callback);
    var q = parameters['q'];
    if (q === undefined)
    {
        throw new Error('Missing required parameter: q.');
    }
    
    this._createGetRequest('search/tweets', 'json', parameters, callback);
};

(function($){

  var socket = io.connect('http://localhost:8080');
    socket.on('tweetArrived',function(){
        console.log('TWEET ARRIVED !!!!!!!!!!!!!!!!!');
    });

    $('#form').submit(function(event) {
    event.preventDefault();
        io.sockets.emit('search','coucou');
    });
});



module.exports = SearchClient;
