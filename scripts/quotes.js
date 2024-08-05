const today = new Date();
const dayNumber = getDayNumber(today);
const isBirthday = (dayNumber) === 219; // August 6th

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

const birthQuotes = [
    '"Cada día que pasa, me siento más afortunado de tenerte a mi lado."',
    '"Cada día canción de amor me recuerda a ti."',
    '"Hoy las canciones románticas tienen más sentido."',
    '"Milagros, palabra que engloba lo más importante de mi vida."',
    '"En cada nota de esta canción, celebro el milagro de tu existencia."',
    '"Eres mi milagro cada día."',
    '"Coincidir contigo es el mayor milagro."',
    '"Para la mujer divina que le está sonriendo a la pantalla justo ahora."',
    '"Hoy el mundo celebra tu cumpleaños; yo celebro el milagro de tenerte en mi vida."',
];

function randomQuote() {
    const quoteIndex = isBirthday ? getRandomQuoteIndex(birthQuotes.length) : getRandomQuoteIndex(quotes.length);
    const quoteElement = document.querySelector('.quote');
    quoteElement.textContent = isBirthday ? birthQuotes[quoteIndex] : quotes[quoteIndex];
}

function getRandomQuoteIndex(max) {
    return Math.floor(Math.random() * max);
}

function getDayNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - firstDayOfYear;
    const dayToMiliseconds = 1000 * 60 * 60 * 24;
    const DayNumber = Math.floor(diff / dayToMiliseconds);
    return DayNumber;
}

randomQuote();