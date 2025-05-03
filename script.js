// Music Player JavaScript

// DOM Elements
const audioElement = document.getElementById('audio-element');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');
const progressBar = document.querySelector('.progress');
const progressArea = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('current-time');
const maxDurationEl = document.getElementById('max-duration');
const albumCover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playlistContainer = document.getElementById('playlist');
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const visualizer = document.getElementById('visualizer');

// Music data - sample tracks
const musicList = [
    {
        title: "Summer Vibes",
        artist: "Chill Wave",
        img: "https://source.unsplash.com/random/300x300/?summer",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "3:15"
    },
    {
        title: "Midnight Dreams",
        artist: "Sleepy Notes",
        img: "https://source.unsplash.com/random/300x300/?night",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "4:20"
    },
    {
        title: "Ocean Waves",
        artist: "Nature Sounds",
        img: "https://source.unsplash.com/random/300x300/?ocean",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "2:45"
    },
    {
        title: "Urban Jungle",
        artist: "City Beats",
        img: "https://source.unsplash.com/random/300x300/?city",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: "3:50"
    },
    {
        title: "Mountain High",
        artist: "Peak Experience",
        img: "https://source.unsplash.com/random/300x300/?mountain",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: "5:10"
    }
];

// Global variables
let musicIndex = 0;
let isPlaying = false;
let isRepeat = false;
let isShuffle = false;
let updateTimer;

// Initialize the music player
function loadMusic(index) {
    clearInterval(updateTimer);
    resetMusic();
    
    audioElement.src = musicList[index].src;
    albumCover.src = musicList[index].img;
    title.textContent = musicList[index].title;
    artist.textContent = musicList[index].artist;
    
    updateTimer = setInterval(updateProgress, 500);
    
    audioElement.addEventListener('ended', nextMusic);
    
    // Highlight active song in playlist
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`.playlist-item[data-index="${index}"]`)?.classList.add('active');
}

// Reset music player
function resetMusic() {
    currentTimeEl.textContent = "0:00";
    maxDurationEl.textContent = "0:00";
    progressBar.style.width = "0%";
}

// Format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audioElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        maxDurationEl.textContent = formatTime(duration);
    }
}

// Play/Pause music
function playPauseMusic() {
    if (isPlaying) {
        audioElement.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumCover.parentElement.classList.remove('playing');
    } else {
        audioElement.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumCover.parentElement.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Previous music
function prevMusic() {
    musicIndex = (musicIndex - 1 + musicList.length) % musicList.length;
    loadMusic(musicIndex);
    if (isPlaying) {
        audioElement.play();
    }
}

// Next music
function nextMusic() {
    if (isRepeat) {
        audioElement.currentTime = 0;
        audioElement.play();
        return;
    }
    
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * musicList.length);
        } while (randomIndex === musicIndex);
        
        musicIndex = randomIndex;
    } else {
        musicIndex = (musicIndex + 1) % musicList.length;
    }
    
    loadMusic(musicIndex);
    if (isPlaying) {
        audioElement.play();
    }
}

// Set progress when clicked on progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    
    audioElement.currentTime = (clickX / width) * duration;
}

// Toggle repeat
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
}

// Set volume
function setVolume() {
    audioElement.volume = volumeSlider.value / 100;
    
    if (audioElement.volume === 0) {
        volumeIcon.className = "fas fa-volume-mute";
    } else if (audioElement.volume < 0.4) {
        volumeIcon.className = "fas fa-volume-down";
    } else {
        volumeIcon.className = "fas fa-volume-up";
    }
}

// Toggle mute
function toggleMute() {
    if (audioElement.volume === 0) {
        audioElement.volume = 0.7;
        volumeSlider.value = 70;
        volumeIcon.className = "fas fa-volume-up";
    } else {
        audioElement.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.className = "fas fa-volume-mute";
    }
}

// Create playlist items
function createPlaylist() {
    playlistContainer.innerHTML = '';
    
    musicList.forEach((music, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        li.dataset.index = index;
        
        if (index === musicIndex) {
            li.classList.add('active');
        }
        
        li.innerHTML = `
            <img src="${music.img}" alt="${music.title}">
            <div class="playlist-item-info">
                <h4>${music.title}</h4>
                <p>${music.artist}</p>
            </div>
            <span class="duration">${music.duration}</span>
        `;
        
        li.addEventListener('click', () => {
            musicIndex = index;
            loadMusic(musicIndex);
            playPauseMusic();
            if (!isPlaying) {
                playPauseMusic();
            }
        });
        
        playlistContainer.appendChild(li);
    });
}

// Toggle sidebar on mobile
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// Audio visualizer
function setupVisualizer() {
    const ctx = visualizer.getContext('2d');
    let audioContext, analyser, dataArray;
    
    visualizer.width = window.innerWidth;
    visualizer.height = 100;
    
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            
            const source = audioContext.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        }
    }
    
    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);
        
        if (!audioContext || !isPlaying) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, visualizer.width, visualizer.height);
        
        const barWidth = (visualizer.width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;
        
        const gradient = ctx.createLinearGradient(0, 0, visualizer.width, 0);
        gradient.addColorStop(0, '#8e44ad');
        gradient.addColorStop(1, '#3498db');
        
        for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i] / 2;
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
    
    audioElement.addEventListener('play', function() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
    });
    
    playPauseBtn.addEventListener('click', function() {
        if (!audioContext) {
            initAudio();
            drawVisualizer();
        }
    });
    
    window.addEventListener('resize', function() {
        visualizer.width = window.innerWidth;
    });
}

// Event Listeners
playPauseBtn.addEventListener('click', playPauseMusic);
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);
repeatBtn.addEventListener('click', toggleRepeat);
shuffleBtn.addEventListener('click', toggleShuffle);
volumeSlider.addEventListener('input', setVolume);
volumeIcon.addEventListener('click', toggleMute);
progressArea.addEventListener('click', setProgress);
menuToggle.addEventListener('click', toggleSidebar);

// Initialize
window.addEventListener('load', () => {
    loadMusic(musicIndex);
    createPlaylist();
    setupVisualizer();
});