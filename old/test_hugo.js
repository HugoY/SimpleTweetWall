var Twitter = require('./node-twitter/lib/Twitter');

var twitterSearchClient = new Twitter.SearchClient(
    'Wg4uBFwxyulK5oEw4zgXYg',
    'vvhm5uF6DucDVrQ9CUGMhSKBOM2TYnSTLTFTkDY3Zg',
    '162334880-JiqzO2YZu0eCrpOt7WR5XdfxEaEYDertgWx1IqZS',
    '011JkxG1gzwsDM2ofzqJd9Cz6HYPXwS7FmFPO9P0rxsd0'
);

twitterSearchClient.search({'q': 'node.js'}, function(error, result) {
    if (error)
    {
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    }

    if (result)
    {
        //console.log(result);

        obj = JSON.parse(result);
        console.log(obj);
    }
});