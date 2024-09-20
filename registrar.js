$(document).ready(function(){ 

    var token = localStorage.getItem("accessToken");
    if(token != null)
        $(location).prop('href', '/HomePage.html');
  
    document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var usuario = e.target.usuario.value;
    var correo = e.target.email.value;
    var contraseña = e.target.contraseña.value;
    var confirmarContraseña = e.target.confirmar.value;

    var data = {
        "name": usuario,
        "email": correo,
        "password": contraseña,
        "password_confirmation": confirmarContraseña
    }

    jQuery.ajax({  
        url: 'http://localhost:8001/api/v1/user',
        type: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
        data: JSON.stringify(data),
        
        success: function(resultado) {  
            $(location).prop('href', '/login.html');
            
        },
        
        error: function(resultado){
            alert("Credenciales invalidas");
        } 
        
    });  
});
});
