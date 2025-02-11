
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
    
    function handleSubmit(e) {
        e.preventDefault(); // Empêche l'envoi par défaut
        
        // Récupération des champs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const msg = document.querySelector('.msg');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Réinitialisation du message d'erreur
        msg.innerHTML = '';
        let hasError = false;
        
        // Validation du nom (lettres, espaces, accents, tirets et apostrophes)
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
            msg?.classList.add('error');
            msg.innerHTML += '<p class="error">Le champ "Nom" doit contenir uniquement des lettres, des espaces, des accents, des tirets ou des apostrophes</p>';
            hasError = true;
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
        
        // Validation de l'email (format correct)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            msg?.classList.add('error');
            msg.innerHTML += '<p class="error">Le champ "Email" doit contenir une adresse email valide.</p>';
            hasError = true;
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
        
        // Validation du message (non vide)
        if (message === '' || message.length < 100) {
            msg?.classList.add('error');
            msg.innerHTML += `<p class="error">Le champ "Message" doit contenir au minimum 100 caractères. Actuellement : ${message.length} caractères.</p>`;
            hasError = true;
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
        
        // Si pas d'erreur, préparation de l'envoi
        if (!hasError) {
            // Création de l'URL mailto
            const mailtoLink = `mailto:contact.mywebdev@gmail.com?subject=Message%20de%20${encodeURIComponent(name)}&body=${encodeURIComponent(
                `De: ${name} (${email})\n\n${message}`
            )}`;
            
            // Ouvrir le client mail dans une nouvelle fenêtre
            window.open(mailtoLink, '_blank');
            
            // Réinitialisation du formulaire
            form.reset();
            
            // Message de succès
            msg?.classList.add('succes');
            msg.innerHTML = '<p class="success">Votre message a été envoyé avec succès!</p>';
            
            // Effacer le message de succès après 5 secondes
            setTimeout(() => {
                msg.innerHTML = '';
            }, 5000);
        }
    }
    
    // Ajout de l'écouteur d'événement
    form.addEventListener('submit', handleSubmit);
});



  
let currentCardIndex = 0;
let cards = [];

// Initialisation des cartes
document.querySelectorAll('.card-soin').forEach((card, index) => {
    const container = card.closest('a');
    container.setAttribute('href', 'javascript:void(0)');
    
    // Récupérer les informations de la carte
    const image = card.querySelector('img');
    const paragraphs = card.querySelectorAll('.card-soin-content p');
    
    // Créer un objet avec les données de la carte
    const cardData = {
        image: image.src,
        description: Array.from(paragraphs)
            .slice(0, -1)
            .map(p => p.textContent.trim())
            .join('\n\n'),
        price: paragraphs[paragraphs.length - 1].textContent.trim()
    };
    
    // Ajouter les données comme attributs data
    container.dataset.index = index;
    cards.push(cardData);
    
    // Ajouter l'écouteur d'événement
    container.addEventListener('click', (e) => {
        currentCardIndex = parseInt(e.currentTarget.dataset.index);
        openModal();
    });
});

// Fonction pour ouvrir la modale
function openModal() {
    const modal = document.getElementById('soinModal');
    updateModalContent();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fonction pour mettre à jour le contenu de la modale
function updateModalContent() {
    const cardData = cards[currentCardIndex];
    document.getElementById('modalImage').src = cardData.image;
    document.getElementById('modalDescription').innerHTML = cardData.description
        .split('\n\n')
        .map(text => `<p>${text}</p>`)
        .join('');
    document.getElementById('modalPrice').textContent = cardData.price;
}

// Navigation entre les cartes
document.querySelector('.prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    updateModalContent();
});

document.querySelector('.next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    updateModalContent();
});

// Fermeture de la modale
document.querySelector('.close-modal').addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    const modal = document.getElementById('soinModal');
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
    const modal = document.getElementById('soinModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Gestion des touches clavier
document.addEventListener('keydown', (event) => {
    if (document.getElementById('soinModal').style.display === 'block') {
        switch(event.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
                updateModalContent();
                break;
            case 'ArrowRight':
                currentCardIndex = (currentCardIndex + 1) % cards.length;
                updateModalContent();
                break;
        }
    }
});

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Ferme tous les accordéons
        document.querySelectorAll('.accordion').forEach(item => {
            item.classList.remove('active');
        });
        
        // Ouvre l'accordéon cliqué si il n'était pas déjà ouvert
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});
// Sélection du bouton
const scrollToTopButton = document.getElementById("scrollToTop");

// Affiche la flèche après 300px de scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 550) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

// Scroll automatique vers le haut
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

