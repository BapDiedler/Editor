// Charger le texte depuis le Local Storage au chargement de la page
window.onload = function() {
    const savedText = localStorage.getItem('editorContent');
    if (savedText) {
        document.getElementById('editor').value = savedText;
    }
};

// Sauvegarder le texte dans le Local Storage
document.getElementById('saveButton').addEventListener('click', function() {
    const textContent = document.getElementById('editor').value;
    localStorage.setItem('editorContent', textContent);
    alert("Texte sauvegardé en local !");
});

// Télécharger le texte en tant que fichier avec le nom et l'extension choisis
document.getElementById('downloadButton').addEventListener('click', function() {
    const textContent = document.getElementById('editor').value;
    const filename = prompt("Entrez le nom du fichier avec son extension (par exemple, notes.txt)", "texte_sauvegardé.txt");
    
    if (filename) {
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
});

// Ouvrir un fichier texte et charger son contenu dans l'éditeur
document.getElementById('openFileButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// Lire le fichier sélectionné et afficher le contenu dans l'éditeur
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('editor').value = e.target.result;
        };
        reader.readAsText(file);
    }
});
