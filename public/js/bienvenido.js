var cargarPagina = function(){
	$('.slider').slider();
	var name = localStorage.getItem('name');
	$('#name').text(name);
};

$(document).ready(cargarPagina);