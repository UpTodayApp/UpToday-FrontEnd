document.getElementById("iniciar").addEventListener("click", function() {

    var usuario = document.getElementById('usuario').value;
    var contraseña = document.getElementById('contraseña').value;

    var data = {
        "username": usuario,
        "password": contraseña,
        "grant_type" : "password",
        "client_id" : 1, //esto se cambia dependiendo de el que se genere al levantar la api de oauth
        "client_secret" : "1rCkli5GnDc4L6ZXhv774PTmDtDIC0BOqOKGNmTh" //esto se cambia dependiendo de el que se genere al levantar la api de oauth
    }

    jQuery.ajax({  
        url: 'http://localhost:8000/oauth/token',  
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
});

