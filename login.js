$(document).ready(function(){ 

    var token = localStorage.getItem("accessToken");
    if(token != null)
        $(location).prop('href', '/HomePage.html');

    document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var contrasena = e.target.contrasena.value;
    var correo = e.target.email.value;

    var data = {
        "username": correo,
        "password": contrasena,
        "grant_type" : "password",
        "client_id" : 1, 
        "client_secret" : "1rCkli5GnDc4L6ZXhv774PTmDtDIC0BOqOKGNmTh"
    }

    jQuery.ajax({  
        url: 'http://localhost:8001/oauth/token',  
        type: 'POST',
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
        data: JSON.stringify(data),
        
        success: function(resultado) { 
            localStorage.setItem("accessToken", resultado.access_token);
            $(location).prop('href', '/HomePage.html');
            
            
        },
        
        error: function(resultado){
            alert("Credenciales invalidas");
        } 
        
    });

})
});
