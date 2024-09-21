//------------------------------------CERRAR SESION--------------------------------------------------------------

var token = localStorage.getItem("accessToken");
if (token == null)
    $(location).prop('href', '/login.html');

$("#salir").click(function (e) {
    e.preventDefault();
    jQuery.ajax({
        url: 'http://localhost:8001/api/v1/logout',
        type: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },

        success: function (resultado) {
            localStorage.removeItem("accessToken");
            $(location).prop('href', '/login.html');

        },

        error: function (resultado) {
            alert("Error");
        }

    });
});

//------------------------------------------------HTML PRINCIPAL------------------------------------------------

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
        var postHtml = `<br> <div class="feed" id="post-${post.id}">
            <div class="head">
              <div class="user">
                <div class="profile-photo">
                  <img class="fotoperfil" src="${post.foto_perfil}">
                </div>
                <div class="info">
                  <span class="bold-text">
                    <h3>${post.autor}</h3>
                  </span>
                  <small>${post.fecha_publicacion}</small>
                </div>
              </div>
              <span class="edit">
                <i class="uil uil-ellipsis-h"></i>
              </span>
            </div>
      
            <div class="action-buttons">
              <div class="interaction-buttons">
                <span><i class="uil uil-heart"></i></span>
                <span><i class="uil uil-comment-dots"></i></span>
                <span><i class="uil uil-share-alt"></i></span>
              </div>
              <div class="bookmark">
                <span><i class="uil uil-bookmark-full"></i></span>
              </div>
            </div>
      
            <div class="liked-by">
              <p>Le gusta a <span class="bold-text">${post.cantidadLikes}</span> persona/s
              </p>
            </div>
      
            <div class="caption">
            ${post.imagen ? `<img class="fotofeed" src="${post.imagen}" class="post-image">` : ''}
              <p><span class="bold-text">${post.autor}</span> ${post.contenido}
              </p>
            </div>
      
            <div class="post-actions">
                    <button class="postLikeButton" data-id="${post.id}">❤️ Me gusta </button>
                    <button class="postCommentButton" data-id="${post.id}">💬 Comentar</button>
		            <button class="postDelButton" data-id="${post.id}">🗑️ Eliminar</button>
            </div>

            <div class="comments-section" id="comments-${post.id}" style="display: none;">
                    <div class="comments-list">
                        <!-- Aquí se cargarán los comentarios -->
                    </div>
                    <div class="comment-input-section">
                        <img src="${post.foto_perfil}" class="comment-profile-pic"> <!-- Imagen del perfil que comenta -->
                        <textarea class="comment-input" placeholder="Escribe un comentario..."></textarea>
                        <button class="submit-comment-btn" data-id="${post.id}">Publicar</button>
                    </div>
                </div>

          </div>`;
        $("#feed").prepend(postHtml);
    }

    function renderComment(comment, postId) {
        var commentHtml = `
            <div class="comment" id="comment-${comment.id}" style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${comment.foto_perfil}" class="comment-profile-pic" style="border-radius: 50%; width: 40px; height: 40px; margin-right: 10px;">
                <div class="comment-content" style="background-color: white; border-radius: 20px; padding: 10px; max-width: 80%; word-wrap: break-word;">
                    <strong>${comment.autor}</strong>: ${comment.contenido}
                </div>
                <button class="delete-comment-btn" data-id="${comment.id}" data-post-id="${postId}" style="margin-left: 10px;">Eliminar</button> <!-- Botón de eliminar comentario -->
            </div>
        `;
        $(`#comments-${postId} .comments-list`).append(commentHtml);
    }

    // ----------------------------------CARGAR POST------------------------------------------

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
        var imagen = document.getElementById('archivo_multimedia').files[0];
        if (imagen) {
            formData.append('imagen', imagen);
        }

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
                document.getElementById('contenido').value = '';
            },
            error: function () {
                alert("Error al crear el post.");
            }
        });
    });

    //--------------------------------ELIMINAR POST--------------------------------------

    $(document).on("click", ".postDelButton", function () {
        var postId = $(this).data("id");
        $.ajax({
            url: 'http://localhost:8000/api/post/' + postId,
            type: 'delete',
            success: function () {
                $(`#post-${postId}`).remove();
            },
            error: function () {
                alert("Error al eliminar el post.");
            }
        });
    });

    //----------------------------------ME GUSTA-----------------------------------

    $(document).on("click", ".postLikeButton", function () {
        var x = new Boolean(false);
        if (x == false) {
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
                    alert("Le haz dado ❤️Me gusta a esta publicación.");
                },
                error: function () {
                    alert("Error al dar Me gusta.");
                }
            });
        } else { }


    });

    $(document).on("click", ".postCommentButton", function () {
        var postId = $(this).data("id");
        $(`#comments-${postId}`).toggle();
    });

    // ----------------------------------CREAR COMENTARIO-----------------------------------

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
                renderComment(data, postId);
                $(`#post-${postId} .comment-input`).val('');
            },
            error: function () {
                alert("Error al crear el comentario.");
            }
        });
    });

    //--------------------------------ELIMINAR COMENTARIO--------------------------------------

    $(document).on("click", ".delete-comment-btn", function () {
        var commentId = $(this).data("id");
        var postId = $(this).data("post-id");
        $.ajax({
            url: 'http://localhost:8000/api/comentario/' + commentId,
            type: 'delete',
            success: function () {
                $(`#comment-${commentId}`).remove();
            },
            error: function () {
                alert("Error al eliminar el comentario.");
            }
        });
    });

    cargarPosts();
});
