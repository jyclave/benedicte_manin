
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 3000; // Intervalle en millisecondes (ici 3 secondes)

// Fonction pour passer au slide suivant
function nextSlide() {
    // Retirer l'attribut data-active du slide actuel
    slides[currentSlide].removeAttribute('data-active');
    
    // Passer au slide suivant
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Ajouter l'attribut data-active au nouveau slide
    slides[currentSlide].setAttribute('data-active', '');
}

// Fonction pour démarrer le slideshow
function startSlideshow() {
    setInterval(nextSlide, slideInterval);
}

// Fonction pour initialiser le carousel
function initCarousel() {
    // S'assurer que le premier slide est actif au chargement
    slides[0].setAttribute('data-active', '');
    
    // Démarrer le slideshow automatique
    startSlideshow();
}

// Démarrer le carousel quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initCarousel);




document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-contact');
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Empêche l'envoi par défaut
  
      // Récupération des champs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
  
      let errors = [];
  
      // Validation du nom (lettres, espaces, accents, tirets et apostrophes)
      if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
        errors.push(
          'Le champ "Nom" doit contenir uniquement des lettres, des espaces, des accents, des tirets ou des apostrophes.'
        );
      }
  
      // Validation de l'email (format correct)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Le champ "Email" doit contenir une adresse email valide.');
      }
  
      // Validation du message (non vide)
      if (message === '') {
        errors.push('Le champ "Message" ne peut pas être vide.');
      }
  
      // Affichage des erreurs ou préparation de l'envoi
      if (errors.length > 0) {
        alert(errors.join('\n')); // Affiche les erreurs sous forme d'alerte
      } else {
        // Création de l'URL mailto
        const mailtoLink = `mailto:contact.mywebdev@gmail.com?subject=Message%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(
          `De: ${name} (${email})\n\n${message}`
        )}`;
  
        // Redirection vers mailto
        window.location.href = mailtoLink;
  
        // Réinitialisation du formulaire
        form.reset();
      }
    });
  });
  





