// Function to create an playlist card
function createPlaylistCard(play) {
    const cardContainer = document.querySelector(".cardcontainer");
    card = document.createElement("div");
    card.classList.add("card", "cursor");

    // Add playlist image 
    const playlistImage = document.createElement("img");
    playlistImage.classList.add("posterimg");
    playlistImage.src = `songs/${play.poster}.jpeg`;
    card.appendChild(playlistImage);

    // Add playlist title
    const playlistTitle = document.createElement("h2");
    playlistTitle.textContent = play.title;
    card.appendChild(playlistTitle);

    const playlistartist = document.createElement("p");
    playlistartist.textContent = play.artist || "";
    card.appendChild(playlistartist);

    // Add play button
    const playButton = document.createElement("button");
    playButton.classList.add("playbtn");
    const playIcon = document.createElement("img");
    playIcon.classList.add("playicon");
    playIcon.src = "svg/play.svg";
    playIcon.alt = "svg/Play album";
    playButton.appendChild(playIcon);
    card.appendChild(playButton);

    //event to call playsong
    card.addEventListener("click", () => {
        playSong(play);
        currentSongTitle = play.title
        console.log(currentSongTitle)
    });

    cardContainer.appendChild(card);
}

// Function to create a song list item
function createSongListItem(song) {
    listItem = document.createElement("li");
    listItem.classList.add("songlist");

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
    playButton.id = "libraryplay"
    playButton.classList.add("invert");
    playButton.src = "svg/play2.svg";
    playButton.alt = "Play";
    listItem.appendChild(playButton);

    //event to call playsong
    listItem.addEventListener("click", () => {
        // if (e.target === playButton)
            playSong(song);
        currentSongTitle = song.title
        console.log(currentSongTitle)
    });
    songListElement.appendChild(listItem);


}

