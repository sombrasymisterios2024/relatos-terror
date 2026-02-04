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
    
    // Al abrir, siempre empezamos en modo claro
    cambiarModoLector('claro');
}

/**
 * Cierra el lector y limpia el iframe
 */
function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // Si estamos en pantalla completa al cerrar, salimos de ella
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
    lector.style.display = 'none';
    iframe.src = ''; 
    
    document.body.style.overflow = 'auto';
}

/**
 * Cambia entre modo claro y oscuro.
 */
function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    const botones = document.querySelectorAll('.btn-modo');
    
    if (modo === 'oscuro') {
        iframe.classList.add('pdf-oscuro');
    } else {
        iframe.classList.remove('pdf-oscuro');
    }

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
 * Activa el modo Pantalla Completa real para el lector.
 * Esto soluciona el zoom en móviles sin abrir pestañas nuevas.
 */
function pantallaCompleta() {
    const lector = document.getElementById('lector-pdf');

    // Si no hay nada en pantalla completa, entramos
    if (!document.fullscreenElement) {
        if (lector.requestFullscreen) {
            lector.requestFullscreen();
        } else if (lector.webkitRequestFullscreen) { /* Safari / iOS */
            lector.webkitRequestFullscreen();
        } else if (lector.msRequestFullscreen) { /* IE11 */
            lector.msRequestFullscreen();
        }
    } else {
        // Si ya estamos en pantalla completa, salimos
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
