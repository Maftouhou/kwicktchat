$(document).ready(function () {
    $("#submit").click(function (e) {

      e.preventDefault();

      var user_name = $('#inputPseudo').val();
      var password = $('#inputPassword').val();
    
var inscription = $.ajax({
       url: 'http://greenvelvet.alwaysdata.net/kwick/api/signup/'+user_name+'/'+password,
       dataType: 'jsonp'
      });


inscription.done( function(reponse) {

  if( reponse['result']['status'] === 'done') {

    var user = {
      id : reponse['result']['id'],
      token : reponse['result']['token']
    }

    user = JSON.stringify(user);
    localStorage.setItem('user', user);
    console.log(localStorage);

  }else{
    console.log('Ce login existe déjà');
  }

  });
});
    



  $("#submitConnect").click(function (e) {
    e.preventDefault();
    var user_nameConnect = $('#inputPseudo').val();
    var passwordConnect = $('#inputPassword').val();

      var connexion = $.get({
       url: 'http://greenvelvet.alwaysdata.net/kwick/api/login/'+user_nameConnect+'/'+passwordConnect,
       dataType: 'jsonp'
      });

      connexion.done( function(reponse) {
           var user = {
  id : reponse['result']['id'],
  token : reponse['result']['token']
          }

  user = JSON.stringify(user);
  localStorage.setItem('user', user);
  window.location = "tchat.html";
       

      })
      
  });  

  $("#submitDeco").click(function (e) {
    e.preventDefault();

    data = JSON.parse(localStorage.getItem('user'));
    var token = data.token,
    id = data.id;

      $.get({
       url: 'http://greenvelvet.alwaysdata.net/kwick/api/logout/'+token+'/'+id,
       dataType: 'jsonp'


      }, function(data) {
      
            localStorage.clear();
            window.location = "connect.html";
      });
   

      
  });


 $("#submit-mgs").click(function (e) {
      e.preventDefault();

    data = JSON.parse(localStorage.getItem('user'));
    var token = data.token,
    id = data.id;
    message = $('#msg').val();


  console.log(localStorage.getItem('user'));
    var msgi = $.ajax({
      url: 'http://greenvelvet.alwaysdata.net/kwick/api/say/'+token+'/'+id+'/'+message,
      dataType : 'jsonp'
    });

  msgi.done( function(data) {
  console.log(data);

    var user = {
    id : data['result']['id'],
    token : data['result']['token'],
    message : data ['result']['message'],
  }

  var json_data = JSON.stringify(message);
  
  })

  });


});




==========================================
    signupRequete.success(function(feedback){
      if (feedback['result']['status']==='done') {
        console.log(feedback['result']['status']);

        var userInfo = {
          id : feedback['result']['id'],
          token : feedback['result']['token']
        }

        var userInfoStored = JSON.stringify(userInfo);
        localStorage.setItem('userInfo', userInfoStored);

        var gotItem = localStorage.getItem('userInfo'),
          parsedItem = JSON.parse(gotItem);
      }
      else{
        console.log(feedback['result']['status']); 
      }
    })