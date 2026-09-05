# 🎧 Tunexa

> **Tunexa** is a responsive frontend music streaming interface built using **HTML, CSS, and Vanilla JavaScript**.

The project is inspired by modern music-streaming platforms and was created as a frontend development project to practice responsive UI design, DOM manipulation, asynchronous JavaScript, Fetch API, dynamic content rendering, audio controls, event handling, and client-side interaction.

---

## 🌐 Live Demo

🎵 **[Visit Tunexa Live](https://tunexa-ananta.netlify.app/)**

_Experience the responsive music interface directly in your browser._

---

## ✨ Features

- 🎧 Music streaming interface
- 🎵 Dynamic music library with playable tracks
- 🔥 Dynamically generated Trending Now section
- 💿 Dynamically generated Albums section
- 🎤 Dynamically generated Artists section
- ▶️ Play / Pause controls
- ⏮️ Previous & ⏭️ Next track controls
- 🎚️ Interactive seek bar with playback time
- ⏱️ Current time and total duration display
- 📱 Responsive design for desktop, tablet, and mobile screens
- 🔄 Automatic UI updates when songs change
- 🍔 Mobile sidebar controlled through a hamburger menu
- 📖 About & Contact sections
- 🗂️ info.json metadata for dynamically generated content

---

## 🛠️ Tech Stack

| Technology            | Purpose                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| **HTML5**             | Structures the navigation, library, music sections, cards, player, and informational sections.                |
| **CSS3**              | Handles the dark-themed interface, layouts, music cards, animations, player styling, and responsive behavior. |
| **JavaScript (ES6+)** | Handles dynamic content, music playback, player controls, UI updates, event handling, and navigation.         |
| **Fetch API & JSON**  | Used to retrieve music metadata and dynamically populate songs, albums, artists, and trending content.        |
| **Audio API**         | Provides browser-based music playback and playback controls.                                                  |

---

## 📂 Project Structure

    Tunexa/
    │
    ├── index.html
    ├── style.css
    ├── script.js
    ├── README.md
    │
    ├── assets/
    │   ├── logo.svg
    │   ├── favicon.svg
    │   ├── hamburger.svg
    │   ├── home-icon.svg
    │   ├── about.svg
    │   ├── contact.svg
    │   ├── search.svg
    │   ├── libraryIcon.svg
    │   ├── globe.svg
    │   ├── music.svg
    │   ├── paused.svg
    │   ├── playing.svg
    │   ├── previous.svg
    │   └── next.svg
    │
    ├── librarySongs/
    |   ├── songs.json
    │   └── *.mp3
    │
    ├── trendingSongs/
    │   ├── info.json
    |   ├── songs.json
    |   ├── *.jpg
    │   └── *.mp3
    │
    ├── albums/
    |   ├── albums.json
    │   ├── album1/
    │   │   ├── info.json
    │   │   ├── cover.jpg
    |   |   ├── songs.json
    │   │   └── *.mp3
    │   ├── album2/
    │   └── ...
    │
    └── artists/
        ├── artists.json
        ├── artist1/
        │   ├── info.json
        │   ├── cover.jpg
        |   ├── songs.json
        │   └── *.mp3
        ├── artist2/
        └── ...

---

## ⚡ JavaScript & Interactivity

JavaScript acts as the core of Tunexa's interactive experience.

### - Dynamic Content Loading

Songs, trending tracks, albums, and artists are loaded dynamically instead of being hardcoded into the HTML.

### - Music Playback

Selecting a song loads it into the browser's audio player and starts playback.

### - Player Controls

Users can play, pause, switch to the previous track, or move to the next track.

### - Seek Bar

Playback progress is displayed in real time, and users can seek to different positions within a song.

### - Player Synchronization

Song information, play/pause icons, and playback state stay synchronized across the interface.

### - Albums & Artists

Selecting an album or artist loads its corresponding collection of songs into the library.

### - Trending Songs

Trending cards are interactive and can directly load their associated tracks.

### - Event Delegation

Used to handle interactions with dynamically generated song and music elements efficiently.

### - Mobile Sidebar

The hamburger menu opens and closes the library sidebar on smaller screens.

### - Smooth Navigation

Navigation buttons smoothly scroll to the About and Contact sections.

---

## 📱 Responsive Design

Tunexa is designed to adapt across:

> **Desktop → Tablet → Mobile → Small Mobile**

CSS media queries progressively adjust:

- Navigation and spacing
- Sidebar layout and behavior
- Music card sizes
- Typography
- Player layout
- Search visibility
- Mobile navigation

On smaller screens, the library transforms into a **slide-in sidebar**, allowing the main content to make better use of the available screen width.

---

## ⚙️ Setup & Installation

### Prerequisites

- A modern web browser
- VS Code or any preferred code editor
- A local development server such as **Live Server**

### 1. Clone the Repository

    git clone https://github.com/anantasangwan/tunexa.git

### 2. Navigate to the Project Directory

    cd Tunexa

### 3. Open the Project

Open the cloned project folder in **VS Code**.

### 4. Start a Local Server

Launch the project using **Live Server** or another local development server.

> A local server is recommended because Tunexa uses the **Fetch API** to load folders and JSON files dynamically.

### 5. Open in Browser

Open the local URL provided by your development server and start exploring the Tunexa music interface.

---

## 🎯 What I Practiced

This project was built with the objective to practice and strengthen practical frontend development skills, including:

- Responsive UI design
- Flexbox and CSS layouts
- Media queries
- DOM manipulation
- Event handling and event delegation
- Async/Await
- Fetch API
- JSON handling
- Browser Audio API
- Dynamic content generation
- Data attributes
- Client-side UI state management

---

## 🚀 Future Improvements

- 🔎 Functional search
- ❤️ Favorites and playlists
- 🔀 Shuffle and repeat
- 🔐 User authentication

---

## 👨‍💻 Author

**Ananta Sangwan**

_BCA Student | Frontend Development_

- GitHub: [@anantasangwan](https://github.com/anantasangwan)
- LinkedIn: [Ananta Sangwan](https://www.linkedin.com/in/anantasangwan/)

---

_Tunexa is an independently developed frontend project created for learning and portfolio purposes._
