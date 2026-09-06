let songsUL = document.querySelector(".songsList");

let playBar = document.querySelector(".playbar");
let prevBtn = document.querySelector(".previous");
let playBtnInPlayBar = prevBtn.nextElementSibling;
let nextBtn = document.querySelector(".next");

let currTime = document.querySelector(".currTime");
let totalDuration = document.querySelector(".totalDuration");

let left = document.querySelector(".left");
let hamburger = document.querySelector(".hamburger");

let seekBar = document.querySelector("#seekBar");
let audio = new Audio();    // global audio element

let songsArr = [];  // store all the songs listed in songsUL
let folder = "librarySongs";


// ----------- Dynamically fill the Trending section -----------
const fillTrending = async () => {
    // --- Fetch info.json file from trendingSongs folder ---
    let response = await fetch("./trendingSongs/info.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    // --- array of objects - containing info of each trending track ---
    let infoArr = await response.json();

    let Container = document.querySelector(".trending-container");

    for (let i = 0; i < infoArr.length; i++) {
        const object = infoArr[i];

        Container.insertAdjacentHTML("beforeend", `<div class="trending-card" data-trending-id="${object.id}">
                        <img src="trendingSongs/${object.cover}" alt="">
                        <h4>${object.title}</h4>
                        <p>${object.description}</p>
                        <button class="paused" style="background-color: rgba(0, 0, 0, 0); border: none;">
                            <img src="assets/paused.svg" alt="">
                        </button>
                    </div>`);
    }
}

// ----------- Dynamically fill the Albums section -----------
const fillAlbums = async () => {
    // --- Fetch albums.json ---
    let response = await fetch("./albums/albums.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch albums.json: ${response.status}`);
    }

    let albumArr = await response.json();

    let Container = document.querySelector(".favSongs-container");

    for (const album of albumArr) {
        // --- Fetch info.json file of each album ---
        let response = await fetch(`./albums/${album}/info.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch info.json from ${album}: ${response.status}`);
        }

        let object = await response.json();

        Container.insertAdjacentHTML("beforeend", `<div class="favSongs-card"  data-album-id="${object.id}">
                        <img src="albums/${album}/cover.jpg" alt="">
                        <h4>${object.title}</h4>
                        <p>${object.description}</p>
                        <button class="paused" style="background-color: rgba(0, 0, 0, 0); border: none;">
                            <img src="assets/paused.svg" alt="">
                        </button>
                    </div>`);
    }
}

// ----------- Dynamically fill the Artists section -----------
const fillArtists = async () => {
    // --- Fetch artists.json ---
    let response = await fetch("./artists/artists.json");
    if (!response.ok) {
        throw new Error(`Failed to fetch artists.json : ${response.status}`);
    }

    let artistArr = await response.json();

    let Container = document.querySelector(".favArtists-container");

    for (const artist of artistArr) {
        // --- Fetch info.json file for each artist ---
        let response = await fetch(`./artists/${artist}/info.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch info.json from ${artist} : ${response.status}`);
        }

        let object = await response.json();

        Container.insertAdjacentHTML("beforeend", `<div class="favArtists-card" data-artist-id="${object.id}">
                        <img src="artists/${artist}/cover.jpg" alt="" style="object-fit: cover;">
                        <h4>${object.title}</h4>
                        <p>${object.description}</p>
                        <button class="paused" style="background-color: rgba(0, 0, 0, 0); border: none;">
                            <img src="assets/paused.svg" alt="">
                        </button>
                    </div>`);
    }

}

// ----------- Dynamically fill the left sideBar and songsArr[] -----------
const getSongs = async (from) => {
    let response = await fetch(`./${from}/songs.json`);
    if (!response.ok) {
        throw new Error(`Failed to fetch songs.json from ${from} folder : ${response.status}`);
    }

    songsArr = await response.json();
    // console.log(songsArr);

    // --- clear before new entries ---
    songsUL.innerHTML = "";

    for (let i = 0; i < songsArr.length; i++) {
        const song = songsArr[i];
        // ---- index === id for any song ----
        songsUL.insertAdjacentHTML("beforeend", `<li id="${i}">
                    <img src="assets/music.svg" alt="">
                    <p>${song.replace(".mp3", "")}</p>
                    <button class="paused"  style="background-color: rgba(0, 0, 0, 0); border: none;">
                        <img src="assets/paused.svg" alt="">
                    </button>
                </li>`);
    }

    console.log("songs array : ", songsArr);
}

(async () => {
    await fillTrending();
    await fillAlbums();
    await fillArtists();
    await getSongs("librarySongs");

    if (songsArr.length > 0) {
        // ----- default track on page load is 0th -----
        audio.src = `librarySongs/${songsArr[0]}`;
        audio.id = 0;
        playBar.id = 0;

        let currSong = document.querySelector(".currSong");
        let name = songsArr[0].replace(".mp3", "");
        currSong.innerHTML = `<p>${name.split(" - ")[0]}</p>
                        <p>${name.split(" - ")[1]}</p>`;

        // --- loadedmetadata will fire automatically ---
    }

})();



// =========== play song + update UI to playing ==========
const playSong = (id) => {
    if (songsArr.length === 0) return;
    id = Number(id);
    if (id < 0 || id >= songsArr.length) return;

    // ---- to update UI of previous track to paused ----
    if (audio.id != "" && Number(audio.id) !== id) {
        pauseSong(audio.id);
    }

    // It hasn't necessarily downloaded/read enough of the file to know its metadata yet.
    audio.src = `${folder}/${songsArr[id]}`;
    audio.id = id;
    audio.play().catch(error => {
        console.log("failed to play audio : ", error);
    });   // returns a promise

    // ----- loadedmetadata will fire automatically ----

    // --- display current song in playBar ---
    let currSong = document.querySelector(".currSong");
    let name = songsArr[id].replace(".mp3", "");
    currSong.innerHTML = `<p>${name.split(" - ")[0]}</p>
                        <p>${name.split(" - ")[1]}</p>`;

    // ------- playBar id will represent current song id ---------
    playBar.id = id;
    console.log("playBar id:", playBar.id);


    // ========= change UI to playing ================
    // ----- update paused btn in songsUL ----
    let btn1 = document.getElementById(id).lastElementChild;
    if (btn1.classList.contains("paused"))
        btn1.classList.replace("paused", "playing");
    btn1.firstElementChild.src = "assets/playing.svg";

    // ----- update paused btn in playBar ----
    if (playBtnInPlayBar.classList.contains("paused"))
        playBtnInPlayBar.classList.replace("paused", "playing");
    playBtnInPlayBar.firstElementChild.src = "assets/playing.svg";

    // --- update paused btn in trending if it's current folder ---
    if (folder === "trendingSongs") {
        let btn2 = document.querySelector(`[data-trending-id="${id}"]`).lastElementChild;
        if (btn2.classList.contains("paused"))
            btn2.classList.replace("paused", "playing");
        btn2.firstElementChild.src = "assets/playing.svg";
    }

    // --- update paused btn of album if it's track is playing ---
    if (folder.startsWith("albums/album")) {
        let btn3 = document.querySelector(`[data-album-id="${Number(folder.replace("albums/album", "")) - 1}"]`).lastElementChild;
        if (btn3.classList.contains("paused"))
            btn3.classList.replace("paused", "playing");
        btn3.firstElementChild.src = "assets/playing.svg";
    }

    // --- update paused btn of artist if it's track is playing ---
    if (folder.startsWith("artists/artist")) {
        let btn4 = document.querySelector(`[data-artist-id="${Number(folder.replace("artists/artist", "")) - 1}"]`).lastElementChild;
        if (btn4.classList.contains("paused"))
            btn4.classList.replace("paused", "playing");
        btn4.firstElementChild.src = "assets/playing.svg";
    }
}


// ----- fills playBar with current song's info once its metadata loads ----
audio.addEventListener("loadedmetadata", () => {
    seekBar.value = audio.currentTime;
    seekBar.max = audio.duration;

    // ---- format - "minutes:seconds" ----
    currTime.innerHTML = `${Math.floor(audio.currentTime / 60).toString().padStart(2, "0")}:${Math.floor(audio.currentTime % 60).toString().padStart(2, "0")}`;

    totalDuration.innerHTML = `${Math.floor(audio.duration / 60).toString().padStart(2, "0")}:${Math.floor(audio.duration % 60).toString().padStart(2, "0")}`;

});


// =========== pause song + update UI to paused ==========
const pauseSong = (id) => {
    audio.pause();

    // ========= change UI to paused ================
    // ----- update playing btn in songsUL ----
    let btn1 = document.getElementById(id).lastElementChild;
    if (btn1.classList.contains("playing"))
        btn1.classList.replace("playing", "paused");
    btn1.firstElementChild.src = "assets/paused.svg";

    // ----- update playing btn in playBar ----
    if (playBtnInPlayBar.classList.contains("playing"))
        playBtnInPlayBar.classList.replace("playing", "paused");
    playBtnInPlayBar.firstElementChild.src = "assets/paused.svg";

    // --- update playing btn in trending if it's current folder ---
    if (folder === "trendingSongs") {
        let btn2 = document.querySelector(`[data-trending-id="${id}"]`).lastElementChild;
        if (btn2.classList.contains("playing"))
            btn2.classList.replace("playing", "paused");
        btn2.firstElementChild.src = "assets/paused.svg";
    }

    // --- update playing btn of album if it's track was playing ---
    if (folder.startsWith("albums/album")) {
        let btn3 = document.querySelector(`[data-album-id="${Number(folder.replace("albums/album", "")) - 1}"]`).lastElementChild;
        if (btn3.classList.contains("playing"))
            btn3.classList.replace("playing", "paused");
        btn3.firstElementChild.src = "assets/paused.svg";
    }

    // --- update playing btn of artist if it's track was playing ---
    if (folder.startsWith("artists/artist")) {
        let btn4 = document.querySelector(`[data-artist-id="${Number(folder.replace("artists/artist", "")) - 1}"]`).lastElementChild;
        if (btn4.classList.contains("playing"))
            btn4.classList.replace("playing", "paused");
        btn4.firstElementChild.src = "assets/paused.svg";
    }
}


// ============ listen to clicks on library songs ===========
songsUL.addEventListener("click", (event) => {
    // Starts from the current element and moves upwards through its ancestors until it finds "_" (button/ li).
    let button = event.target.closest("button");
    let li = event.target.closest("li");

    if (!li) return;
    let id = li.id;

    if (button) {    // in case clicked on btn/it's inside img
        if (button.classList.contains("paused")) {
            playSong(id);
        }
        else if (button.classList.contains("playing")) {
            pauseSong(id);
        }
    }

    else {    // in case clicked on list/it's inside content
        playSong(id);
    }

});


// ============ listen to clicks on trending songs ===========
document.querySelector(".trending-container").addEventListener("click", async (event) => {

    let clickedCard = event.target.closest(".trending-card");
    if (!clickedCard) return;

    let id = clickedCard.dataset.trendingId;

    // ---- load trending songs in library if not present ----
    if (folder !== "trendingSongs") {
        // Pause current song BEFORE getSongs() clears songsUL
        if (!audio.paused) {
            pauseSong(audio.id);
        }

        folder = "trendingSongs";
        await getSongs("trendingSongs");
    }
    console.log("current folder : ", folder);

    // Starts from the current element and moves upwards through its ancestors until it finds button.
    let button = event.target.closest("button");

    if (button) {    // in case clicked on btn/it's inside img
        if (button.classList.contains("paused")) {
            playSong(id);
        }
        else if (button.classList.contains("playing")) {
            pauseSong(id);
        }
    }
    else {
        playSong(id);
    }

});



// ============ listen to clicks on albums ===========
document.querySelector(".favSongs-container").addEventListener("click", async (event) => {

    let clickedAlbum = event.target.closest(".favSongs-card");
    if (!clickedAlbum) return;

    let id = clickedAlbum.dataset.albumId;

    // ---- load album in library if not present ----
    if (folder !== `albums/album${Number(id) + 1}`) {
        // Pause current song BEFORE getSongs() clears songsUL
        if (!audio.paused) {
            pauseSong(audio.id);
        }

        folder = `albums/album${Number(id) + 1}`;
        await getSongs(`albums/album${Number(id) + 1}`);
    }
    console.log("current folder : ", folder);

    // Starts from the current element and moves upwards through its ancestors until it finds button.
    let button = event.target.closest("button");

    if (button) {    // in case clicked on btn/it's inside img
        if (button.classList.contains("paused")) {
            playSong(0);  // --- play 1st song ----
            // --- show library for further interaction with album songs ----
            hamburger.click();
        }
        else if (button.classList.contains("playing")) {
            pauseSong(audio.id);
        }
    }
    else {
        playSong(0);    // --- play 1st song ----
        // --- show library for further interaction with album songs ----
        hamburger.click();
    }

});



// ============ listen to clicks on artists ===========
document.querySelector(".favArtists-container").addEventListener("click", async (event) => {

    let clickedArtist = event.target.closest(".favArtists-card");
    if (!clickedArtist) return;

    let id = clickedArtist.dataset.artistId;

    // ---- load artist in library if not present ----
    if (folder !== `artists/artist${Number(id) + 1}`) {
        // Pause current song BEFORE getSongs() clears songsUL
        if (!audio.paused) {
            pauseSong(audio.id);
        }

        folder = `artists/artist${Number(id) + 1}`;
        await getSongs(`artists/artist${Number(id) + 1}`);
    }
    console.log("current folder : ", folder);

    // Starts from the current element and moves upwards through its ancestors until it finds button.
    let button = event.target.closest("button");

    if (button) {    // in case clicked on btn/it's inside img
        if (button.classList.contains("paused")) {
            playSong(0);  // --- play 1st song ----
            // --- show library for further interaction with artist's songs ----
            hamburger.click();
        }
        else if (button.classList.contains("playing")) {
            pauseSong(audio.id);
        }
    }
    else {
        playSong(0);    // --- play 1st song ----
        // --- show library for further interaction with artist's songs ----
        hamburger.click();
    }

});



// ========== update 'seekbar UI & value' + 'currTime' with timeupdate of current song ===========
audio.addEventListener("timeupdate", () => {
    // if audio.duration is unavailable
    if (!audio.duration) return;

    seekBar.value = audio.currentTime;
    // console.log(seekBar.value);

    currTime.innerHTML = `${Math.floor(audio.currentTime / 60).toString().padStart(2, "0")}:${Math.floor(audio.currentTime % 60).toString().padStart(2, "0")}`;

    const progress = (audio.currentTime / audio.duration) * 100;

    seekBar.style.background =
        `linear-gradient(to right, #1DB954 ${progress}%, #d3d2d261 ${progress + 1}%)`;
});


// ------ listen to seekBar input ---------
seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});


// ---- previous btn -----
prevBtn.addEventListener("click", () => {
    let id = Number(playBar.id);
    if (id - 1 < 0)
        playSong(songsArr.length - 1);
    else
        playSong(id - 1);
});

// ------- play/pause btn in playBar ---------
playBtnInPlayBar.addEventListener("click", () => {
    if (audio.paused)
        playSong(playBar.id);
    else
        pauseSong(playBar.id);
});

// ------ next btn --------
nextBtn.addEventListener("click", () => {
    let id = Number(playBar.id);
    if (id + 1 >= songsArr.length)
        playSong(0);
    else
        playSong(id + 1);
});

// ---- to update UI when current song ends naturally ----
audio.addEventListener("ended", () => {
    pauseSong(audio.id);
    // nextBtn.click();
});


// ---------- display/hide left SideBar on hamburger's click ------------
hamburger.addEventListener("click", () => {
    left.classList.toggle("show");

    if (left.classList.contains("show"))
        hamburger.src = "assets/close.svg";
    else
        hamburger.src = "assets/hamburger.svg"
});

// ------ listen to about Btn clicks ------
let aboutBtn = document.querySelector(".aboutBtn");
aboutBtn.addEventListener("click", () => {
    // --- call scrollIntoView() method for about Section ---
    document.querySelector("#aboutSection").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// ------ listen to contact us  Btn clicks ------
let contactBtn = document.querySelector(".contactBtn");
contactBtn.addEventListener("click", () => {
    // --- call scrollIntoView() method for contact Section ---
    document.querySelector("#contactSection").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
