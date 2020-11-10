var containerMain = document.querySelector(".container-main");
var artistImage = document.querySelector(".artist");
var media = document.querySelector(".media");
var overlay = document.querySelector(".overlay");
var searchElem = document.querySelector(".input-field");

searchElem.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getContent(searchElem.value);
  }
});

var getContent = (search) => {
  var url = new URL("https://itunes.apple.com/search");
  var params = { term: search, media: "musicVideo" };
  url.search = new URLSearchParams(params);
  fetch(url, { method: "POST" })
    .then((results) => results.json())
    .then((data) => {});
  var resultsHTML = data.results
    .map(
      (result) => `
        <div style="background-image: url(${result.artworkUrl100});"
        onclick="openMedia('${result.previewUrl}', '${result.trackCensoredName}')" class="result"></div>
        `
    )
    .join("");
  containerMain.innerHTML = resultsHTML;
};
getContent();
