document.querySelector('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // If the registration is successful, redirect the user to another page
      window.location.href = 'file:///Users/macbookair/Documents/2e_année_telecom/Application_mobile/projet/Backend/MyTree-Ilyas_Laurent_Loic/code/page_laurent/page_laurent.html';

      form.reset();
      alert('Inscription réussie!');
      
    } else {
      // If there was an error during registration, display an error message
      const errorMessage = await response.text();
      alert('Erreur: ' + errorMessage);
    }
  } catch (error) {
    // If there was an error while making the request, display an error message
    alert('Erreur: ' + error.message);
  }
});
