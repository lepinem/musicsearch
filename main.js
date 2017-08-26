/*
  Here is a rough idea for the steps you could take:
*/
//1. First select and store the elements you'll be working with (lines 10-20)
// 2. Create your `submit` event for getting the user's search term (lines 22...60)
// 3. Create your `fetch` request that is called after a submission (lines 27...59)
// 4. Create a way to append the fetch results to your page (lines 33-48)
// 5. Create a way to listen for a click that will play the song in the audio play

let urlBase = 'https://itunes.apple.com/search?term=';
let container = document.querySelector('.container');
let player = document.querySelector('.player');
let musicPlayer = document.querySelector('audio');
let search = document.querySelector('.search');
let searchForm = document.querySelector('form');
let searchInput = document.querySelector('#searchJam');
let results = document.querySelector('.results');
let button = document.querySelector('#submit');

let searchTerm = '';

function clearResults() {
  results.innerHTML = '';
}

button.addEventListener('click', function(concatInnerHTML){
  searchTerm = searchInput.value;

  clearResults();

  fetch(urlBase + searchTerm + '&limit=15')

  .then(function(response){
    return response.json()

  .then(function(data){
    let jams = data.results;

    function myJams(jam){
      let html = `
        <div class="jamBox">
          <div class="coverArt">
            <img data-value="${jam.previewUrl}" src="${jam.artworkUrl100}" alt="${jam.artistName}">
          </div>
          <div class="jamWords">
            <span><a href="${jam.trackViewUrl}">${jam.trackName}</a></span>
              <span><h4>${jam.artistName}</h4></span>
            </div>
        </div>
      `;
      return html;
    }

    for(let i=0; i<jams.length; i++){
      let jam = jams[i];

    let addJams = myJams(jam);
      results.innerHTML += addJams;

    }
  })
  .then(function () {
    function playSong(event){
        console.log(event.target, 'event.target.value');
      let x = event.target.getAttribute('data-value');
        musicPlayer.setAttribute("src", x);
      }

      let jamBox = document.querySelectorAll('.jamBox');
      for (let j=0; j<jamBox.length; j++){
        jamBox[j].addEventListener('click', playSong);

        }

  })

})
})
