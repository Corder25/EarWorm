// make a variable 
var spotifyapi = (function() {
    //put client Id and the secret 
    var clientId = '3526248eace94fc2b6e60ab73ebb3bd3';
    var clientSecret = '30e2d75b58bc4ab18c562044d1daff40';

    // make a var to get the authoization token ; use an async/await to get the promise faster
    var _getToken = async () => {
        // await the promise and use fetch method to get the api 
        var result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                // you need this to gain access to the api 
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        // await for the data and turn it into json
        var data = await result.json();
        return data.access_token;
    }
    // make a var to get the artist 
    // async function with token parameter you need this to get access to the spotify api
    var _getArtist = async (token,genreId) => {

        var result = await fetch(`https://api.spotify.com/v1/artists/${genresid}?`, {
            // use the GET method with authoization from spotify  
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
            
        });

        var data = await result.json();
        console.log(data);
        return data.items;
    }
    // next method make a var
    var _getGenres = async (token) => {
        //useing template literals uses expressions straight from the string
        var result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        
        var data = await result.json();
        // return the array stored in the object 
        return data.categories.items;
    }
    // do the same thing as the first one but use token and genreId for the parameters
    var _getPlaylistGenre = async (token, genreId) => {
        // set the limit to how many you want to see populate 
        var limit = 7;
        // get the endpoints with the limit in there
        var result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        var data = await result.json();
        return data.playlists.items;
    }
    // repeat steps to get the tracks 
    var _getTracks = async (token, tracksEndPoint) => {
        // make a limit 
        var limit = 7;

        var result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        var data = await result.json();
        console.log(data);
        return data.items;
    }
        
    var _getTrack = async (token, trackEndPoint) => {

        var result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        var data = await result.json();
        console.log(data);
        return data;
    }
    // return methods outside of scope
    // using closures because its the public decalared get token method talking to the private implimented get token method
    return {
        getToken() {
            return _getToken();
        },
        getArtist(token , genresId) {
            return _getArtist(token , genresId);
        },

        getGenres(token) {
            return _getGenres(token);
        },

        getPlaylistGenre(token, genreId) {
            return _getPlaylistGenre(token, genreId);
        },

        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },

        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();// the public method will be called in the main module 


// Next Module
var UI = (function() {

    //object to hold references to html selectors
    //aviod using multiple selectors
    var DOMEl = {
        hToken: '#token', ///************use your own elements to change this*********/////
        selectArtist: '#select_artist',///************use your own elements to change this*********/////
        selectGenre: '#select_genre',///************use your own elements to change this*********/////
        selectPlaylist: '#select_playlist',///************use your own elements to change this*********/////
        buttonSubmit: '#btn_submit',///************use your own elements to change this*********/////
        divSongDetail: '#song-detail',///************use your own elements to change this*********/////
        divSonglist: '.song-list'///************use your own elements to change this*********/////
    }
    // if you change something in html you only have to change these selectors 

    //declare public method that will call by the main controller 
    return {

        //input field method , return an object with name:value of the html fields using DOMelements
        inputField() {
            return {
                artist: document.querySelector(DOMEl.selectArtist),
                genre: document.querySelector(DOMEl.selectGenre),
                playlist: document.querySelector(DOMEl.selectPlaylist),
                tracks: document.querySelector(DOMEl.divSonglist),
                submit: document.querySelector(DOMEl.buttonSubmit),
                songDetail: document.querySelector(DOMEl.divSongDetail)
            }
        },

        // need methods to create select list option
        createGenre(text, value) {
            var html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMEl.selectGenre).insertAdjacentHTML('beforeend', html);
        }, 

        createPlaylist(text, value) {
            var html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMEl.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create a track list group item 
        createTrack(id, name) {
            var html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMEl.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create the song detail
        createTrackDetail(img, title, artist) {

            var detailDiv = document.querySelector(DOMEl.divSongDetail);
            // any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';

            var html = 
            `
            <div class="row col-sm-12 px-0">
                <img src="${img}" alt="">        
            </div>
            <div class="row col-sm-12 px-0">
                <label for="Genre" class="form-label col-sm-12">${title}:</label>
            </div>
            <div class="row col-sm-12 px-0">
                <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
            </div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },
        
        storeToken(value) {
            document.querySelector(DOMEl.hToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMEl.hToken).value
            }
        }
    }

})();

var app = (function(UI, spotifyapi) {

    // get input field object ref
    var DOMInputs = UI.inputField();

    var loadArtist = async () => {
        //get the token
        var token = await spotifyapi.getToken();
        //store it on the page 
        UI.storeToken(token);
        //get the artist
        var artist = await spotifyapi.getArtist(token);
        artist.forEach(element => UI.createArtist(element.name,element.id));
    }

    // get genres on page load
    var loadGenres = async () => {
        //get the token
        var token = await spotifyapi.getToken();           
        //store the token onto the page
        UI.storeToken(token);
        //get the genres
        var genres = await spotifyapi.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UI.createGenre(element.name, element.id));
    }

    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {
        //reset the playlist
        UI.resetPlaylist();
        //get the token that's stored on the page
        var token = UI.getStoredToken().token;        
        // get the genre select field
        var genreSelect = UI.inputField().genre;       
        // get the genre id associated with the selected genre
        var genreId = genreSelect.options[genreSelect.selectedIndex].value;             
        // ge the playlist based on a genre
        var playlist = await spotifyapi.getPlaylistGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UI.createPlaylist(p.name, p.tracks.href));
    });
     

    //submit button 
    DOMInputs.submit.addEventListener('click', async (e) => {
        e.preventDefault();
        UI.resetTracks();
        // get token
        var token = UI.getStoredToken().token;        
        // get the playlist 
        var playlistSelect = UI.inputField().playlist;
        // get trackEndPoint based on the playlist index
        var tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the tracks
        var tracks = await spotifyapi.getTracks(token, tracksEndPoint);
        // create a track list item
        tracks.forEach(el => UI.createTrack(el.track.href, el.track.name))
        
    });

    // create song selection click event listener
    DOMInputs.tracks.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        UI.resetTrackDetail();
        // get the token
        var token = UI.getStoredToken().token;
        // get the track endpoint
        var trackEndpoint = e.target.id;
        //get the track object
        var track = await spotifyapi.getTrack(token, trackEndpoint);
        // load the track details
        UI.createTrackDetail(track.album.images[0].url, track.name, track.artists[0].name);
    });    

    return {
        init() {
            loadArtist();
            loadGenres();
        }
    }

})(UI, spotifyapi);

// call method
app.init();




