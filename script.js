// --- PROTECCIÓN DE CONTENIDO ---
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if(e.keyCode == 123 || 
      (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67 || e.keyCode == 80 || e.keyCode == 83))) {
        alert("Contenido protegido por derechos de autor.");
        return false;
    }
};

// --- FUNCIONES DEL LECTOR PDF ---

function abrirLector(url) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    iframe.src = url;
    lector.style.display = 'block';
    document.body.style.overflow = 'hidden';
    cambiarModoLector('claro');
}

function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // Salir de pantalla completa si está activa al cerrar
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
    
    lector.style.display = 'none';
    iframe.src = ''; 
    document.body.style.overflow = 'auto';
}

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
 * PANTALLA COMPLETA REAL
 * Esta función NO abre pestañas. Solo expande el div actual.
 */
function pantallaCompleta() {
    const lector = document.getElementById('lector-pdf');

    // Detectar si ya estamos en pantalla completa en cualquier navegador
    const enPantallaCompleta = document.fullscreenElement || 
                               document.webkitFullscreenElement || 
                               document.mozFullScreenElement || 
                               document.msFullscreenElement;

    if (!enPantallaCompleta) {
        // ENTRAR (Soporte para Chrome, Safari, Firefox, Edge)
        if (lector.requestFullscreen) {
            lector.requestFullscreen();
        } else if (lector.webkitRequestFullscreen) {
            lector.webkitRequestFullscreen();
        } else if (lector.mozRequestFullScreen) {
            lector.mozRequestFullScreen();
        } else if (lector.msRequestFullscreen) {
            lector.msRequestFullscreen();
        }
    } else {
        // SALIR
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
