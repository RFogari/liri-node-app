require('dotenv').config();

var keys = require('./keys.js')
//console.log(keys);

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(key.twitter);

var fs = require('fs');

//twitter code:
if(process.argv[2] === 'my-tweets'){

    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });

      //parameters for call function - include screen name and max tweet count
      var params = {screen_name: 'RCB2018', count: 20};
      client.get('statuses/user_timeline', params, function(error, tweets, response){
        //console log should there be an error, if no error code will proceed to document the tweets.
        console.log(error); 
        if (!error) {
            
            for (var i = 0; i < tweets.length; i++){
                
                var newTweet = tweets[i].text;

                
                console.log("---------------------")
                console.log(newTweet);
                
            };

            var newLine = "n/------------------/n";

            /*fs.appendFile('log.txt', newLine + tweets[i].text, function(err){
                if (err) throw err;
                console.log('Data Appended!');
            });*/
        };
    })
}

//spotify api




    var Spotify = require('node-spotify-api');

    function SpotifyAPI(){

    if(process.argv[2] === 'spotify-this-song'){

        var spotify = new Spotify(keys.spotify);

        musicChoice = process.argv[3];

        if(!musicChoice){
            musicChoice = 'The Sign'
        }

        spotify.search({type: 'track', query: musicChoice,}, function(err, data,){

            console.log('Music Choice:  ' + musicChoice);

            if(err){
                return console.log('Error occurred: ' + err);
            }
            console.log('Track Name:  ' + data.tracks.items[0].name);
            console.log('Artist(s) for this song:  ' + data.tracks.items[0].artists[0].name);
            console.log('Albumn for this song: ' + data.tracks.items[0].album.name);
            console.log('Preview Link: ' + data.tracks.items[0].preview_url);
        })

    }
};

SpotifyAPI();
   

        


//OMDB API - Movie-This

var request = require('request');




  if(process.argv[2] === 'movie-this'){

    // if user enters a movie title

        var movieName = process.argv[3];
       
        //if user does not enter a movie title this will default to Mr. Nobody
        if( !movieName){
            movieName = 'Mr. Nobody';
        }

        //request made to API
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=full&apikey=trilogy', function(error, response, body) {

        

    //console log JSON response data
                    
                    console.log("Movie Title:   " + JSON.parse(body).Title);
                    console.log('______________________________________');
                    
                    console.log("Release Year:   " + JSON.parse(body).Year);
                    console.log('______________________________________');
                    
                    console.log("IMDB Rating:   " + JSON.parse(body).imdbRating)
                    console.log('______________________________________');

                    console.log('Rotten Tomatoes Rating For this Movie:   ' + JSON.parse(body).Ratings[2].Value);
                    console.log('______________________________________');

                    console.log('Country where this movie was produced:   ' + JSON.parse(body).Country);
                    console.log('______________________________________');

                    
                    console.log('Language of this movie:  ' + JSON.parse(body).Language);
                    console.log('______________________________________');

                    console.log('Movie Plot:   ' + JSON.parse(body).Plot);
                    console.log('______________________________________');

                    console.log('Movie Actors:   ' + JSON.parse(body).Actors);
                    console.log('______________________________________');
        
            
        })}

        /// Do what it says!

        var fs = require('fs');

        if(process.argv[2] === 'do-what-it-says'){
            
            fs.readFile('random.txt', 'utf8', function(error, data){

                if(error) {
                    return console.log(error);
                }

                //console data read from file
                console.log(data);

                //split data in file into an array
                var dataArray = data.split(',');

                //declare the variables from the array
                process.argv[2] = dataArray[0];
                process.argv[3] = dataArray[1];

                //pass the data array variables into the Spotify API
                
                musicChoice = dataArray[1];
                console.log(musicChoice);
                
                //Spotify API set as a function as this is used for two arguments
                SpotifyAPI();
            
            })

        }
        