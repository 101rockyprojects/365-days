import { PLAYLIST_ID, API_KEY } from './globals.js';

const today = new Date();
const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start;
const oneDay = 1000 * 60 * 60 * 24;
const dayIndex = Math.floor(diff / oneDay);

const pageToken = dayIndex % 50; // Cada página tiene 50 videos

const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${PLAYLIST_ID}&key=${API_KEY}&pageToken=${pageToken}`;
console.log(apiUrl);

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.items.length > 0) {
      const title = data.items[0].snippet.title;
      const videoId = data.items[0].snippet.resourceId.videoId;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      showVideo({ title, videoUrl });
    } else {
      console.log('No se encontró ningún video para este día del año.');
    }
  })
  .catch(error => console.error('Error al obtener el video:', error));

function showVideo(video) {
  console.log('Video:', video);
  const container = document.querySelector('.video-container');
  const videoTitle = document.createElement('h3');
  const videoElement = document.createElement('iframe');
  videoTitle.classList.add('title');
  videoTitle.innerText = video.title;
  videoElement.src = video.videoUrl;
  container.appendChild(videoElement);
}