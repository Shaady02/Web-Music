// Function to play the songlist songs
function playSong(song) {
  lyricbox.style.display = "none"; // Hide the lyric box
  const nowPlayingInfo = document.createElement("div");
  nowPlayingInfo.classList.add("now-playing-info");
  nowPlayingInfo.classList.add("flex");
  nowPlayingInfo.classList.add("align-center");

  const songTitleElement = document.getElementById("now-playing-title");
  const songArtistElement = document.getElementById("now-playing-artist");


  currentSongTitle = song.title;
  // adding title and artist
  songTitleElement.textContent = song.title;
  songArtistElement.innerHTML = "<br>" + song.artist;

  //heart button
  const svgElement = document.getElementById("heartbtn");
  const pathElement = document.getElementById("my-path");
  svgElement.style.display = "block";
  svgElement.addEventListener("click", () => {
    heartbtn(pathElement);
  });

  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0; // Reset playback position
    playsbtn.addEventListener("click", () => {
      if (currentPlayingAudio.paused) {
        currentPlayingAudio.play()
        playsbtn.src = song.pausesvg;
      }
      else {
        currentPlayingAudio.pause()
        playsbtn.src = song.playsvg;
      }
    })
  }
  playsbtn.addEventListener("click", () => {
    if (currentPlayingAudio.paused) {
      currentPlayingAudio.play()
      playsbtn.src = song.pausesvg;
    }
    else {
      currentPlayingAudio.pause()
      playsbtn.src = song.playsvg;
    }
  })


  //playing song
  console.log(`Playing song: ${song.title}`);
  const audio = new Audio(`songs/${song.title}.mp3`);
  audio.play();
  playsbtn.src = song.pausesvg;
  document.getElementById("songst").innerHTML = "00:00";
  document.getElementById("songend").innerHTML = song.endtime;

  currentPlayingAudio = audio;


  // Update time display during playback
  const updateCurrentTime = () => {
    const currentTime = Math.floor(currentPlayingAudio.currentTime);
    const formattedCurrentTime = secondsToMS(currentTime);
    document.getElementById("songst").innerHTML = formattedCurrentTime;
    if (document.querySelector(".circle")) {
      const progress = (currentPlayingAudio.currentTime / currentPlayingAudio.duration) * 100;
      document.querySelector(".circle").style.left = `${progress}%`;
    }
  }


  // Update time every second
  const timeInterval = setInterval(updateCurrentTime, 100);

  // Clear time updates and reset progress bar on song end
  audio.addEventListener("ended", () => {
    clearInterval(timeInterval);
    document.getElementById("songst").innerHTML = secondsToMS(audio.duration); // Display total song duration
    if (document.querySelector(".circle")) {
      document.querySelector(".circle").style.left = "0"; // Reset progress bar
      document.getElementById("songst").innerHTML = "00:00";
      playsbtn.src = song.playsvg;
    }
  });

  if (seekbarElement) {
    seekbarElement.addEventListener("click", (event) => {
      const clickPosition = event.offsetX;
      const seekbarWidth = seekbarElement.clientWidth;
      const clickedProgress = clickPosition / seekbarWidth;

      // update the audio
      audio.currentTime = clickedProgress * audio.duration;

      // update display time
      document.getElementById("songst").innerHTML = secondsToMS(audio.currentTime);

      const temporaryIndicator = document.createElement("div");
      temporaryIndicator.classList.add("temporary-indicator");
      temporaryIndicator.style.left = `${clickedProgress * 100}%`;
      seekbarElement.appendChild(temporaryIndicator);
      setTimeout(() => {
        temporaryIndicator.remove();
      }, 100);
    });

    //event listner for volume
    document.querySelector(".songoptions").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      currentPlayingAudio.volume = parseInt(e.target.value) / 100;
    })

    lyricbutton.addEventListener("click", () => {
      displaylyrics(song);
    })


  }

}

// Function to play the playlist songs
function playSong(play) {
  lyricbox.style.display = "none"; // Hide the lyric box
  const nowPlayingInfo = document.createElement("div");
  nowPlayingInfo.classList.add("now-playing-info");
  nowPlayingInfo.classList.add("flex");
  nowPlayingInfo.classList.add("align-center");

  const songTitleElement = document.getElementById("now-playing-title");
  const songArtistElement = document.getElementById("now-playing-artist");


  //adding the previous and next 
  currentSongTitle = play.title;

  const nowPlayingPoster = document.getElementById('playingposter');
  if (nowPlayingPoster) {
    nowPlayingPoster.src = `songs/${play.poster}.jpeg`; // Set poster image source
  } else {
    console.error("Now playing poster element not found!");
  }



  // adding title and artist
  songTitleElement.textContent = play.title;
  songArtistElement.innerHTML = "<br>" + play.artist;

  //heart button
  const svgElement = document.getElementById("heartbtn");
  const pathElement = document.getElementById("my-path");
  svgElement.style.display = "block";
  svgElement.addEventListener("click", () => {
    heartbtn(pathElement);
  });

  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0; // Reset playback position
    playsbtn.addEventListener("click", () => {
      if (currentPlayingAudio.paused) {
        currentPlayingAudio.play()
        playsbtn.src = play.pausesvg;
      }
      else {
        currentPlayingAudio.pause()
        playsbtn.src = play.playsvg;
      }
    })
  }
  playsbtn.addEventListener("click", () => {
    if (currentPlayingAudio.paused) {
      currentPlayingAudio.play()
      playsbtn.src = play.pausesvg;
    }
    else {
      currentPlayingAudio.pause()
      playsbtn.src = play.playsvg;
    }
  })


  //playing song
  console.log(`Playing song: ${play.title}`);
  const audio = new Audio(`songs/${play.title}.mp3`);
  audio.play();
  playsbtn.src = play.pausesvg;
  document.getElementById("songst").innerHTML = "00:00";
  document.getElementById("songend").innerHTML = play.endtime;

  currentPlayingAudio = audio;


  // Update time display during playback
  const updateCurrentTime = () => {
    const currentTime = Math.floor(currentPlayingAudio.currentTime);
    const formattedCurrentTime = secondsToMS(currentTime);
    document.getElementById("songst").innerHTML = formattedCurrentTime;
    if (document.querySelector(".circle")) {
      const progress = (currentPlayingAudio.currentTime / currentPlayingAudio.duration) * 100;
      document.querySelector(".circle").style.left = `${progress}%`;
    }
  }


  // Update time every second
  const timeInterval = setInterval(updateCurrentTime, 100);

  // Clear time updates and reset progress bar on song end
  audio.addEventListener("ended", () => {
    clearInterval(timeInterval);
    document.getElementById("songst").innerHTML = secondsToMS(audio.duration); // Display total song duration
    if (document.querySelector(".circle")) {
      document.querySelector(".circle").style.left = "0"; // Reset progress bar
      document.getElementById("songst").innerHTML = "00:00";
      playsbtn.src = play.playsvg;
      const currentSongIndex = poster.findIndex(song => song.title === currentSongTitle);
      if (currentSongIndex < poster.length) {
        const nextsng = poster[currentSongIndex + 1];
        playSong(nextsng);
      } else {
        playSong(poster[poster.length]); // Play the last song again
      }
    }
  });

  if (seekbarElement) {
    seekbarElement.addEventListener("click", (event) => {
      const clickPosition = event.offsetX;
      const seekbarWidth = seekbarElement.clientWidth;
      const clickedProgress = clickPosition / seekbarWidth;

      // update the audio
      audio.currentTime = clickedProgress * audio.duration;

      // update display time
      document.getElementById("songst").innerHTML = secondsToMS(audio.currentTime);

      const temporaryIndicator = document.createElement("div");
      temporaryIndicator.classList.add("temporary-indicator");
      temporaryIndicator.style.left = `${clickedProgress * 100}%`;
      seekbarElement.appendChild(temporaryIndicator);
      setTimeout(() => {
        temporaryIndicator.remove();
      }, 100);
    });

    //event listner for volume
    document.querySelector(".songoptions").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      currentPlayingAudio.volume = parseInt(e.target.value) / 100;
    })

    lyricbutton.addEventListener("click", () => {
      displaylyrics(play);
    })

  }

}
