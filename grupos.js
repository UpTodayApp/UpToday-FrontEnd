$(document).ready(function () {


    function renderGrupo(grupo){

        var grupos = 
        `
        <p> Nombre: ${grupo.nombre}</p>
        <p> Descripcion: ${grupo.descripcion}</p>
        <br>
        `;

        $("#feed").prepend(grupos);

    }

    document.getElementById("grupoForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var nombre = e.target.nombre.value;
        var descripcion = e.target.descripcion.value;

        var data = {
            "nombre": nombre,
            "descripcion": descripcion,
        }

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
                    cargarGrupos();
                    document.getElementById('nombre').value = '';
                    document.getElementById('descripcion').value = '';
    
                },
    
                error: function (resultado) {
                    alert("Error al crear el grupo");
    
                }
    
            });

  

    });

    function cargarGrupos() {
        $.ajax({
            url: 'http://localhost:8002/api/grupo',
            type: 'get',
            success: function (data) {
                $("#feed").empty();
                data.forEach(function (grupo) {
                    renderGrupo(grupo);
                });
            },
            error: function () {
                alert("Error al cargar los grupos.");
            }
        });
    }

    cargarGrupos();
});