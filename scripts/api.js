import { PLAYLIST_ID, API_KEY } from './globals.js';

async function getTodayVideo(playlistId, apiKey) {
    const today = new Date();
    const dayNumber = getDayNumber(today);
    const pageNumber = Math.ceil(dayNumber / 50);
    let actualPage = 1;
    let nextPageToken = '';
    while (actualPage < pageNumber) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`);
        const data = await response.json();
        nextPageToken = data.nextPageToken;
        actualPage++;
    }
    const videoIndex = (dayNumber - 1) % 50; // Video index
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`);
    const data = await response.json();
    const video = data.items[videoIndex];

    return video;
}

async function getVideoById(videoId, apiKey) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
    const data = await response.json();
    return data.items[0];
}

function getDayNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - firstDayOfYear;
    const dayToMiliseconds = 1000 * 60 * 60 * 24;
    const DayNumber = Math.floor(diff / dayToMiliseconds);
    return DayNumber;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function initialize() {
    const songParam = getParameterByName('song');
    let video;
    if (songParam) {
        try {
            video = await getVideoById(songParam, API_KEY);
        } catch (error) {
            console.error("Error al obtener el video por ID:", error);
        }
    }
    if (!video) {
        try {
            video = await getTodayVideo(PLAYLIST_ID, API_KEY);
        } catch (error) {
            console.error("Error al obtener el video del día:", error);
        }
    }
    showVideo(video);
}

function showVideo(video) {
    const videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : video.id;
    const thumbnailUrl = video.snippet.thumbnails.high.url;
    const thumbnailWidth = video.snippet.thumbnails.high.width;
    const thumbnailHeight = video.snippet.thumbnails.high.height;
    const container = document.querySelector('.video-container');
    const videoTitle = document.createElement('h3');
    const videoElement = document.querySelector('.video-element');
    const todayDateElement = document.getElementById('today-date');
    const listenNowLink = document.querySelector('.listen-now');
    videoTitle.classList.add('title');
    const maxTitleLength = 40;
    const title = video.snippet.title.length > maxTitleLength ? 
                  video.snippet.title.slice(0, maxTitleLength) + '...' : 
                  video.snippet.title;
    videoTitle.innerText = title;
    videoElement.width = thumbnailWidth;
    videoElement.height = thumbnailHeight;
    videoElement.src = thumbnailUrl;
    videoElement.alt = video.snippet.title;
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    todayDateElement.textContent = formattedDate;
    listenNowLink.href = `https://youtube.com/watch?v=${videoId}`;
    container.appendChild(videoTitle);
    container.appendChild(videoElement);
}

initialize();
