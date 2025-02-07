// Standardwerte für Wasserstatus, Eiergröße und Eigrad
let selectedSize = 'M'; // Standard: Mittel (M)
let selectedType = 'medium'; // Standard: Medium
let selectedWaterState = 'cold';
const waterCookingTime = 60 * 7;
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
// Schaltflächen für Eiergröße
document.querySelectorAll('.water-state').forEach(button => {
    button.addEventListener('click', function() {
        // Entferne die "active"-Klasse von allen Schaltflächen
        document.querySelectorAll('.water-state').forEach(btn => btn.classList.remove('active'));
        // Füge die "active"-Klasse der ausgewählten Schaltfläche hinzu
        this.classList.add('active');
        // Aktualisiere die ausgewählte Eiergröße
        selectedWaterState = this.getAttribute('data-water');
        updateTime(); // Aktualisiere die Zeit basierend auf der Auswahl
    });
});

let currentLanguage = 'de'; // Standardsprache
let translations = {};

// Sprachdatei laden
async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  translations = await response.json();
  applyTranslations();
}

// Texte in der Anwendung aktualisieren
function applyTranslations() {
  document.querySelector('h1').textContent = translations.title;
  document.querySelector('label-label').textContent = translations.languageLabel;
  document.querySelector('.water-state-label').textContent = translations.waterState;
  document.querySelector('.water-state[data-water="cooking"]').textContent = translations.waterCooking;
  document.querySelector('.water-state[data-water="cold"]').textContent = translations.waterCold;
  document.querySelector('.egg-size-label').textContent = translations.eggSizeLabel;
  document.querySelector('.egg-size[data-size="S"]').textContent = translations.eggSizeS;
  document.querySelector('.egg-size[data-size="M"]').textContent = translations.eggSizeM;
  document.querySelector('.egg-size[data-size="L"]').textContent = translations.eggSizeL;
  document.querySelector('.egg-type-label').textContent = translations.eggTypeLabel;
  document.querySelector('.egg-type[data-type="soft"]').textContent = translations.eggTypeSoft;
  document.querySelector('.egg-type[data-type="medium"]').textContent = translations.eggTypeMedium;
  document.querySelector('.egg-type[data-type="hard"]').textContent = translations.eggTypeHard;
//  document.querySelector('#minutes').previousElementSibling.textContent = translations.minutesLabel;
//  document.querySelector('#seconds').previousElementSibling.textContent = translations.secondsLabel;
  document.querySelector('.minutes-label').textContent = translations.minutes;
  document.querySelector('.seconds-label').textContent = translations.seconds;
  document.querySelector('#start').textContent = translations.startButton;
  document.querySelector('#reset').textContent = translations.resetButton;
}

// Sprache wechseln
document.getElementById('language-select').addEventListener('change', (event) => {
  currentLanguage = event.target.value;
  loadLanguage(currentLanguage);
});

// Standardsprache laden
loadLanguage(currentLanguage);


// Schaltflächen für Eiergröße
document.querySelectorAll('.egg-size').forEach(button => {
    button.addEventListener('click', function() {
        // Entferne die "active"-Klasse von allen Schaltflächen
        document.querySelectorAll('.egg-size').forEach(btn => btn.classList.remove('active'));
        // Füge die "active"-Klasse der ausgewählten Schaltfläche hinzu
        this.classList.add('active');
        // Aktualisiere die ausgewählte Eiergröße
        selectedSize = this.getAttribute('data-size');
        updateTime(); // Aktualisiere die Zeit basierend auf der Auswahl
    });
});

// Schaltflächen für Eigrad
document.querySelectorAll('.egg-type').forEach(button => {
    button.addEventListener('click', function() {
        // Entferne die "active"-Klasse von allen Schaltflächen
        document.querySelectorAll('.egg-type').forEach(btn => btn.classList.remove('active'));
        // Füge die "active"-Klasse der ausgewählten Schaltfläche hinzu
        this.classList.add('active');
        // Aktualisiere den ausgewählten Eigrad
        selectedType = this.getAttribute('data-type');
        updateTime(); // Aktualisiere die Zeit basierend auf der Auswahl
    });
});

// Kochzeiten in Sekunden (basierend auf Eiergröße und Eigrad)
const cookingTimes = {
    S: { soft: 4 * 60, medium: 5 * 60, hard: 7 * 60 },
    M: { soft: 5 * 60, medium: 6 * 60, hard: 8 * 60 },
    L: { soft: 6 * 60, medium: 7 * 60, hard: 9 * 60 },
};

// Funktion zur Aktualisierung der Zeit basierend auf der Auswahl
function updateTime() {
    let time = cookingTimes[selectedSize][selectedType];
    if (selectedWaterState === 'cold') {
        time = time + waterCookingTime;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerMinutes.value = minutes;
    timerSeconds.value = seconds;
}

// Manuelle Eingabe überwachen
timerMinutes.addEventListener('input', handleManualInput);
timerSeconds.addEventListener('input', handleManualInput);

function handleManualInput() {
    const minutes = parseInt(timerMinutes.value) || 0;
    const seconds = parseInt(timerSeconds.value) || 0;

    // Wenn eine manuelle Zeit eingegeben wird, setze die Auswahl auf "Custom"
    if (minutes > 0 || seconds > 0) {
        document.querySelectorAll('.water-state').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.egg-size').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.egg-type').forEach(btn => btn.classList.remove('active'));
        selectedSize = 'custom';
        selectedType = 'custom';
        selectedWaterState = 'custom';
    } 
}

// Theme-Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showTheme(index) {
    carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    const selectedTheme = carouselItems[index].getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme); // Theme speichern
}

document.getElementById('prev-theme').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    showTheme(currentIndex);
});

document.getElementById('next-theme').addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    showTheme(currentIndex);
});

// Beim Laden der Seite das gespeicherte Thema anwenden
const savedTheme = localStorage.getItem('theme') || 'light';
const savedIndex = Array.from(carouselItems).findIndex(item => item.getAttribute('data-theme') === savedTheme);
currentIndex = savedIndex !== -1 ? savedIndex : 0;
showTheme(currentIndex);

// Timer starten
document.getElementById('start').addEventListener('click', function() {
    const manualMinutes = parseInt(timerMinutes.value) || 0;
    const manualSeconds = parseInt(timerSeconds.value) || 0;
    let time = manualMinutes * 60 + manualSeconds;

    // Überprüfen, ob die Zeit gültig ist
    if (time <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bitte gib eine gültige Zeit ein.',
        });
        return;
    }

    const timerElement = document.getElementById('timer');
    const alarm = document.getElementById('alarm');

    // Timer starten
    const interval = setInterval(() => {
        const minutesLeft = Math.floor(time / 60);
        const secondsLeft = time % 60;
        timerElement.textContent = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

        document.getElementById('reset').addEventListener('click', function() {
            clearInterval(interval); // Stoppt den Timer
            document.getElementById('minutes').value = '0';
            document.getElementById('seconds').value = '0';
            document.getElementById('timer').textContent = '0:00';
            alarm.pause();
            alarm.currentTime = 0;
            // Setze die Auswahl zurück
            document.querySelectorAll('.egg-size').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.egg-type').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.egg-size[data-size="M"]').classList.add('active');
            document.querySelector('.egg-type[data-type="medium"]').classList.add('active');
            selectedSize = 'M';
            selectedType = 'medium';
        });

        if (time <= 0) {
            clearInterval(interval);

            // Alarm-Sound abspielen
            alarm.play();
            
            // Zeit seit Ablaufen des Timers
            let elapsedTime = 0;

            // SweetAlert2-Dialog anzeigen
            Swal.fire({
                icon: 'success',
                title: 'Zeit abgelaufen!',
                color: "var(--text-color)",
                background: "var(--background-color)",
                html: `
                    <p>${translations.eggsReady}</p>
                    <p><strong>${translations.timer}:</strong> ${timerMinutes.value}:${timerSeconds.value < 10 ? '0' : ''}${timerSeconds.value} </p>
                    <p><strong>${translations.waterState}:</strong> ${selectedWaterState}</p>
                    <p><strong>${translations.eggSizeLabel}:</strong> ${selectedSize}</p>
                    <p><strong>${translations.eggTypeLabel}:</strong> ${selectedType} </p>
                    <p><strong>${translations.timeElapsed}:</strong> <span id="elapsed-time">0:00</span></p>
                `,
                didOpen: () => {
                    // Timer im Dialog starten
                    const elapsedTimer = setInterval(() => {
                        elapsedTime++;
                        const minutes = Math.floor(elapsedTime / 60);
                        const seconds = elapsedTime % 60;
                        document.getElementById('elapsed-time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                    }, 1000);

                    // Timer stoppen, wenn der Dialog geschlossen wird
                    Swal.getPopup().addEventListener('mouseenter', () => {
                        clearInterval(elapsedTimer);
                    });
                    Swal.getPopup().addEventListener('mouseleave', () => {
                        clearInterval(elapsedTimer);
                    });
                },
            }).then(() => {
                // Alarm-Sound stoppen, sobald der Dialog geschlossen wird
                alarm.pause();
                alarm.currentTime = 0; // Sound zurücksetzen
                document.getElementById('timer').textContent = '0:00';
            });
        } else {
            time--;
        }
    }, 1000);
});
