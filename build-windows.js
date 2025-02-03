const electronInstaller = require('electron-winstaller');

async function build() {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: './dist/EierUhr-win32-x64', // Pfad zur gepackten App
      outputDirectory: './dist/installer',      // Ausgabeverzeichnis für den Installer
      authors: 'Dein Name',
      exe: 'EierUhr.exe',                       // Name der .exe-Datei
      noMsi: true,                              // Kein MSI-Installer
    });
    console.log('Windows Installer erstellt!');
  } catch (e) {
    console.error(`Fehler beim Erstellen des Installers: ${e.message}`);
  }
}

build();
