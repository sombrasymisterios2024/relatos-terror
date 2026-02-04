// --- PROTECCIÓN DE CONTENIDO ---
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && [85, 67, 80, 83].includes(e.keyCode))) {
        alert("Contenido protegido.");
        return false;
    }
};

// --- FUNCIONES DEL LECTOR PDF ---

function abrirLector(url) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    // Extraemos el ID para usar una URL limpia que Google Docs Viewer acepte mejor
    const fileId = url.match(/\/d\/(.+?)\//) ? url.match(/\/d\/(.+?)\//)[1] : null;
    
    if (fileId) {
        // Usamos una URL de origen 'gview' que es más amigable con el zoom de móviles
        const urlFinal = `https://docs.google.com/gview?embedded=true&url=https://drive.google.com/uc?id=${fileId}`;
        iframe.src = urlFinal;
    } else {
        iframe.src = url;
    }

    lector.style.display = 'block';
    document.body.style.overflow = 'hidden';
    cambiarModoLector('claro');

    // SOLUCIÓN AL CUADRO EN BLANCO: 
    // Si en 3 segundos no carga, refrescamos el src una vez (truco clásico de Google Viewer)
    setTimeout(() => {
        if (iframe.src.includes('gview') && !iframe.contentWindow.length) {
            iframe.src = iframe.src; 
        }
    }, 3000);
}

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

function cambiarModoLector(modo) {
    const iframe = document.getElementById('frame-pdf');
    const botones = document.querySelectorAll('.btn-modo');
    
    if (modo === 'oscuro') iframe.classList.add('pdf-oscuro');
    else iframe.classList.remove('pdf-oscuro');

    botones.forEach(btn => {
        btn.classList.remove('active');
        if ((modo === 'oscuro' && btn.innerText.includes('OSCURO')) || 
            (modo === 'claro' && btn.innerText.includes('CLARO'))) {
            btn.classList.add('active');
        }
    });
}

function pantallaCompleta() {
    const lector = document.getElementById('lector-pdf');
    const isFull = document.fullscreenElement || document.webkitFullscreenElement;

    if (!isFull) {
        if (lector.requestFullscreen) lector.requestFullscreen();
        else if (lector.webkitRequestFullscreen) lector.webkitRequestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}
