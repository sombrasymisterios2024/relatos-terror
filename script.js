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

/**
 * Abre el lector modal extrayendo el ID de Drive para evitar el error "No preview available"
 */
function abrirLector(url) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // 1. Extraer el ID del archivo de la URL de Google Drive
    // Funciona con formatos /d/ID/view o id=ID
    const match = url.match(/\/d\/(.+?)\//) || url.match(/id=(.+?)(&|$)/);
    const fileId = match ? match[1] : null;

    if (fileId) {
        // 2. Creamos un enlace de descarga directa que el visor acepta sin errores
        const urlDirecta = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        // 3. Lo cargamos a través del visor de Google Docs
        iframe.src = `https://docs.google.com/viewer?url=${encodeURIComponent(urlDirecta)}&embedded=true`;
    } else {
        // Fallback en caso de que la URL no sea de Drive
        iframe.src = url;
    }
    
    lector.style.display = 'block';
    document.body.style.overflow = 'hidden';
    cambiarModoLector('claro');
}

/**
 * Cierra el lector y limpia estados
 */
function cerrarLector() {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
    
    lector.style.display = 'none';
    iframe.src = ''; 
    document.body.style.overflow = 'auto';
}

/**
 * Gestión de Modo Claro y Oscuro
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
        if ((modo === 'oscuro' && textoBoton.includes('OSCURO')) || 
            (modo === 'claro' && textoBoton.includes('CLARO'))) {
            btn.classList.add('active');
        }
    });
}

/**
 * Pantalla Completa Real
 */
function pantallaCompleta() {
    const lector = document.getElementById('lector-pdf');
    const isFull = document.fullscreenElement || 
                   document.webkitFullscreenElement || 
                   document.mozFullScreenElement || 
                   document.msFullscreenElement;

    if (!isFull) {
        if (lector.requestFullscreen) lector.requestFullscreen();
        else if (lector.webkitRequestFullscreen) lector.webkitRequestFullscreen();
        else if (lector.mozRequestFullScreen) lector.mozRequestFullScreen();
        else if (lector.msRequestFullscreen) lector.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
}
