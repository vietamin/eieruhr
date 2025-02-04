// Standardwerte für Eiergröße und Eigrad
let selectedSize = 'M'; // Standard: Mittel (M)
let selectedType = 'medium'; // Standard: Medium

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
    const time = cookingTimes[selectedSize][selectedType];
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('minutes').value = minutes;
    document.getElementById('seconds').value = seconds;
}

// Timer starten
document.getElementById('start').addEventListener('click', function() {
    const manualMinutes = parseInt(document.getElementById('minutes').value) || 0;
    const manualSeconds = parseInt(document.getElementById('seconds').value) || 0;
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
            timerElement.textContent = 'Zeit abgelaufen!';

            // Alarm-Sound abspielen
            alarm.play();
            
            // Zeit seit Ablaufen des Timers
            let elapsedTime = 0;

            // SweetAlert2-Dialog anzeigen
            Swal.fire({
                icon: 'success',
                title: 'Zeit abgelaufen!',
                html: `
                    <p>Deine Eier sind fertig!</p>
                    <p><strong>Eiergröße:</strong> ${selectedSize}</p>
                    <p><strong>Eigrad:</strong> ${selectedType === 'soft' ? 'Weich' : selectedType === 'medium' ? 'Medium' : 'Hart'}</p>
                    <p><strong>Zeit seit Ablauf:</strong> <span id="elapsed-time">0:00</span></p>
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
            });
        } else {
            time--;
        }
    }, 1000);
});