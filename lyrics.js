
function displaylyrics(song) {


  if (lyricbox.style.display === "block") {
    // Clear the lyric box content
    lyricbox.innerHTML = "";
    lyrichead.innerHTML = "";
  }

  
  // const lyricsdetails = document.querySelector(".lyricsdetails");
  const lyricsonginfo = document.createElement("div");
  lyricsonginfo.classList.add("lyricsonginfo");

  const lyrictop = document.createElement("div");
  const singalong = document.createElement("p");
  lyrictop.id = "lyrictop";
  singalong.textContent = "SingAlong";
  lyrictop.appendChild(singalong);

  const crossbtn = document.createElement("img");
  crossbtn.classList.add("cursor");
  crossbtn.src="svg/close.svg";
  lyrictop.appendChild(crossbtn);
  lyricsonginfo.appendChild(lyrictop);

  //now playing
  const nowplaying = document.createElement("p");
  nowplaying.textContent = "Now playing";
  lyricsonginfo.appendChild(nowplaying);

  // Add playlist image 
  const lyricImage = document.createElement("img");
  lyricImage.src = `songs/${song.poster}.jpeg`;
  lyricsonginfo.appendChild(lyricImage);

  // Add playlist title
  const lyricTitle = document.createElement("h2");
  lyricTitle.textContent = song.title;
  lyricsonginfo.appendChild(lyricTitle);

  //Add songlist artist
  const lyricartist = document.createElement("h4");
  lyricartist.textContent = song.artist;
  lyricsonginfo.appendChild(lyricartist);

  // Create the select element container
  const translationSelect = document.createElement('div');
  translationSelect.classList.add('selecttranslate');

  // Create the label element
  const translationLabel = document.createElement('label');
  translationLabel.textContent = 'Lyrics : ';
  translationLabel.setAttribute('for', 'mytranslation');  // Link label to select element

  // Create the select element
  const selectElement = document.createElement('select');
  selectElement.name = 'translation';
  selectElement.id = 'mytranslation';

  // Create option elements for languages
  const languages = ['original', 'English', 'French', 'Hindi'];
  for (const language of languages) {
    const optionElement = document.createElement('option');
    optionElement.value = language.toLowerCase();  // Set lowercase value for consistency
    optionElement.textContent = language;
    selectElement.appendChild(optionElement);
  }

  // Append label and select element to the container
  translationSelect.appendChild(translationLabel);
  translationSelect.appendChild(selectElement);
  lyricsonginfo.appendChild(translationSelect);


  const lyricscontainer = document.createElement("div");
  lyricscontainer.innerHTML = "";
  const songs = poster.find(song => song.title === currentSongTitle); // Find song object by title

  if (songs) {
    if (songs) {
      // lyricmain.textContent = "";
      lyricscontainer.innerText = songs.lyrics.original; // Update lyrics content
    } else {
      console.error("Lyrics container element not found!");
    }
  } else {
    console.warn("Song not found:", currentSongTitle); // Handle song not found scenario
  }


  lyricscontainer.classList.add("lyricsdiv");
  // lyricmain.appendChild(lyrics);


  selectElement.addEventListener("change", () => {
    const selectedLanguage = selectElement.value;
    lyricscontainer.innerText = songs.lyrics[selectedLanguage] || "Translation not available."; // Handle missing translations
  });



  //close button event
  const closeButton = lyricbox.querySelector("#close");

  if (crossbtn) {
    crossbtn.addEventListener("click", () => {
      lyricbox.style.display = "none"; // Hide the lyric box
    });
  }

  //lyrics translation option box


  lyrichead.appendChild(lyricsonginfo);

  lyricbox.appendChild(lyrichead);
  lyricbox.appendChild(lyricscontainer)
  lyricbox.style.display = "block"
}
