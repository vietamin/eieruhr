const installer = require('electron-installer-redhat');

async function build() {
  try {
    await installer({
      src: './dist/EierUhr-linux-x64', // Pfad zur gepackten App
      dest: './dist/installer/',       // Ausgabeverzeichnis für das RPM-Paket
      arch: 'x86_64',                  // Architektur (64-Bit)
    });
    console.log('RPM-Paket erfolgreich erstellt!');
  } catch (e) {
    console.error(`Fehler beim Erstellen des RPM-Pakets: ${e.message}`);
  }
}

build();
