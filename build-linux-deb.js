const installer = require('electron-installer-debian');

async function build() {
  try {
    await installer({
      src: './dist/EierUhr-linux-x64', // Pfad zur gepackten App
      dest: './dist/installer/',       // Ausgabeverzeichnis für das DEB-Paket
      arch: 'amd64',                   // Architektur (64-Bit)
    });
    console.log('DEB-Paket erstellt!');
  } catch (e) {
    console.error(`Fehler beim Erstellen des DEB-Pakets: ${e.message}`);
  }
}

build();
