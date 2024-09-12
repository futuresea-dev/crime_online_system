$(document).ready(function() {
    console.log('docuemtn ready');

    console.log("DomeContentLoadded");
    console.log('key' , stripe_key);

    console.log('clientSecret', clientSecret);

    var stripe = window.Stripe(stripe_key, {
        apiVersion: '2020-08-27',
    });
    // var stripe = window.Stripe("pk_test_51PNfM21jXwMTTxC58JSnb0yKyZtHRFu1jd0hwEEvfPSGH5BPFwIPHVxQuSWRbcCVVy01x3E02HFYoZC5qXnoVYaG00PR5vqK1n", {
    //     apiVersion: '2020-08-27',
    // });
  
    const appearance = { /* appearance */ };
    const options = { /* options */ };
    const elements = stripe.elements({ clientSecret, appearance });
    const paymentElement = elements.create('payment', options);
    paymentElement.mount('#payment-element');


    $("#make-payment").click(async function() {
      $("#make-payment").prop('disabled', true);
      $("#make-payment").text('Processing...');

      const {error: stripeError} = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: `${window.location.origin}/`
        }
      });

      $("#make-payment").prop('disabled', false);
      $("#make-payment").text('Make Payment');

      if (stripeError) {
        alert(stripeError.message);
      } else {
        $('#complete-form').trigger('submit');
        // $.post(
        //   my_href+"stripe/complete.php",
        //   {
        //     "client_secret" : clientSecret
        //   },
        //   function(data) {
        //     if (data.status == "success") {
        //       window.location = window.location.origin;
        //     } else {
        //       if (data.status) {
        //           alert('server error: '+data.status)
        //       } else {
        //         alert("failed to connect server");
        //       }
        //     }
        //   },
        //   "json"
        // );
      }
      // alert('ok');
    });
});

