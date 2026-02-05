// --- PROTECCIÓN DE CONTENIDO ---
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    // Bloquea F12, Ctrl+U, Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+A y Ctrl+I
    if(e.keyCode == 123 || 
      (e.ctrlKey && [85, 67, 80, 83, 65, 73].includes(e.keyCode))) {
        alert("Contenido protegido.");
        return false;
    }
};

window.addEventListener('dragstart', function(e) {
    e.preventDefault();
}, false);

// --- FUNCIONES DEL LECTOR PDF ---

function abrirLector(nombreArchivo) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    const toggle = document.getElementById('modo-toggle');
    
    const usuario = "sombrasymisterios2024"; 
    const repositorio = "relatos-terror";
    const urlArchivo = `https://${usuario}.github.io/${repositorio}/pdfs/${nombreArchivo}`;
    
    // view=FitH es vital para que la letra se adapte al ancho del celular
    const visorPDF = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(urlArchivo)}#toolbar=0&navpanes=0&pagemode=none&view=FitH`;
    
    iframe.src = visorPDF;
    
    /**
     * CAMBIO CLAVE: Usamos 'flex' en lugar de 'block'.
     * Esto activa la estructura CSS que separa la barra del contenido.
     */
    lector.style.display = 'flex'; 
    
    document.body.classList.add('lector-abierto');

    // Reiniciar el switch y el filtro al abrir
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

/**
 * FUNCIÓN PARA EL MODO OSCURO (SWITCH)
 */
function toggleModo() {
    const iframe = document.getElementById('frame-pdf');
    const toggle = document.getElementById('modo-toggle');
    
    if (toggle && toggle.checked) {
        // MODO OSCURO: Inversión inteligente de colores
        iframe.style.filter = "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)";
    } else {
        iframe.style.filter = "none";
    }
}
