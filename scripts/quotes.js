const quotes = [
    '"Hay tantas canciones que me recuerdan a ti"',
    '"No solo tengo buenos gustos musicales, también me gustas tú"',
    '"Ni todas las canciones del mundo sonarían mejor que tú diciendome \'Te amo\'"',
    '"Tu voz es mi sonido favorito"',
    '"El mayor deleite auditivo (esta canción) para el mayor deleite visual (tú)"',
    '"Quiero escucharte cantar esta canción"',
    '"Una canción que amo para la persona que más amo"',
    '"La música es el lenguaje del corazón"',
    '"Tu risa es mi melodía favorita"',
    '"Ya quiero bailar esta contigo"',
    '"¿Me concedes esta pieza?"',
    '"Romeo Santos odiaría estas cancioncitas de amor"',
    '"La música es una de las tantas formas en la que expreso mi amor por ti"',
    '"Música es verte tarareando feliz"',
];

function randomQuote() {
    const quoteIndex = getRandomQuoteIndex(quotes.length);
    const quoteElement = document.querySelector('.quote');
    quoteElement.textContent = quotes[quoteIndex];
}

function getRandomQuoteIndex(max) {
    return Math.floor(Math.random() * max);
}

randomQuote();