
// Function to create a song list item
function createSongListItem(song) {
    listItem = document.createElement("li");
  
    //Add songlist image
    const songPoster = document.createElement("img");
    songPoster.id = "song-poster";
    songPoster.src = `songs/${song.poster}.jpeg`;
  
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
  
    //Add songlist title
    const songTitle = document.createElement("div");
    songTitle.classList.add("title");
    songTitle.textContent = song.title;
  
    //Add songlist artist
    const songArtist = document.createElement("div");
    songArtist.classList.add("artist");
    songArtist.textContent = song.artist;
  
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
        playSong(song);
      currentSongTitle = song.title
      console.log(currentSongTitle)
    });
    songListElement.appendChild(listItem);
  
  
  }
  
  