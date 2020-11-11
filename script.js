var containerMain = document.querySelector(".container-main");
var artistImage = document.querySelector(".artist");
var media = document.querySelector(".media");
var overlay = document.querySelector(".overlay");
var searchElem = document.querySelector("#search");

searchElem.addEventListener("keydown", getContent);

function getContent(e) {
  var url = new URL("https://itunes.apple.com/search");
  var params = { term: searchElem.value, media: "musicVideo" };
  url.search = new URLSearchParams(params);
  fetch(url, { method: "GET" })
    .then((results) => console.log(results))
    .then((data) => {});
  var resultsHTML = data.results
    .map(
      (result, index) => `
        <div style="background-image: url(${result.artworkUrl100});"
        onclick="openMedia('${result.previewUrl}', '${result.trackCensoredName}')" class="result"></div>
        `
    )
    .join("");
  containerMain.innerHTML = resultsHTML;

  e.preventDefault();
  searchElem.blur();
  //   return;
  fetch(data.results[0].artistViewUrl);
}
// s
