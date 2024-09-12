     /* Executed when the APIs finish loading */
 function renderSignup() {
   // Attach a click listener to a button to trigger the flow.
   document.getElementById('gpButton').addEventListener('click', function() {
     gapi.auth.signIn( { 'callback': gpSignup} ); // Will use page level configuration
   });
 }
function renderLogin() {
   // Attach a click listener to a button to trigger the flow.
   document.getElementById('gpButton').addEventListener('click', function() {
     gapi.auth.signIn( { 'callback': gpLogin} ); // Will use page level configuration
   });
   //alert("pizzle pazza");
 }
function gpSignup(authResult) {
if (authResult['status']['signed_in']) {
        //document.getElementById('signinButton').setAttribute('style', 'display: none');
        gapi.client.load('plus','v1', function(){
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.execute(function(response) {
                 $.post(my_href+"system/gpAddUser.php",
                        {
                           "first_name" : response.name.givenName,
                           "last_name" : response.name.familyName,
                           "id" : response.id,
                           "product" : $("#product").val()
                        },
                        function(data){
                           if (data.status == "success"){
                                window.location = my_href + "confirm.php";
                           }
                           else {
                               if (data.status) {
                                    alert('server error: '+data.status)
                               }
                               else alert("failed to connect server");
                             }
                           },
                           "json"
                        );    
                });
            });
    } else {
        console.log('Sign-in state: ' + authResult['error']);
    }
}
function gpLogin(authResult) {
    if (authResult['status']['signed_in']) {
        //document.getElementById('signinButton').setAttribute('style', 'display: none');
        gapi.client.load('plus','v1', function(){
            var request = gapi.client.plus.people.get({
                'userId': 'me'
            });
            request.execute(function(response) {
                    $.post(my_href+"system/gpLogin.php",
                           { "id" : response.id },
                           function(data){
                             if (data.error){
                                $('$topheader').css("color", "red").html(error);
                             }
                             else {
                                window.location = my_href + "Membership/";
                             }
                           },
                           "json"
                        );
                });
            });
    } else {
        console.log('Sign-in state: ' + authResult['error']);
    }
}