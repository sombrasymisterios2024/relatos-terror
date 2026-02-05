// --- PROTECCIÓN DE CONTENIDO ---
// Desactiva el menú contextual (clic derecho)
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    // Bloquea F12, Ctrl+U, Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+A (seleccionar todo) y Ctrl+I (inspeccionar)
    if(e.keyCode == 123 || 
      (e.ctrlKey && [85, 67, 80, 83, 65, 73].includes(e.keyCode))) {
        alert("Contenido protegido.");
        return false;
    }
};

// Evita que arrastren elementos (imágenes o textos) fuera de la web
window.addEventListener('dragstart', function(e) {
    e.preventDefault();
}, false);

// --- FUNCIONES DEL LECTOR PDF ---

function abrirLector(nombreArchivo) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    const toggle = document.getElementById('modo-toggle');
    
    // Configuración del repositorio
    const usuario = "sombrasymisterios2024"; 
    const repositorio = "relatos-terror";
    const urlArchivo = `https://${usuario}.github.io/${repositorio}/pdfs/${nombreArchivo}`;
    
    /**
     * PARÁMETROS DEL VISOR:
     * #toolbar=0       -> Oculta la barra de herramientas gris original.
     * &navpanes=0      -> Oculta el panel lateral de miniaturas.
     * &pagemode=none   -> Asegura que no se abran paneles de navegación.
     * &view=FitH       -> "Fit Horizontal": Ajusta el PDF al ancho de la pantalla. 
     * Esto hace que la letra se vea más grande en celulares.
     */
    const visorPDF = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(urlArchivo)}#toolbar=0&navpanes=0&pagemode=none&view=FitH`;
    
    // Cargar URL y mostrar modal
    iframe.src = visorPDF;
    lector.style.display = 'block';
    
    // Bloquear el scroll de la página principal
    document.body.classList.add('lector-abierto');

    // Reiniciar el interruptor de modo oscuro al abrir un nuevo libro
    if(toggle) toggle.checked = false;
    iframe.style.filter = "none";
}

function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // Ocultar modal y limpiar el iframe para liberar memoria
    lector.style.display = 'none';
    iframe.src = ''; 
    
    // Devolver el scroll a la página principal
    document.body.classList.remove('lector-abierto');
}

/**
 * FUNCIÓN PARA EL MODO OSCURO (SWITCH)
 * Aplica un filtro CSS al iframe para invertir los colores del PDF
 * sin afectar la interfaz del lector.
 */
function toggleModo() {
    const iframe = document.getElementById('frame-pdf');
    const toggle = document.getElementById('modo-toggle');
    
    if (toggle && toggle.checked) {
        // MODO OSCURO: Invierte colores, ajusta matiz y brillo para que sea cómodo
        iframe.style.filter = "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)";
    } else {
        // MODO CLARO: Estado original
        iframe.style.filter = "none";
    }
}
