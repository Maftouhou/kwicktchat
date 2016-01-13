$(document).ready(function(){

	// GLOBALS !
	var kwickApiUrl = 'http://greenvelvet.alwaysdata.net/kwick/api';
	// location.reload();
	// Get user information from localStorage
	var userInfo = JSON.parse(localStorage.getItem('userInfo')),
		userToken = userInfo.userToken,
		userId = userInfo.userId;

	// Display user list 
	var showUserRequest = $.ajax({
		url : kwickApiUrl+'/user/logged/'+userToken,
		dataType : 'jsonp'
	});

	showUserRequest.success(function(sayFeedback){
		if (sayFeedback['result']['status'] === 'done') {

			var loggedUser = sayFeedback['result']['user'];

			for (var i = 0; i<=loggedUser.length; i++) {
				$('#userList').append('<li>'+loggedUser[i]+'</li>');
			};

			console.log(loggedUser);
		}
	});

	// Display Message list 
	var showMssgRequest = $.ajax({
		url : kwickApiUrl+'/talk/list/'+userToken+'/0',
		dataType : 'jsonp'
	});

	showMssgRequest.success(function(mssgFeedback){
		if (mssgFeedback['result']['status'] === 'done') {

			var loggedUser = mssgFeedback['result']['talk'].reverse();

			for (var i = 0; i<=loggedUser.length; i++) {
				$('#userMessages').append('<li>'+loggedUser[i].content+'</li>');
			};

			console.log(mssgFeedback['result']['talk']);
		}
	});

	// Registration bihavior
	$('#signupForm').on('submit', function(evt){
		// Prevent page loading
		evt.preventDefault();
		alert('OK');
		var pseudonym = $('#pseudonym').val(),
			password = $('#password').val();

		// Make Form Validation !!!
		
		var signupRequete = $.ajax({
			url : kwickApiUrl+'/signup/'+pseudonym+'/'+password,
			dataType : 'jsonp'
		});

		signupRequete.success(function(signFeedback){
			if (signFeedback['result']['status']==='done') {
				console.log(signFeedback['result']['status']);
				alert('vous allez etre rediriger vers la page de connexion');
				// window.location.assign('#/connexion');
			}
			else{
				alert(signFeedback['result']['status']+', '+ signFeedback['result']['message']); 
			}
		})
	});
	
	// Signup bihavior
	$('#signinForm').on('submit', function(evt){
		// Prevent page loading
		evt.preventDefault();

		var userLogin = $('#login').val(),
			passwd = $('#passwd').val();

		var loginRequest = $.ajax({
			url : kwickApiUrl+'/login/'+userLogin+'/'+passwd,
			dataType : 'jsonp'
		});

		loginRequest.success(function(logFeedback){
			if (logFeedback['result']['status'] === 'done') {
				
				var userInfo = {
					userId : logFeedback['result']['id'],
					userToken : logFeedback['result']['token']
				};

				console.log(logFeedback['result']['status']);

				var userInfoStored = JSON.stringify(userInfo);
				localStorage.setItem('userInfo', userInfoStored);

				var gotItem = localStorage.getItem('userInfo'),
					parsedItem = JSON.parse(gotItem);

				console.log(JSON.parse(localStorage.getItem('userInfo')));
				window.location = '#/espace';
			}else{
				alert(logFeedback['result']['status']+', '+ logFeedback['result']['message']); 
			}
		});
	});

	// Submit messages
	$('#submitMessage').on('submit', function(evt){
		evt.preventDefault();
		// alert('message ok');
		var userMssg = $('#messageId').val();

		// Get user info from localStorage
		var userInfo = JSON.parse(localStorage.getItem('userInfo'));
		var userToken = userInfo.userToken,
			userId = userInfo.userId;
		console.log(userInfo, userToken, userId, userMssg);

		var sendMssgRequest = $.ajax({
			url : kwickApiUrl+'/say/'+userToken+'/'+userId+'/'+userMssg,
			dataType : 'jsonp'
		});
	});

	// Signout function
	$('#signOut').on('click', function(){
		// Signout function
		var logoutRequest = $.ajax({
			url : kwickApiUrl+'/logout/'+userToken+'/'+userId,
			dataType : 'jsonp'
		});

		logoutRequest.success(function(logoutFeedback){
			if (logoutFeedback['result']['status'] === 'done') {
				window.location = '#/';
			}
		})
	})
});