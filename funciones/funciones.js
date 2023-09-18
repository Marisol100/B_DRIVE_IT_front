$(document).ready(function() {
	llenarTabla();
});

//Listar
function llenarTabla() {
	$.ajax({
		method:'get',
		url:'http://localhost/UserWs/listar',
		contentType:'application/json; charset=UTF-8',
		dataType:'json',
		success:function(respuesta) { //Tecibimos la respusta del servidor, response
			console.log(respuesta);

			var cuerpoTabla;

			for(var i=0; i<respuesta.length; i++) {
				cuerpoTabla += '<tr>' +
									'<td>'+respuesta[i].user_id+'</td>'+								
									'<td>'+respuesta[i].username+'</td>'+												
									'<td>'+respuesta[i].password+'</td>'+
									'<td>'+respuesta[i].first_name+'</td>'+
									'<td>'+respuesta[i].middle_name+'</td>'+
									'<td>'+respuesta[i].last_name+'</td>'+
									'<td>'+respuesta[i].email+'</td>'+
									'<td><a class="btn-warning" data="'+respuesta[i].id+'"><i class="fa fa-fw fa-sync"></i></a></td>'+
									'<td><a class="btn-danger" data="'+respuesta[i].id+'"><i class="fa fa-fw fa-trash"></i></a></td>'+
								'</tr>' 
			}
			//Mostrar en el cuerpo de la tabla
			$('#datosUsuario').html(cuerpoTabla);

			$(document).ready(function() {
                $("#inputBuscar").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#datosUsuario tr").filter(function() {
                        $(this).toggle($(this).text()
                        .toLowerCase().indexOf(value) > -1)
                    });
                });
            });
		},
		error:function(respuesta) {
			console.log("Error al listar");
		}

	})
};

$('#btnMostrarModal').click(function() {
	$('#modal-primary').modal('show');
});

$('#btnGuardar').click(function() {
	var user_id = $('#user_id').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var first_name = $('#first_name').val();
	var middle_name = $('#middle_name').val();
	var last_name = $('#last_name').val();
	var email = $('#email').val();

	console.log(user_id);

	//Validar
	if(user_id=='')
		$('#user_id').focus();
	else if(username=='')
		$('#username').focus();
	else if(password=='')
		$('#password').focus();
	else if(first_name=='')
		$('#first_name').focus();
	else if(middle_name=='')
		$('#middle_name').focus();
	else if(last_name=='')
		$('#last_name').focus();
	else if(email=='')
		$('#email').focus();	
	else{
		var json = { "user_id": user_id, "username": username, "password": password, "first_name": first_name, "middle_name": middle_name, "last_name": last_name, "email": email};

		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost/UserWs/guardar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta) {
				$('#modal-primary').modal('hide');
				llenarTabla();
				console.log("Se guardo correctamente");
			},error:function(respuesta) {
				console.log("Error al guardar");
			}
		});
	}

});

//Buscar (antes de editar hay que buscar)
$('#datosUsuario').on('click','.btn-warning',function(){
	var user_id = $(this).attr('data'); 
	var json = {"user_id":user_id};

	$.ajax({
		type:'ajax',
		method:'post',
		url:'http://localhost/UserWs/buscar',
		data:JSON.stringify(json),
		contentType:'application/json; charset=UTF-8',
		success:function(respuesta){
			$('#user_idE').val(respuesta.user_id);
			$('#usernameE').val(respuesta.username);
			$('#passwordE').val(respuesta.password);
			$('#first_nameE').val(respuesta.first_name);
			$('#middle_nameE').val(respuesta.middle_name);
			$('#last_nameE').val(respuesta.last_name);
			$('#emailE').val(respuesta.email);
			$('#modalEditar').modal('show');
		},error:function(respuesta) {
			console.log("Error al buscar");
		}
	})
});

//Editar
$('#btnEditar').click(function(){

	console.log("entrar a editar");
	var user_id = $('#user_idE').val();
	var username = $('#usernameE').val();
	var password = $('#passwordE').val();
	var first_name = $('#first_nameE').val();
	var middle_name = $('#middle_nameE').val();
	var last_name = $('#last_nameE').val();
	var email = $('#emailE').val();


	//Validar
	if(username=='')
		$('#usernameE').focus();
	else if(password=='')
		$('#passwordE').focus();
	else if(first_name=='')
		$('#first_nameE').focus();
	else if(middle_name=='')
		$('#middle_nameE').focus();
	else if(last_name=='')
		$('#last_nameE').focus();
	else if(email=='')
		$('#emailE').focus();
	else{
		var json = { "user_id": user_id, "username": username, "password": password, "first_name": first_name, "middle_name": middle_name, "last_name": last_name, "email": email};
		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost/UserWs/editar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta){
				$('#modalEditar').modal('hide');
				llenarTabla();
			},error:function(respuesta) {
				console.log("Error al editar "+respuesta);
			}		

		})
	}
});

//Buscar (antes de eliminar hay que buscar)
$('#datosUsuario').on('click','.btn-danger',function(){
	var user_id = $(this).attr('data'); 
	var json = {"user_id":user_id};

	$.ajax({
		type:'ajax',
		method:'post',
		url:'http://localhost/UserWs/buscar',
		data:JSON.stringify(json),
		contentType:'application/json; charset=UTF-8',
		success:function(respuesta){
			$('#user_idEl').val(respuesta.user_id);
			$('#usernameEl').val(respuesta.username);
			$('#passwordEl').val(respuesta.password);
			$('#first_nameEl').val(respuesta.first_name);
			$('#middle_nameEl').val(respuesta.middle_name);
			$('#last_nameEl').val(respuesta.last_name);
			$('#emailEl').val(respuesta.email);
			$('#modalEliminar').modal('show');
		},error:function(respuesta) {
			console.log("Error al buscar");
		}
	})
});


//Eliminar
$('#btnEliminar').click(function(){
	var user_id = $('#user_idEl').val();
	var username = $('#usernameEl').val();
	var password = $('#passwordEl').val();
	var first_name = $('#first_nameEl').val();
	var middle_name = $('#middle_nameEl').val();
	var last_name = $('#last_nameEl').val();
	var email = $('#emailEl').val();

	//Validar
	if(user_id=='')
		$('#user_idEl')
	if(username=='')
		$('#usernameEl');
	else if(password=='')
		$('#passwordEl');
	else if(first_name=='')
		$('#first_nameEl');
	else if(middle_name=='')
		$('#middle_nameEl');
	else if(last_name=='')
		$('#last_nameEl');
	else if(email=='')
		$('#emailEl');
	else{
		var json = { "user_id": user_id, "username": username, "password": password, "first_name": first_name, "middle_name": middle_name, "last_name": last_name, "email": email};
		$.ajax({
			type:'ajax',
			method:'post',
			url:'http://localhost/UserWs/eliminar',
			data:JSON.stringify(json),
			contentType:'application/json; charset=UTF-8',
			success:function(respuesta){
				$('#modalEliminar').modal('hide');
				llenarTabla();
			},error:function(respuesta) {
				console.log("Error al eliminar "+respuesta);
			}		

		})
	}
});

