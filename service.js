// Selecting HTML elements and assigning them to a variable

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause");
let next_btn = document.querySelector(".next");
let prev_btn = document.querySelector(".prev");

let seek_slider = document.querySelector(".seek-slider");
let vol_slider = document.querySelector(".vol-slider");
let curr_time = document.querySelector(".curr-time");
let tot_duration = document.querySelector(".tot-duration");


// Globally Used Values

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Audio element for player

let curr_track = document.createElement('audio');

// Definimg the playlist

let track_list = [
    {
        name: "Night Owl",
        artist: "Broke For Free",
        image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    },
    {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    },
  ]; 


// Load track function

function loadTrack(track_index) {

    // Update the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Updating details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")"; 
    track_name.textContent = track_list[track_index].name; 
    track_artist.textContent = track_list[track_index].artist; 
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    // Set an interval of 1000 milliseconds for updating the seek slider 
    updateTimer = setInterval(seekUpdate, 1000); 
  
    // Move to the next track if the current finishes playing using the 'ended' event 
    curr_track.addEventListener("ended", nextTrack); 
  
    // Apply a random background color 
    random_bg_color();

}

// resetValues function to reset values to their default

function resetValues() {
    curr_time.textContent = "00:00";
    tot_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Get a random number between 64 to 256 (for getting lighter colors)

function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    let color = "rgb(" + red + "," + green + "," + blue +")";
    document.body.style.background = color;
}


// Configuring the player buttons

// playpause function to handle the currently loaded track

function playpauseTrack(){

    // Switch between play & pause depending on the current state
    if(!isPlaying) playTrack();
    else pauseTrack();

}

// To play the loaded track

function playTrack() {
    curr_track.play();
    isPlaying = true;
    
    // To replace icon with pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

// To pause the loaded track

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    // Replace icon with the play icon 
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// To go to next track and if current track is last, then go to first track

function nextTrack() {
    if(track_index < track_list.length -1) track_index += 1;
    else track_index = 0;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

// To go to prev track and if current track is first, then go to last track

function prevTrack() {
    if(track_index > 0) track_index -= 1;
    else track_index = track_list.length - 1;

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}


// Configuring the slider options

function seekTo() {

    /* Calculate the seek position by the percentage of the seek slider  
    and get the relative duration to the track */
    let seekto = curr_track.duration * (seek_slider.value / 100); 
  
    // Set the current track position to the calculated seek position 
    curr_track.currentTime = seekto; 

}

function setVolume() {

    // Set the volume according to the percentage of the volume slider set 
    curr_track.volume = vol_slider.value / 100;

}

function seekUpdate() {
    let seekPos = 0;

    // Check if the current track duration is a legible number
    if(!isNaN(curr_track.duration)){

        seekPos = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPos;

        // Calculate the time left and the total duration 
        let currMin = Math.floor(curr_track.currentTime / 60);
        let currSec = Math.floor(curr_track.currentTime - currMin * 60);
        let durationMin = Math.floor(curr_track.duration / 60);
        let durationSec = Math.floor(curr_track.duration - durationMin * 60);

        // Add a zero to the single digit time values
        if(currSec < 10) currSec = "0" + currSec;
        if(durationSec < 10) durationSec = "0" + durationSec;
        if(currMin < 10) currMin = "0" + currMin;
        if(durationMin < 10) durationMin = "0" + durationMin;

        // Display the updated duration
        curr_time.textContent = currMin + ":" + currSec;
        tot_duration.textContent = durationMin + ":" + durationSec;

    }
    
}


// Load the first track in the tracklist 

loadTrack(track_index);


