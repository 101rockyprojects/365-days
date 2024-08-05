import { showOopsie } from './error.js';
import { PLAYLIST_ID, API_KEY } from './globals.js';

const today = new Date();
const dayNumber = getDayNumber(today);
const isBirthday = (dayNumber) === 219; // August 6th

if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined' || typeof(window.YT) == 'undefined') {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

async function getTodayVideo(playlistId, apiKey) {
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
    if (video.snippet.title === 'Private video' || video.snippet.title === 'Deleted video') {
        return showOopsie('Oops,', 'Parece que este video fue borrado o se encuentra privado.');
    }
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
    loadPlayer();
    const songParam = getParameterByName('song');
    let video;
    if (songParam) {
        try {
            video = await getVideoById(songParam, API_KEY);
        } catch (error) {
            return showOopsie('Vaya,', 'Parece que no se pudo encontrar el video. Comprueba el id.');
        }
    }
    if (!video) {
        try {
            video = await getTodayVideo(PLAYLIST_ID, API_KEY);
        } catch (error) {
            return showOopsie('Vaya,', 'No se pudo encontrar el video de hoy. Intenta más tarde.');
        }
    }
    if (video) {
      loadVideo(video);
    }
}

function loadPlayer() {
  window.onYouTubePlayerAPIReady = function() {
      onYouTubePlayer();
  };
}

function onYouTubePlayer(videoId, width, height) {
  
  const player = new YT.Player('player', {
      height: height,
      width: width,
      videoId: videoId,
      playerVars: {
          controls: 1,
          showinfo: 0,
          rel: 0,
          showsearch: 0,
          iv_load_policy: 3
      },
      events: {
          'onStateChange': onPlayerStateChange,
          'onError': catchError
      }
  });
  return player;
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
      done = true;
  } else if (event.data == YT.PlayerState.ENDED) {
      location.reload();
      event.target.destroy();
  }
}

function catchError(event) {
  if (event.data == 100) console.log("...");
}

function loadVideo(video) {
  const videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : video.id;
  window.YT.ready(function() {
    new window.YT.Player("video", {
      height: '283',
      width: '504',
      videoId: videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
    const videoTitle = document.querySelector('.video-title');
    const loadingGif = document.querySelector('.loading');
    const todayDateElement = document.getElementById('today-date');
    const youtubeLink = document.querySelector('.listen-now');
    youtubeLink.href = `https://youtube.com/watch?v=${videoId}`;
    videoTitle.classList.add('title');
    const maxTitleLength = 64;
    const title = video.snippet.title.length > maxTitleLength ? 
                  video.snippet.title.slice(0, maxTitleLength - 3) + '...' : 
                  video.snippet.title;
    videoTitle.innerText = title;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    todayDateElement.textContent = formattedDate;
    loadingGif.style.display = 'none';
    document.getElementById('video').style.display = 'block';
    document.querySelector('.today').style.display = 'flex';
    if (isBirthday) {
      document.querySelector('.confetti').style.display = 'block';
    }
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    // var videoStatuses = Object.entries(window.YT.PlayerState)
    // console.log(videoStatuses.find(status => status[1] === event.data)[0])
  }
}

initialize();
