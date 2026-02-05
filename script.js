// --- PROTECCIÓN DE CONTENIDO ---
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    // Bloquea F12, Ctrl+U, Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+A (seleccionar todo)
    if(e.keyCode == 123 || 
      (e.ctrlKey && [85, 67, 80, 83, 65, 73].includes(e.keyCode))) {
        alert("Contenido protegido.");
        return false;
    }
};

// --- FUNCIONES DEL LECTOR PDF ---

function abrirLector(nombreArchivo) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    const toggle = document.getElementById('modo-toggle');
    
    const usuario = "sombrasymisterios2024"; 
    const repositorio = "relatos-terror";
    const urlArchivo = `https://${usuario}.github.io/${repositorio}/pdfs/${nombreArchivo}`;
    
    // Forzamos al visor a entrar en modo "presentación" o sin herramientas
    // Usamos pagemode=none y toolbar=0
    const visorPDF = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(urlArchivo)}#toolbar=0&navpanes=0&pagemode=none&view=FitH`;
    
    iframe.src = visorPDF;
    lector.style.display = 'block';
    
    // Añadimos la clase al body para bloquear el scroll de fondo (definida en el CSS nuevo)
    document.body.classList.add('lector-abierto');

    // Reiniciar el switch a "Claro"
    if(toggle) toggle.checked = false;
    iframe.style.filter = "none";
}

function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    lector.style.display = 'none';
    iframe.src = ''; 
    document.body.classList.remove('lector-abierto');
}

// NUEVA FUNCIÓN PARA EL SWITCH (TOGGLE)
function toggleModo() {
    const iframe = document.getElementById('frame-pdf');
    const toggle = document.getElementById('modo-toggle');
    
    if (toggle.checked) {
        // MODO OSCURO (Inversión de colores)
        iframe.style.filter = "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)";
    } else {
        // MODO CLARO (Original)
        iframe.style.filter = "none";
    }
}

// Bloqueo adicional para evitar arrastrar imágenes o texto dentro del lector
window.addEventListener('dragstart', function(e) {
    e.preventDefault();
}, false);
