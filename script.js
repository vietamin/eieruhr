document.getElementById('start').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Überprüfen, ob die Eingaben gültig sind
    if (minutes < 0 || seconds < 0 || seconds > 59 || (minutes === 0 && seconds === 0)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Bitte gib gültige Werte ein (Minuten ≥ 0, Sekunden zwischen 0 und 59).',
        });
        return;
    }

    // Gesamtzeit in Sekunden berechnen
    let time = minutes * 60 + seconds;
    const timerElement = document.getElementById('timer');
    const alarm = document.getElementById('alarm');

    // Timer starten
    const interval = setInterval(() => {
        const minutesLeft = Math.floor(time / 60);
        const secondsLeft = time % 60;
        timerElement.textContent = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

        document.getElementById('reset').addEventListener('click', function() {
            clearInterval(interval); // Stoppt den Timer
            document.getElementById('minutes').value = '';
            document.getElementById('seconds').value = '';
            document.getElementById('timer').textContent = '';
            alarm.onpause();
            alarm.currentTime = 0;
        });

        if (time <= 0) {
            clearInterval(interval);
            timerElement.textContent = 'Zeit abgelaufen!';
            alarm.play(); // Sound abspielen
            Swal.fire({
                icon: 'success',
                title: 'Zeit abgelaufen!',
                text: 'Deine Eier sind fertig!',
            }).then(() => {
                // Alarm-Sound stoppen, sobald der Dialog geschlossen wird.
                alarm.onpause();
                alarm.currentTime = 0;
            });
        } else {
            time--;
        }
    }, 1000);
});


