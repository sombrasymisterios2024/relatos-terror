JavaScript
// --- PROTECCIÓN DE CONTENIDO ---
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    // Bloquea F12, Ctrl+U, Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+A (seleccionar todo)
    if(e.keyCode == 123 || 
      (e.ctrlKey && [85, 67, 80, 83, 65].includes(e.keyCode))) {
        alert("Contenido protegido.");
        return false;
    }
};

function abrirLector(nombreArchivo) {
    const lector = document.getElementById('lector-pdf');
    const iframe = document.getElementById('frame-pdf');
    
    const usuario = "sombrasymisterios2024"; 
    const repositorio = "relatos-terror";
    const urlArchivo = `https://${usuario}.github.io/${repositorio}/pdfs/${nombreArchivo}`;
    
    // #toolbar=0 oculta la barra superior donde están los botones de descarga e impresión
    const visorPDF = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(urlArchivo)}#toolbar=0`;
    
    iframe.src = visorPDF;
    lector.style.display = 'block';
    document.body.style.overflow = 'hidden';
    cambiarModoLector('claro');
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
    
    if (modo === 'oscuro') {
        iframe.style.filter = "invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2)";
    } else {
        iframe.style.filter = "none";
    }

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
