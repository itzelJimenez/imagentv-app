const $email = $('#email');
const $password = $('#password');
const $form = $('#form');
const $ingresar = $('#ingresar');

var cargarPagina = function(){
	$form.submit(validateFields);
	$ingresar.addClass('disabled');
	emptyFields();
	$email.keyup(emptyFields);
	$password.keyup(emptyFields);
	$ingresar.click(validateFields);
}

const emptyFields = ()=>{
	if( $email.val().length == 0 || $password.val().length == 0 ){
		$ingresar.addClass('disabled');
	}else {
		$ingresar.removeClass('disabled');
	}
}

const validateEmail = ()=>{
	let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	if (emailRegex.test($email.val())) {
		return true;
	} else {
		alert("Ingresa un email valido");
	}
};

const validatePassword = ()=>{
	if($password.val().length > 6){
		alert("Recuerda que debes ingresar un password de 6 dígitos");
	} else if ($password.val().length < 6){
		alert("Recuerda que debes ingresar un password de mínimo 6 dígitos");
	} else if($password.val().length == 6){ return true};
}

const validateFields = (e)=>{
	e.preventDefault();
	if(validateEmail() && validatePassword()){
		userRegister();
	} 
}

const userRegister = function(){
	location.href="canal.html"
};

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDhWXnUNzqUjE2BBr3wRfDV24rJMQDlLGU",
	authDomain: "login-f6999.firebaseapp.com",
	databaseURL: "https://login-f6999.firebaseio.com",
	projectId: "login-f6999",
	storageBucket: "login-f6999.appspot.com",
	messagingSenderId: "629820319496"
};
firebase.initializeApp(config);


var loginWithFb = function(){
	var provider = new firebase.auth.FacebookAuthProvider();
	login(provider)
};

var loginWithTwitter = function(){
	var provider = new firebase.auth.TwitterAuthProvider();
	login(provider)
};

var loginWithGoogle = function(){
	var provider = new firebase.auth.GoogleAuthProvider();
	login(provider)
};

var login = function(provider){

	firebase.auth().signInWithPopup(provider)
		.then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;
		console.log(user);
		var responseAPI = {
			name : user.displayName,
			email : user.email,
			type: 2,
			gender: 'Femenino',
		}

		localStorage.setItem('name', responseAPI.name);


		loginUser(responseAPI);
	})
		.then(function() {
			console.log('hey tu');
		location.href = 'bienvenida.html';
	})
		.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		var email = error.email;
		var credential = error.credential;
	});
};


var userRegisterApi = function(responseAPI){
	$.post('http://www.imagentv.jediteam.mx/api/users/register', {
		jsonp: "callback",
		type: responseAPI.type,
		email: responseAPI.email,
		gender: responseAPI.gender,
	})
};

var loginUser = function(responseAPI) {
	console.log(responseAPI);
	$.ajax({
		url:'http://www.imagentv.jediteam.mx/api/users/login',
		headers: {
			"My-First-Header":"first value",
			"My-Second-Header":"second value"
		}
		type: 'POST',
		data: {
		type: responseAPI.type,
		email: responseAPI.email,
	}, 
		  success: function(res){
		console.log(res)
	}, error: function(error){
		console.log(error)
	}
})

}



var fbButton = document.querySelector('.login-fb');
var twitterButton = document.querySelector('.login-twitter');
var googleButton = document.querySelector('.login-google');

fbButton.addEventListener('click', loginWithFb);
twitterButton.addEventListener('click', loginWithTwitter);
googleButton.addEventListener('click', loginWithGoogle);

$(document).ready(cargarPagina);