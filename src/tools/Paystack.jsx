const PayButton = ({bg, tier, upgradestatus, openLoader, closeLoader, openAlert, getUser}) => {

  const payWithPaystack = (order) => {
    const handler = window.PaystackPop.setup({
      key: `${process.env.REACT_APP_PAYSTACK_PUBLIC_KEY}`, // Your public key
      email: order?.email,
      amount: order?.amount, // amount in kobo
      currency: "NGN",
      ref: order?.reference,
      callback: function (response) {
        // alert("Payment successful! Reference: " + response.reference);
        openAlert("Payment Successful!");

        // Send ref to backend (Laravel) for verification
        fetch(`${process.env.REACT_APP_BACKEND_API}/paystack/verify-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({ reference: response.reference }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("Backend verification response", data);
            if(data.status === 'success'){
              getUser(); // code here
            }
          });
      },
      onClose: function () {
        // alert("Transaction was not completed, window closed.");
        openAlert("You are about to exit but transaction was not completed!");
      },
    });
    handler.openIframe();
  }

  const placeOrder = async () => {
      openLoader();
      try{
          let requestParams = {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({tier})
      }
          const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/upgrade/placeorder`, requestParams);
          const data = await response.json();

          if(data.status === 'success'){
              closeLoader();
              payWithPaystack(data.order);
          }
      } catch(err){
          console.log("Couldn't finish request: " + err.message);
      }
  }

  return (
    <button type="button" onClick={placeOrder} 
    className={`btn w-full text-white ${bg}`} disabled={upgradestatus}>
      {upgradestatus ? "Renew" : "Upgrade"}
    </button>
  );
};

export default PayButton;
