// Bloqueo de clic derecho
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloqueo de atajos de teclado
document.onkeydown = function(e) {
    // F12, Ctrl+U (Ver código), Ctrl+C (Copiar), Ctrl+P (Imprimir), Ctrl+S (Guardar)
    if(e.keyCode == 123 || 
      (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67 || e.keyCode == 80 || e.keyCode == 83))) {
        alert("Contenido protegido por derechos de autor.");
        return false;
    }
};
