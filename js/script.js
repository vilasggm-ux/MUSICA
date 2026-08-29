/* ================= MUSICA ================= */

/* ---------- PAGE ELEMENTS ---------- */

const landing = document.getElementById("landing");
const home = document.getElementById("home");

const enterBtn = document.getElementById("enterBtn");
const startListening = document.getElementById("startListening");

const musicLibrary = document.getElementById("musicLibrary");

const songList = document.getElementById("songList");
const songCount = document.getElementById("songCount");

const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");


/* ---------- MUSIC PLAYER ---------- */

const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");

const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");


/* ================= SONG LIBRARY ================= */

const songs = [

    {
        title: "Aadat",
        artist: "MUSICA",
        file: "song/Aadat.mp3"
    },

    {
        title: "Aarzu",
        artist: "MUSICA",
        file: "song/Aarzu.mp3"
    },

    {
        title: "Ae Dil Hai Mushkil",
        artist: "MUSICA",
        file: "song/Ae Dil Hai Mushkil.mp3"
    },

    {
        title: "Agar Tum Saath Ho",
        artist: "MUSICA",
        file: "song/Agar Tum Saath Ho.mp3"
    },

    {
        title: "Bhula Dena",
        artist: "MUSICA",
        file: "song/Bhula Dena s.mp3"
    },

    {
        title: "Pal",
        artist: "MUSICA",
        file: "song/Pal.mp3"
    },

    {
        title: "Shayad",
        artist: "MUSICA",
        file: "song/Shayad.mp3"
    },

    {
        title: "Test Song",
        artist: "MUSICA",
        file: "song/test-song.mp3"
    },

    {
        title: "Tujhe Kitna Chahne Lage",
        artist: "MUSICA",
        file: "song/Tujhe Kitna Chahne Lage.mp3"
    } 
    
    {   
        title: "Until I Found You",
        artist: "MUSICA",
        file: "song/Until I Found You.mp3"
    }

];


let currentSong = 0;


/* ================= LANDING ================= */

enterBtn.addEventListener("click", function() {

    landing.style.opacity = "0";

    setTimeout(function() {

        landing.style.display = "none";
        home.style.display = "block";

    }, 1000);

});


/* ================= LISTEN NOW ================= */

startListening.addEventListener("click", function() {

    musicLibrary.scrollIntoView({
        behavior: "smooth"
    });

});


/* ================= CREATE SONG CARDS ================= */

function displaySongs(songArray) {

    songList.innerHTML = "";

    if (songArray.length === 0) {

        noResults.style.display = "block";

        return;

    }

    noResults.style.display = "none";


    songArray.forEach(function(song) {

        const originalIndex = songs.indexOf(song);


        const card = document.createElement("div");

        card.className = "song-card";

        card.dataset.song = originalIndex;


        card.innerHTML = `

            <div class="song-number">
                ${String(originalIndex + 1).padStart(2, "0")}
            </div>

            <div class="song-icon">
                ♫
            </div>

            <div class="song-details">

                <strong>${song.title}</strong>

                <small>${song.artist}</small>

            </div>

            <button class="song-play">
                ▶
            </button>

        `;


        /* SONG CLICK */

        card.addEventListener("click", function() {

            playSong(originalIndex);

        });


        songList.appendChild(card);

    });

}


/* ================= SONG COUNT ================= */

songCount.textContent = songs.length;


/* ================= LOAD SONG ================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audioPlayer.src = song.file;

    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    progressBar.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    playBtn.textContent = "▶";

    audioPlayer.load();

}


/* ================= PLAY SONG ================= */

function playSong(index) {

    loadSong(index);

    audioPlayer.play()
        .then(function() {

            playBtn.textContent = "⏸";

        })
        .catch(function(error) {

            console.error(
                "MUSICA PLAY ERROR:",
                error
            );

        });

}


/* ================= PLAY / PAUSE ================= */

playBtn.addEventListener("click", function() {

    if (audioPlayer.paused) {

        audioPlayer.play();

    } else {

        audioPlayer.pause();

    }

});


/* ================= AUDIO PLAY ================= */

audioPlayer.addEventListener("play", function() {

    playBtn.textContent = "⏸";

});


/* ================= AUDIO PAUSE ================= */

audioPlayer.addEventListener("pause", function() {

    playBtn.textContent = "▶";

});


/* ================= NEXT SONG ================= */

nextBtn.addEventListener("click", function() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    playSong(currentSong);

});


/* ================= PREVIOUS SONG ================= */

previousBtn.addEventListener("click", function() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    playSong(currentSong);

});


/* ================= AUTO NEXT ================= */

audioPlayer.addEventListener("ended", function() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    playSong(currentSong);

});


/* ================= SONG DURATION ================= */

audioPlayer.addEventListener(
    "loadedmetadata",
    function() {

        duration.textContent =
            formatTime(audioPlayer.duration);

    }
);


/* ================= PROGRESS ================= */

audioPlayer.addEventListener(
    "timeupdate",
    function() {

        if (!audioPlayer.duration) return;

        progressBar.value =
            (audioPlayer.currentTime /
            audioPlayer.duration) * 100;

        currentTime.textContent =
            formatTime(audioPlayer.currentTime);

    }
);


/* ================= SEEK ================= */

progressBar.addEventListener(
    "input",
    function() {

        if (!audioPlayer.duration) return;

        audioPlayer.currentTime =
            (progressBar.value / 100) *
            audioPlayer.duration;

    }
);


/* ================= VOLUME ================= */

volumeBar.addEventListener(
    "input",
    function() {

        audioPlayer.volume =
            volumeBar.value;

    }
);


/* ================= SEARCH ================= */

searchInput.addEventListener("input", function() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();


    const filteredSongs = songs.filter(function(song) {

        return song.title
            .toLowerCase()
            .includes(searchTerm);

    });


    displaySongs(filteredSongs);

});


/* ================= FORMAT TIME ================= */

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return minutes + ":" +
        String(remainingSeconds).padStart(2, "0");

}


/* ================= SERVICE WORKER ================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(function() {

                console.log(
                    "MUSICA service worker registered!"
                );

            })

            .catch(function(error) {

                console.log(
                    "Service worker registration failed:",
                    error
                );

            });

    });

}


/* ================= START ================= */

displaySongs(songs);

loadSong(0);
