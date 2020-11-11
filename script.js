<<<<<<< HEAD
=======
const apiURL = "https://api.lyrics.ovh";

const form = document.getElementById("form")
const search = document.getElementById("search")
const result = document.getElementById("result")
const more = document.getElementById("more")


function searchSongs(term){
	fetch(`${apiURL}/suggest/${term}`).then(res => res.json()).then(data => console.log(data));
	showData(data);
}


//event listeners
form.addEventListener("submit", e=> {
	e.preventDefault();

	const searchTerm = search.value.trim();
	if(!searchTerm) {
		alert("please type in a search term");
	} else {
			searchSongs(searchTerm);
		}
});
//show song and artist in DOM
function showData(data) {
// var output = '';

// data.data.forEach(song => {
// 	output += `
// 	<li>
// 	<span><strong>${song.artist.name}</strong> - ${song.title}</span>
// 	<button class="btn" data-artist="${song.title}">Get Lyrics</button>
// 	</li>
// 	`
	
	
// });

// result.innerHTML = `
// <ul class="songs">
// ${output}
// </ul>
// `;

result.innerHTML = `
<ul class="songs">
${data.data.map
	(song => `<li>
<span><strong>${song.artist.name}</strong> - ${song.title}</span>
<button class="btn" data-artist="${song.title}">Get Lyrics</button>
</li>`
.join('')
)}

</ul>
`
}



>>>>>>> f623f2c3cdcf337f4f056572cfe6914a043f784a
