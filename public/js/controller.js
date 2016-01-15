$(document).ready(function(){

	// GLOBALS !
	var kwickApiUrl = 'http://greenvelvet.alwaysdata.net/kwick/api';
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
		}
	});

	// Display Message list 
	var showMssgRequest = $.ajax({
		url : kwickApiUrl+'/talk/list/'+userToken+'/0',
		dataType : 'jsonp'
	});

	showMssgRequest.success(function(mssgFeedback){
		if (mssgFeedback['result']['status'] === 'done') {

			var sentMssg = mssgFeedback['result']['talk'].reverse();

			for (var i = 0; i<=sentMssg.length; i++) {
				$('#mssgView').append('<p><span>'+sentMssg[i].user_name+'</span><span>'+sentMssg[i].content+'</span></p>');
			};
		}
	});

	// Registration bihavior
	$('#signupForm').on('submit', function(evt){
		evt.preventDefault();
		var pseudonym = $('#pseudonym').val(),
			password = $('#password').val();

		/* ======== Make Form Validation !!! ========= */
		
		var signupRequete = $.ajax({
			url : kwickApiUrl+'/signup/'+pseudonym+'/'+password,
			dataType : 'jsonp'
		});

		signupRequete.success(function(signFeedback){
			if (signFeedback['result']['status']==='done') {
				$('#signupNotification').empty();
				window.location = 'connexion.html';
			}
			else{
				$('#signupNotification')
				.append(signFeedback['result']['status']+', '+ signFeedback['result']['message'])
				.addClass("errorEvt");
			}
		})
	});
	
	// Signup bihavior
	$('#signinForm').on('submit', function(evt){
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

				var userInfoStored = JSON.stringify(userInfo);
				localStorage.setItem('userInfo', userInfoStored);

				var gotItem = localStorage.getItem('userInfo'),
					parsedItem = JSON.parse(gotItem);


				$('#loginNotification').empty();
				window.location = 'espace.html';

			}else{
				$('#loginNotification').empty()
				.append(logFeedback['result']['status']+', '+ logFeedback['result']['message'])
				.addClass('errorNotif'); 
			}
		});
	});

	// Submit messages
	$('#submitMessage').on('submit', function(evt){
		evt.preventDefault();
		var userMssg = $('#messageId').val();

		// Get user info from localStorage
		var userInfo = JSON.parse(localStorage.getItem('userInfo'));
		var userToken = userInfo.userToken,
			userId = userInfo.userId;

		var sendMssgRequest = $.ajax({
			url : kwickApiUrl+'/say/'+userToken+'/'+userId+'/'+userMssg,
			dataType : 'jsonp'
		});

		$('#messageId').empty();
		// location.reload();
	});

	// Signout function
	$('#signOut').on('click', function(){
		var logoutRequest = $.ajax({
			url : kwickApiUrl+'/logout/'+userToken+'/'+userId,
			dataType : 'jsonp'
		});

		logoutRequest.success(function(logoutFeedback){
			if (logoutFeedback['result']['status'] === 'done') {
				window.location = 'index.html';
			}
		})
	})
});