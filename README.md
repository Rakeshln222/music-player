

# 🎵 Harmony - Music Player

**Harmony** is a sleek, responsive, and visually appealing web-based **music player** built with **HTML5**, **CSS3**, and **JavaScript**. It features a user-friendly interface with album art rotation, real-time audio visualizer, playlist management, responsive layout, and smooth controls for playing music from a curated list of online MP3 tracks.

---

## 🚀 Features

* 🎧 **Play/Pause/Skip Controls**
* 🔁 **Repeat** and 🔀 **Shuffle** functionality
* 📊 **Audio Visualizer** with canvas animation
* 🔊 **Volume Control** with mute/unmute toggle
* 🎵 **Live Playlist Generation** from music data
* 📀 **Animated Album Cover** with vinyl rotation
* 📱 **Responsive UI** for mobile and desktop
* 🌈 **Stylish Design** with gradient themes and custom fonts

---

## 📂 Files Overview

| File         | Description                                |
| ------------ | ------------------------------------------ |
| `index.html` | Structure of the music player UI           |
| `style.css`  | Styling and layout with animations         |
| `script.js`  | Functionality, interactivity, and playlist |

---

## 🧠 How It Works

### 🎼 Playlist Generation

The songs are stored in a `musicList[]` array with the following fields:

```javascript
{
  title: "Ocean Waves",
  artist: "Nature Sounds",
  img: "URL-to-image",
  src: "URL-to-audio",
  duration: "2:45"
}
```

These are dynamically loaded into the playlist using JavaScript on page load.

---

### 🎮 Controls Logic

Each button has an event listener:

* `playPauseBtn`: Toggles music playback and rotates the album cover.
* `nextBtn` / `prevBtn`: Navigates through the playlist.
* `repeatBtn`: Loops the current track.
* `shuffleBtn`: Randomizes the next track selection.

---

### 📊 Visualizer

An animated canvas reacts to the frequencies of the currently playing audio using the Web Audio API:

* `AnalyserNode` processes audio frequency data
* Bars are drawn on `<canvas>` in real time
* Reacts only when music is playing

---

### 📱 Responsiveness

Media queries adapt layout:

* Sidebar becomes collapsible
* Album art and controls scale for smaller screens
* Grid-based layout changes to vertical stacking on mobile


---

## 🛠 Technologies Used

* **HTML5** – Semantic layout
* **CSS3** – Styling, gradients, animations
* **JavaScript (ES6)** – DOM manipulation, playlist logic, audio controls
* **Font Awesome** – Icons for player controls
* **Google Fonts** – Poppins font for smooth readability
* **Web Audio API** – Real-time audio visualization

---

## 💡 To Customize

* 🎵 Replace `musicList` with your own song data.
* 🖼️ Replace image URLs for album covers.
* 🎨 Modify `:root` in `style.css` to change theme colors.

---

## 🔧 Installation

Just open `index.html` in any browser — **no installation or dependencies** required.

> To host online, upload files to GitHub Pages, Netlify, or Vercel.

---

## 📌 Credits

* Audio Tracks: [SoundHelix.com](https://www.soundhelix.com/)
* Icons: [Font Awesome](https://fontawesome.com/)
* Backgrounds: [Unsplash](https://unsplash.com/)

---

## 📄 License

This project is licensed under the **MIT License** – free to use, modify, and distribute for educational and personal use.

---

## 🙋‍♂️ Author

**Rakesh L N**
Frontend Developer | UI Designer | Music Lover
📧 [rakeshln0000@gmail.com]

