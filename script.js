// --- PROTECCIÓN DE CONTENIDO ---

// Bloqueo de clic derecho
document.addEventListener('contextmenu', event => event.preventDefault());

// Bloqueo de atajos de teclado (F12, Ctrl+U, Ctrl+C, Ctrl+P, Ctrl+S)
document.onkeydown = function(e) {
    if(e.keyCode == 123 || 
      (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67 || e.keyCode == 80 || e.keyCode == 83))) {
        alert("Contenido protegido por derechos de autor.");
        return false;
    }
};

// --- FUNCIONES DEL LECTOR PDF ---

/**
 * Abre el lector modal y carga la URL del PDF
 */
function abrirLector(url) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    iframe.src = url;
    lector.style.display = 'block';
    
    // Bloqueamos el scroll de la página principal
    document.body.style.overflow = 'hidden';
    
    // Reiniciamos al modo claro por defecto al abrir
    cambiarModoLector('claro');
}

/**
 * Cierra el lector y limpia el iframe
 */
function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    lector.style.display = 'none';
    iframe.src = ''; // Limpiamos la URL para ahorrar recursos
    
    // Devolvemos el scroll a la página
    document.body.style.overflow = 'auto';
}

/**
 * Cambia entre modo claro y oscuro aplicando filtros al iframe
 */
function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    if (modo === 'oscuro') {
        iframe.classList.add('pdf-oscuro');
    } else {
        iframe.classList.remove('pdf-oscuro');
    }
}
