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
    
    // Al abrir, forzamos el modo claro para resetear la interfaz
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
 * y actualizando el estado visual de los botones.
 */
function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    const botones = document.querySelectorAll('.btn-modo');
    
    // 1. Aplicar o quitar el filtro de inversión al iframe
    if (modo === 'oscuro') {
        iframe.classList.add('pdf-oscuro');
    } else {
        iframe.classList.remove('pdf-oscuro');
    }

    // 2. Gestionar el marcador visual (.active) en los botones
    botones.forEach(btn => {
        // Quitamos la clase 'active' de todos los botones primero
        btn.classList.remove('active');
        
        // Verificamos cuál botón activar basándonos en el texto que contiene
        const textoBoton = btn.innerText.toUpperCase();
        
        if (modo === 'oscuro' && textoBoton.includes('OSCURO')) {
            btn.classList.add('active');
        } else if (modo === 'claro' && textoBoton.includes('CLARO')) {
            btn.classList.add('active');
        }
    });
}
