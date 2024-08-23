function ajustarAlturaTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function () {
    var textarea = document.getElementById('postear');
    textarea.addEventListener('input', function () {
        ajustarAlturaTextarea(textarea);
    });
    ajustarAlturaTextarea(textarea);
});