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
  





