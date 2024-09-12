// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}


function fbLogin() {
    FB.login(function(response) {
             if (response.status == "connected"){
             //console.log(JSON.stringify(response));
             FB.api('/me', function(response) {
                    $.post(my_href+"system/fbLogin.php",
                           { "id" : response.id },
                           function(data){
                             if (data.error){
                                //alert (data.error);
                             }
                             else {
                                window.location = my_href + "Membership/";
                             }
                           },
                           "json"
                        )
                    });
             }
        });
}
function fbSignup(){
    FB.login(function(response) {
            if (response.status == "connected"){
                //console.log(JSON.stringify(response));
             FB.api('/me', function(response) {
                    $.post(my_href+"system/fbAddUser.php",
                           {
                           "first_name" : response.first_name,
                           "last_name" : response.last_name,
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
            }
        });;
}
window.fbAsyncInit = function() {
    FB.init({
            appId      : '1517024855253191',
            cookie     : true,  // enable cookies to allow the server to access
            // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.1' // use version 2.1
            });
    
};

// Load the SDK asynchronously
(function(d, s, id) {
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) return;
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
           console.log('Successful login for: ' + response.name);
           document.getElementById('status').innerHTML =
           'Thanks for logging in, ' + response.name + '!';
           });
}