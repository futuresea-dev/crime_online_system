function onSignIn(googleUser)
{

    var profile, idToken;

    // Are we on the sign-up page?
    if ($('#main form input[name="validatepayment"]').val() == 'Continue') {

        // Useful data for your client-side scripts:
        profile = googleUser.getBasicProfile();

        // The ID token you need to pass to your backend:
        idToken = googleUser.getAuthResponse().id_token;

        // Populate form
        if ($('#main form').data('google-id') != profile.getId()) {
            $('#main form').append('<input type="hidden" name="payment_googleauthtoken" value="' + idToken + '" />');
            $('#main form').trigger('submit');
        }

    // Or are we on the login page?
    } else if ($('#main form input[name="memberlogin"]').val() == 'Log In') {

        // Useful data for your client-side scripts:
        profile = googleUser.getBasicProfile();

        // The ID token you need to pass to your backend:
        idToken = googleUser.getAuthResponse().id_token;

        // Populate form
        if ($('#main form').data('google-id') != profile.getId()) {
            $('#main form').append('<input type="hidden" name="payment_googleauthtoken" value="' + idToken + '" />');
            $('#main form').trigger('submit');
        }

    }

}
