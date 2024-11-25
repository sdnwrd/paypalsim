document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const overlay = document.getElementById('overlay');
    const popupMessage = document.getElementById('popupMessage');
  
    // Erwartete Login-Daten
    const correctEmail = 'maxmustermann123@gmail.com';
    const correctPassword = 'musterPasswort123!';
  
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
  
      // Überprüfe, ob die eingegebenen Daten korrekt sind
      if (email === correctEmail && password === correctPassword) {
        if (failedSpeedCheck) {
          showPopup('Bitte bestätigen Sie Ihre Identität');
        } else {
          showPopup('Erfolgreich eingeloggt!');
        }
      } else {
        showPopup('Falsche E-Mail-Adresse oder Passwort');
      }
  
      // Reset für das nächste Spiel
      failedSpeedCheck = false;
      lastKeyTime = 0;
    });
  
    // Funktion, um das Popup anzuzeigen
    function showPopup(message) {
      popupMessage.textContent = message;
      overlay.classList.remove('hidden');
    }
  });
  