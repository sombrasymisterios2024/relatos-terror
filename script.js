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
    
    // Bloqueamos el scroll de la página principal para que no se mueva al leer
    document.body.style.overflow = 'hidden';
    
    // Al abrir, siempre empezamos en modo claro para que los botones coincidan
    cambiarModoLector('claro');
}

/**
 * Cierra el lector y limpia el iframe para liberar memoria
 */
function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    lector.style.display = 'none';
    iframe.src = ''; 
    
    // Restauramos el scroll de la página
    document.body.style.overflow = 'auto';
}

/**
 * Cambia entre modo claro y oscuro. Gestiona el filtro del iframe 
 * y la iluminación de los botones.
 */
function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    const botones = document.querySelectorAll('.btn-modo');
    
    // 1. Aplicar o quitar el filtro visual al iframe
    if (modo === 'oscuro') {
        iframe.classList.add('pdf-oscuro');
    } else {
        iframe.classList.remove('pdf-oscuro');
    }

    // 2. Marcar visualmente qué modo está activo
    botones.forEach(btn => {
        btn.classList.remove('active');
        const textoBoton = btn.innerText.toUpperCase();
        
        if (modo === 'oscuro' && textoBoton.includes('OSCURO')) {
            btn.classList.add('active');
        } else if (modo === 'claro' && textoBoton.includes('CLARO')) {
            btn.classList.add('active');
        }
    });
}

/**
 * Abre el PDF en una pestaña nueva.
 * Solución definitiva para el zoom en dispositivos móviles.
 */
function pantallaCompleta() {
    const iframe = document.getElementById('frame-pdf');
    if (iframe.src) {
        // Cambiamos '/preview' por '/view' para forzar el modo de visualización nativo
        let urlDirecta = iframe.src.replace('/preview', '/view');
        window.open(urlDirecta, '_blank');
    }
}
