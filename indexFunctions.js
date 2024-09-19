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

$(document).ready(function () {
    function renderPost(post) {
        var postHtml = `
            <div class="post" id="post-${post.id}">
                <div class="post-header">
                    <img src="${post.foto_perfil}" class="profile-pic">
                    <h4>${post.autor}</h4>
                    <small>${post.fecha_publicacion}</small>
                </div>
                <div class="post-body">
                    <p>${post.contenido}</p>
                    ${post.imagen ? `<img src="${post.imagen}" class="post-image">` : ''}
                </div>
                <div class="post-actions">
                    <button class="like-btn" data-id="${post.id}">Me gusta (${post.likes})</button>
                    <button class="comment-btn" data-id="${post.id}">Comentar</button>
                    <button class="delete-btn" data-id="${post.id}">Eliminar</button>
                </div>
                <div class="comments-section" id="comments-${post.id}" style="display: none;">
                    <h5>Comentarios</h5>
                    <div class="comments"></div>
                    <textarea class="comment-input" placeholder="Escribe un comentario..."></textarea>
                    <button class="submit-comment-btn" data-id="${post.id}">Publicar comentario</button>
                </div>
            </div>`;
        $("#feed").prepend(postHtml);
    }

    // ----------------------------------------------------------------------------

    function cargarPosts() {
        $.ajax({
            url: 'http://localhost:8000/api/post',
            type: 'get',
            success: function (data) {
                $("#feed").empty();
                data.forEach(function (post) {
                    renderPost(post);
                });
            },
            error: function () {
                alert("Error al cargar los posts.");
            }
        });
    }

    // ---------------------------CREAR POST----------------------------

    $("#botonCrear").click(function () {
        var formData = new FormData();
        formData.append('usuario_id', 1);
        formData.append('contenido', document.getElementById('contenido').value);
        // var imagen = document.getElementById('archivo_multimedia').files[0];
        //if (imagen) {
        //     formData.append('imagen', imagen);
        // }

        $.ajax({
            url: 'http://localhost:8000/api/post',
            type: 'post',
            headers: {
                "Accept": "application/json",
            },
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                renderPost(data);
                alert("Post creado exitosamente.");
            },
            error: function () {
                alert("Error al crear el post.");
            }
        });
    });

    //--------------------------------ELIMINAR--------------------------------------

    $(document).on("click", ".delete-btn", function () {
        var postId = $(this).data("id");
        $.ajax({
            url: 'http://localhost:8000/api/post/' + postId,
            type: 'delete',
            success: function () {
                $(`#post-${postId}`).remove();
                alert("Post eliminado.");
            },
            error: function () {
                alert("Error al eliminar el post.");
            }
        });
    });

    //----------------------------------ME GUSTA-----------------------------------

    $(document).on("click", ".like-btn", function () {
        var postId = $(this).data("id");

        var formData = new FormData();
        formData.append('usuario_id', 1);
        formData.append('post_id', postId);

        $.ajax({
            url: 'http://localhost:8000/api/megustapost',
            type: 'post',
            headers: {
                "Accept": "application/json",
            },
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                alert("Me gusta creado exitosamente.");
            },
            error: function () {
                alert("Error al dar Me gusta.");
            }
        });
    });

    // ---------------------------------------------------------------------------

    $(document).on("click", ".comment-btn", function () {
        var postId = $(this).data("id");
        $(`#comments-${postId}`).toggle();  // Mostrar u ocultar la sección de comentarios
    });

    $(document).on("click", ".submit-comment-btn", function () {
        var postId = $(this).data("id");
        var commentContent = $(`#post-${postId} .comment-input`).val();

        var formData = new FormData();
        formData.append('usuario_id', 1);
        formData.append('contenido', commentContent);
        formData.append('post_id', postId);

        $.ajax({
            url: 'http://localhost:8000/api/comentario',
            type: 'post',
            headers: {
                "Accept": "application/json",
            },
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                alert("Comentario creado exitosamente.");
            },
            error: function () {
                alert("Error al crear el comentario.");
            }
        });
    });

    cargarPosts();
});
