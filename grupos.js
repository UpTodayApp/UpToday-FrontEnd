$(document).ready(function () {

    document.getElementById("grupoForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var nombre = e.target.nombre.value;
        var descripcion = e.target.descripcion.value;

        var data = {
            "nombre": nombre,
            "descripcion": descripcion,
        }
        
        console.log(nombre);
        console.log(descripcion);
        console.log("HolaMundo");

            jQuery.ajax({
                url: 'http://localhost:8002/api/grupo',
                type: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data),
    
                success: function (resultado) {
                    console.log(resultado);
                    alert("Grupo creado");
    
                },
    
                error: function (resultado) {
                    alert("Error al crear el grupo");
    
                }
    
            });

    });
});