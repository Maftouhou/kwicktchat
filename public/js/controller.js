$(document).ready(function(){

	// GLOBALS !
	var kwickApiUrl = 'http://greenvelvet.alwaysdata.net/kwick/api';
	// Get user information from localStorage
	var userInfo = JSON.parse(localStorage.getItem('userInfo')),
		userToken = userInfo.userToken,
		userId = userInfo.userId;

	// Display user list and messages
	var displayUserMssg = function (){

		// Display user list 
		var showUserRequest = $.ajax({
			url : kwickApiUrl+'/user/logged/'+userToken,
			dataType : 'jsonp'
		});

		showUserRequest.success(function(sayFeedback){
			if (sayFeedback['result']['status'] === 'done') {

				var loggedUser = sayFeedback['result']['user'];

				$('#userList').empty();
				for (var i = 0; i<loggedUser.length; i++) {
					$('#userList').append('<li>'+loggedUser[i]+'</li>');
				}
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

				$('#mssgView').empty();
				for (var i = 0; i<sentMssg.length; i++) {
					var timestamp = new Date(sentMssg[i].timestamp*1000),
						hours = timestamp.getHours(),
						minutes = "0" + timestamp.getMinutes(),
						seconds = "0" + timestamp.getSeconds();
					
					var sentTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

					$('#mssgView').append('<p><span>'+sentMssg[i].user_name+'</span><em> @'+sentTime+' </em>'+' '+sentMssg[i].content+'</p>');
				};
			}
		});
	}

	// Display User and Messages 
	displayUserMssg();
	setInterval(displayUserMssg, 1000);

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
				$('#signupNotification').empty()
				.append(signFeedback['result']['status']+', '+ signFeedback['result']['message'])
				.addClass("errorNotif");
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

		$('#messageId').val('');
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
		var currentPage = window.location.href;

	if (currentPage == 'http://127.0.0.1:8080/espace.html') {
		setTimeout(function(){ 
			$('#evtButton').hide(); 
		}, 100);
	}
});