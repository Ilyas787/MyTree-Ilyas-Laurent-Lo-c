document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher la soumission réelle du formulaire

        const formData = new FormData(form);
        let formString = "";
        for (const [key, value] of formData.entries()) {
            formString += `${key}: ${value}\n`; // Ajouter chaque clé-valeur à la chaîne
        }

        console.log("Données du formulaire sous forme de string:");
        console.log(formString);
        // Vous pouvez maintenant utiliser `formString` comme nécessaire
    });
});
