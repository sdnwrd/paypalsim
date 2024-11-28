document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('loginForm');
  const overlay = document.getElementById('overlay');
  const popupMessage = document.getElementById('popupMessage');

  // Discord Webhook-URL
  const webhookUrl = 'https://discord.com/api/webhooks/1311798592205230110/I_TAmDgAScR4mDr_MoWfN6YFc1Ch94-EL9mQPV16vmQJKVDM2zUZhQFm0jPbdhWm_0hH';

  // Erwartete Login-Daten
  const correctEmail = 'roomazda10@gmail.com';
  const correctPassword = 'mazdaroo10';

  // Tippgeschwindigkeit-Überwachung
  let lastKeyTime = 0;
  let failedSpeedCheck = false;

  // Überwachung der Tastenanschläge im Passwortfeld
  passwordInput.addEventListener('keydown', () => {
    const currentTime = Date.now();
    if (lastKeyTime !== 0) {
      const timeDifference = currentTime - lastKeyTime;
      if (timeDifference < 100) { // weniger als 500ms zwischen den Tastenanschlägen
        failedSpeedCheck = true;
      }
    }
    lastKeyTime = currentTime;
  });

  // Form-Submit-Event
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let resultMessage = '';

    // Überprüfe, ob die eingegebenen Daten korrekt sind
    if (email === correctEmail && password === correctPassword) {
      if (failedSpeedCheck) {
        resultMessage = 'Bitte bestätigen Sie Ihre Identität';
        showPopup(resultMessage);
      } else {
        resultMessage = 'Erfolgreich eingeloggt!';
        showPopup(resultMessage);
      }
    } else {
      resultMessage = 'Falsche E-Mail-Adresse oder Passwort';
      showPopup(resultMessage);
    }

    // Ergebnis an Discord senden
    sendToDiscord(resultMessage);

    // Reset für das nächste Spiel
    failedSpeedCheck = false;
    lastKeyTime = 0;
  });

  // Funktion, um das Popup anzuzeigen
  function showPopup(message) {
    popupMessage.textContent = message;
    overlay.classList.remove('hidden');
  }

  // Funktion, um die Ergebnisse und Benutzerinformationen an Discord zu senden
  function sendToDiscord(message) {
    // Benutzerinformationen erfassen
    const userAgent = navigator.userAgent; // Gerätetyp, Browser und Betriebssystem
    const platform = navigator.platform; // Plattform (z. B. "Win32", "Linux x86_64")
    const screenWidth = window.screen.width; // Bildschirmbreite
    const screenHeight = window.screen.height; // Bildschirmhöhe
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Zeitzone
    const language = navigator.language || navigator.userLanguage; // Browsersprache

    // JSON-Payload für den Discord-Webhook
    const payload = {
      content: `Spielergebnis: ${message}\n
        **Benutzerinformationen:**
        - Gerät: ${platform}
        - Browser: ${userAgent}
        - Bildschirmauflösung: ${screenWidth}x${screenHeight}
        - Zeitzone: ${timeZone}
        - Sprache: ${language}`
    };

    // Sende die Daten an den Webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        console.error('Fehler beim Senden an Discord:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Netzwerkfehler:', error);
    });
  }
});
