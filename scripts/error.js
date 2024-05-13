
export function showOopsie(title, msg) {
    const videoInfo = document.querySelector('.video-info');
    videoInfo.style.display = 'flex';
    videoInfo.style.flexDirection = 'column';
    const videoContainer = document.querySelector('.video-container');
    const todayContainer = document.querySelector('.today');
    const errorMessageDiv = document.createElement('div');
    const errorTitle = document.createElement('h2');
    const errorImage = document.createElement('img');
    errorTitle.className = 'error-title';
    errorMessageDiv.className = 'error-message';
    errorTitle.textContent = title;
    errorMessageDiv.textContent = msg;
    errorImage.src = 'assets/youtube.webp';
    errorImage.width = 90;
    errorImage.height = 85;
    errorMessageDiv.appendChild(errorImage);
    videoContainer.parentNode.insertBefore(errorMessageDiv, videoContainer);
    videoContainer.parentNode.insertBefore(errorTitle, errorMessageDiv);
    videoContainer.style.display = 'none';
    todayContainer.style.display = 'none';
}