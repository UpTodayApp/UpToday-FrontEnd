



document.getElementById("iniciar").addEventListener("click", function() {

    var nombreDeUsuario = document.getElementById('usuario').value;
    var correo = document.getElementById('email').value;
    var fechaNacimiento = document.getElementById('fecha').value;
    var contraseña = document.getElementById('contraseña').value;
    var confirmarContraseña = document.getElementById('confirmar').value;


    var data = {
        "name": usuario,
        "email": correo,
        "password": contraseña,
        "password_confirmation": confirmarContraseña
    }

    jQuery.ajax({  
        url: 'http://localhost:8000//api/v1/user',
        type: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
        data: JSON.stringify(data),
        
        success: function(resultado) {  
            localStorage.setItem("accessToken", resultado.access_token);
            $(location).prop('href', '/login.html');
            
        },
        
        error: function(resultado){
            alert("Credenciales invalidas");
        } 
        
    });  

});
