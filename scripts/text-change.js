function animateText() {
    const titleElement = document.getElementById('title-365');
    const texts = ['días', 'canciones'];
    let index = 0;

    function updateText() {
        const text = texts[index];
        let newText = '';
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            newText += text[charIndex];
            titleElement.textContent = newText;
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                setTimeout(() => {
                    const deletingInterval = setInterval(() => {
                        newText = newText.slice(0, -1);
                        titleElement.textContent = newText;
                        if (newText === '') {
                            clearInterval(deletingInterval);
                            setTimeout(() => {
                                index = (index + 1) % texts.length;
                                updateText();
                            }, 1000);
                        }
                    }, randomTypingTime() * 50 + 50);
                }, 4000);
            }
        }, randomTypingTime() * 50 + 100);
    }

    updateText();
}

function randomTypingTime() {
    var random = Math.floor(Math.random() * 2);
    return random + 1;
}

animateText();