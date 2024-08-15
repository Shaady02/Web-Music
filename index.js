
let playListcard = document.querySelector(".cardcontainer");
let currentSongTitle;
let seekbarElement = document.querySelector(".seekbar");
let songStartTimeELement = document.getElementById("songst");
let songEndTimeElement = document.getElementById("songend");
let currentPlayingAudio = null;
let previousbtn = document.getElementById("previous");
let playsbtn = document.getElementById("play");
let nextsbtn = document.getElementById("next");
const songListElement = document.querySelector(".song-main ul");
let listItem;
let card;
let data;
let lyricbutton = document.querySelector("#lyrics");
let lyricbox = document.querySelector(".lyricsBox");
let lyrichead = document.querySelector(".lyricheading");
let translatebox = document.getElementById("mytranslation");
let lyricmain = document.querySelector(".lyricspart");
//refresh page
const homebtn = document.querySelector(".home .logo");
homebtn.addEventListener("click", () => {
  window.location.reload();
})
//backbtn
const backbtn = document.getElementById("back");
backbtn.addEventListener("click", () => {
  window.location.reload();
})

// Fetch JSON data
fetch("songs/songs.json")
  .then(response => response.json())
  .then(data => {
    // Process songs 
    data.songlist.forEach(song => {
      createSongListItem(song);
    });

    searchInput.addEventListener('keyup', () => {
      const searchTerm = searchInput.value.toLowerCase();

      // Filter the songlist based on search term
      const filteredSongs = data.songlist.filter(song => {
        const songTitle = song.title.toLowerCase();
        const songArtist = song.artist.toLowerCase();
        return songTitle.includes(searchTerm) || songArtist.includes(searchTerm);
      });
      songListElement.innerHTML = '';

      // Display filtered song list items
      filteredSongs.forEach(song => {
        createSongListItem(song);
      });



      // Filter the songlist based on search term
      const filteredplaylist = data.playlist.filter(play => {
        const songTitle = play.title.toLowerCase();
        const songArtist = play.artist.toLowerCase();
        return songTitle.includes(searchTerm) || songArtist.includes(searchTerm);
      });
      songListElement.innerHTML = '';

      // Display filtered song list items
      filteredplaylist.forEach(play => {
        createSongListItem(play);
      });
    });


    // Process playlist
    data.playlist.forEach(play => {
      createPlaylistCard(play);
    });

  })
  .catch(error => {
    console.error("Error fetching song data:", error);
  });




//function for plus button
const library = [{
  title: "Joota Japani",
  artist: "Kr$na",
  poster: "Joota Japani",
  playsvg: "svg/play2.svg",
  pausesvg: "svg/pause.svg",
  endtime: "2:34"
},
{
  title: "Soulmate",
  artist: "Arijit Singh , Badshah",
  poster: "Soulmate",
  playsvg: "svg/play2.svg",
  pausesvg: "svg/pause.svg",
  endtime: "03:33"

},
{
  title: "Sajni",
  artist: "Arijit Singh",
  poster: "Sajni",
  playsvg: "svg/play2.svg",
  pausesvg: "svg/pause.svg",
  endtime: "02:50"

},
{
  title: "Death Bed",
  artist: "powfu",
  poster: "Death Bed",
  playsvg: "svg/play2.svg",
  pausesvg: "svg/pause.svg",
  endtime: "02:54"

},

];



const dialogbox = document.querySelector(".addsong");
// Flag to ensure event listener is added only once
let isAddSongFormListenerAdded = false;
function showaddsong() {
  dialogbox.style.display = "block"
  document.querySelector("#cancelButton").addEventListener('click', () => {
    dialogbox.style.display = 'none';
  });
  if (!isAddSongFormListenerAdded) {
    addSongForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('songTitleInput').value;
      const artist = document.getElementById('songArtistInput').value;
      // Check if the song exists in the predefined library
      const songFromLibrary = findSongInLibrary(title, artist);
      if (!songFromLibrary) {
        alert("This song is not available in the predefined library.");
        return;
      }
      // Check if the song already exists in the library
      if (isSongInLibrary(title, artist)) {
        alert("This song is already in the library.");
        return;
      }
      const newSong = {
        title,
        artist,
        poster: title.toLowerCase().replace(/\s+/g, '-'),
        playsvg: "svg/play2.svg",
        pausesvg: "svg/pause.svg",
        endtime: "02:52",
      };

      createSongListItemadded(newSong);
      dialogbox.style.display = 'none';
      addSongForm.reset();
    });
    // Set the flag to true after adding the event listener
    isAddSongFormListenerAdded = true;
  }
  function findSongInLibrary(title, artist) {
    return poster.find(song => song.title.toLowerCase() === title.toLowerCase() && song.artist.toLowerCase() === artist.toLowerCase());
  }
  function isSongInLibrary(title, artist) {
    return library.some(song => song.title.toLowerCase() === title.toLowerCase() && song.artist.toLowerCase() === artist.toLowerCase());
  }
}
function createSongListItemadded(newSong) {
  listItem = document.createElement("li");

  //Add songlist image
  const songPoster = document.createElement("img");
  songPoster.id = "song-poster";
  songPoster.src = `songs/${newSong.title}.jpeg`;

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  //Add songlist title
  const songTitle = document.createElement("div");
  songTitle.classList.add("title");
  songTitle.textContent = newSong.title;

  //Add songlist artist
  const songArtist = document.createElement("div");
  songArtist.classList.add("artist");
  songArtist.textContent = newSong.artist;

  infoDiv.appendChild(songTitle);
  infoDiv.appendChild(songArtist);

  //Add songlist playbtn
  listItem.appendChild(songPoster);
  listItem.appendChild(infoDiv);
  const playButton = document.createElement("img");
  playButton.classList.add("playbtnsvg");
  playButton.classList.add("invert");
  playButton.src = "svg/play2.svg";
  playButton.alt = "Play";
  listItem.appendChild(playButton);

  //event to call playsong  
  listItem.addEventListener("click", (e) => {
    if (e.target === playButton)
      playSong(newSong);
    currentSongTitle = newSong.title
    console.log(currentSongTitle)
  });
  songListElement.appendChild(listItem);


}


// Function to convert seconds to MM:SS format
function secondsToMS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

//heartbtn function
function heartbtn(pathElement) {
  const currentFill = pathElement.style.fill; // Store current fill color
  let isFilled = currentFill === "rgb(31, 97, 88)";
  if (!isFilled) {
    console.log("Not filled! Filling...");
    pathElement.style.fill = "rgb(31, 97, 88)"; // Fill the heart
    isFilled = true;
  } else {
    console.log("Filled! Unfilling...");
    pathElement.style.fill = "";  // Remove fill
    isFilled = false;
  }
}
