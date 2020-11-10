var containerMain = document.querySelector(".container-main");
var artistImage = document.querySelector(".artist");
var media = document.querySelector(".media");
var overlay = document.querySelector(".overlay");
var searchElem = document.querySelector(".input-field");

var getContent = (search) => {
  var url = new URL("https://itunes.apple.com/search");
  var params = { term: search, media: "musicVideo" };
  url.search = new URLSearchParams(params);
  fetch(url, { method: "POST" })
    .then((results) => results.json())
    .then((data) => {});
};

getContent("radiohead");
