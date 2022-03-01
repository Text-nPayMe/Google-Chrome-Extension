const currentInputElement = document.getElementsByTagName('input')[0];
  
const state = {
    open: false,
    cloudImagesUrl: `https://storage.cloud.google.com/textnpayme_files/`,
    appUrl: 'https://d-api.textnpay.co/',
    receiver: '',
    phone: '',
    amount: '',
    sender: '',
    authtoken: '',
    passcode: '',
    formStep: 1,
    error: {
        type: '',
        message: ''
    },
    loginError: null
  }
  
  const makeContainerElement = document.createElement('div');
  makeContainerElement.classList.add('TaP-container');
  
  
// **************** HTML
  
  makeContainerElement.innerHTML = `
      <div class="TaP-form-container hidden-form">
      <form>
          <div class="TaP-FormControl-root formstep-1">
              <label class="TaP-InputLabel-root" for="receiverElement" id="receiverElementLabel">
                  Receiver’s name
              </label>
              <div class="TaP-Input-root">
                  <input 
                      name="receiver"
                      type="text" 
                      id="receiverElement" 
                      class="TaP-Input-input" 
                      value="" 
                  />
                  <img src='https://storage.cloud.google.com/textnpayme_files/checkicon.png?authuser=6' width='17' class='check-icon d-none' />
              </div>
              <div class="error-message">Please Enter receiver name</div>
          </div>
  
          <div class="TaP-FormControl-root formstep-1">
              <label class="TaP-InputLabel-root" for="phoneElement" id="phoneElementLabel">
                  Mobile phone number
              </label>
              <div class="TaP-Input-root">
                  <input 
                      name="phone"
                      type="text" 
                      id="phoneElement" 
                      class="TaP-Input-input" 
                      value="" 
                  />
                  <img src='https://storage.cloud.google.com/textnpayme_files/checkicon.png?authuser=6' width='17' class='check-icon d-none' />
              </div>
              <div class="error-message">Please Enter receiver phone</div>
          </div>
  
          <div class="TaP-FormControl-root formstep-1">
              <label class="TaP-InputLabel-root" for="amountElement" id="amountElementLabel">
                  Amount (AMD)
              </label>
              <div class="TaP-Input-root">
                  <input
                      name="amount"
                      type="number" 
                      id="amountElement" 
                      class="TaP-Input-input" 
                      value="" 
                  />
                  <img src='https://storage.cloud.google.com/textnpayme_files/checkicon.png?authuser=6' width='17' class='check-icon d-none' />
              </div>
              <div class="error-message">Please Enter amount</div>
          </div>

          <div class="TaP-FormControl-root formstep-2">
              <label class="TaP-InputLabel-root" for="senderElement" id="senderElementLabel">
                  Your phone number
              </label>
              <div class="TaP-Input-root">
                  <input 
                      name="phone"
                      type="text" 
                      id="senderElement" 
                      class="TaP-Input-input" 
                      value="" 
                  />
                  <img src='https://storage.cloud.google.com/textnpayme_files/checkicon.png?authuser=6' width='17' class='check-icon d-none' />
              </div>
              <div class="error-message">Please Enter your phone</div>
          </div>
  
          <div class="TaP-FormControl-root formstep-2">
              <label class="TaP-InputLabel-root" for="passcodeElement" id="passcodeElementLabel">
                  Enter your passcode
              </label>
              <div class="TaP-Input-root">
                  <input
                      name="amount"
                      type="password" 
                      id="passcodeElement" 
                      class="TaP-Input-input" 
                      value="" 
                  />
                  <img src='https://storage.cloud.google.com/textnpayme_files/checkicon.png?authuser=6' width='17' class='check-icon d-none' />
              </div>
              <div class="error-message">Please Enter passcode</div>
          </div>
  
          <button class="TaP-button btn-static send-btn formstep-1">
              Send
          </button>
          <button class="TaP-button btn-white generate-btn formstep-1">
              Generate a magic link
          </button>
          <button class="TaP-button btn-white approve-btn formstep-2 ">
              Approve the payment
          </button>
          <button class="TaP-button btn-white logingenerate-btn formstep-2 ">
              Login and generate a magic link
          </button>
          <button class="TaP-button btn-white receipt-btn formstep-2 d-none">
              Copy the payment receipt link
          </button>
      
      </form>
      </div>
      <img src="https://storage.cloud.google.com/textnpayme_files/Frame.png?authuser=6" alt="logo" id="TaP-button" class="form-btn" />
      <img src="https://storage.cloud.google.com/textnpayme_files/FrameYellow.png?authuser=6" alt="logo" id="TaP-button-yellow" class="form-btn hidden-img" />
  `
// **************** END HTML
  
  
// **************** CSS
  const css = `
      .TaP-container {
          width: 42px;
          height: 42px;
          position: absolute;
          right: -100px;
          top: -5px;
      }

      .check-icon {
        width: 17px;
        position: absolute;
        right: 0;
      }
  
      .TaP-container > img {
          width: 40px;
          position: absolute;
          bottom: 0;
          left: 0;
          cursor: pointer;
  
          opacity:1;
          transition:opacity 0.5s linear;
      }
  
      .hidden-img {
          opacity: 0 !important;  
      }
  
      .TaP-form-container {
          position: absolute;
          bottom: 15px;
          left: 15px;
  
          box-sizing: border-box;
          width: 390px;
          min-height: 180px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          padding: 45px;
          background: #FFFFFF;
          box-shadow: 1px 1px 40px rgba(26, 26, 26, 0.1);
          border-radius: 24px;
      }
  
      div .formstep-2 {
          display: none;
      }
  
      .hidden-form {
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s, opacity 0.5s linear;
      }
  
      .visible-form {
          visibility: visible;
          opacity: 1;
          transition: visibility 0s, opacity 0.5s linear;
      }
  
      .TaP-form-container form {
          width: 100%;
      }
  
      .TaP-FormControl-root {
          display: -webkit-inline-box;
          display: -webkit-inline-flex;
          display: -ms-inline-flexbox;
          display: inline-flex;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          position: relative;
          min-width: 0;
          padding: 0;
          margin: 0;
          border: 0;
          width: 300px;
          margin-bottom: 12px;
      }
  
      .TaP-InputLabel-root {
          color: rgba(0, 0, 0, 0.6);
          font-family: "Roboto","Helvetica","Arial",sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.4375em;
          letter-spacing: 0.00938em;
          padding: 0;
          position: relative;
          display: block;
          transform-origin: top left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          -webkit-transform: translate(0, 20px) scale(1);
          -moz-transform: translate(0, 20px) scale(1);
          -ms-transform: translate(0, 20px) scale(1);
          transform: translate(0, 20px) scale(1);
          -webkit-transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,-webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
          transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  
      }
  
      .label-focus {
          transform: translate(0, -1.5px) scale(0.75);
      }

      body div .input-focused label {
          color: #FFAC30;
      }

      div .input-error label {
        color: #F44336;
      }

        body div .input-focused > div:before {
            border-bottom: 1px solid #FFAC30;
        }

        div .input-error > div:before {
            border-bottom: 1px solid #F44336;
        }

        .error-message {
            opacity: 0;
        }
  
      .TaP-Input-root {
          margin-top: 16px;
  
          font-family: "Roboto","Helvetica","Arial",sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.4375em;
          letter-spacing: 0.00938em;
          color: rgba(0, 0, 0, 0.87);
          box-sizing: border-box;
          position: relative;
          cursor: text;
          display: -webkit-inline-box;
          display: -webkit-inline-flex;
          display: -ms-inline-flexbox;
          display: inline-flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          position: relative;
      }
      .TaP-Input-root:before {
          border-bottom: 1px solid rgba(0, 0, 0, 0.42);
          left: 0;
          bottom: 0;
          content: "";
          position: absolute;
          right: 0;
          -webkit-transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          pointer-events: none;
      }
  
      .TaP-Input-root:after {
          border-bottom: 2px solid #1976d2;
          left: 0;
          bottom: 0;
          content: "";
          position: absolute;
          right: 0;
          -webkit-transform: scaleX(0);
          -moz-transform: scaleX(0);
          -ms-transform: scaleX(0);
          transform: scaleX(0);
          -webkit-transition: -webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
          transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
          pointer-events: none;
      }
  
      .TaP-Input-root:after {
          border-bottom: 2px solid #1976d2;
          left: 0;
          bottom: 0;
          content: "";
          position: absolute;
          right: 0;
          -webkit-transform: scaleX(0);
          -moz-transform: scaleX(0);
          -ms-transform: scaleX(0);
          transform: scaleX(0);
          -webkit-transition: -webkit-transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
          transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
          pointer-events: none;
      }
  
      .TaP-Input-input {
          font: inherit;
          letter-spacing: inherit;
          color: currentColor;
          padding: 4px 0 5px;
          border: 0;
          box-sizing: content-box;
          background: none;
          height: 1.4375em;
          margin: 0;
          -webkit-tap-highlight-color: transparent;
          display: block;
          min-width: 0;
          width: 100%;
          -webkit-animation-name: mui-auto-fill-cancel;
          animation-name: mui-auto-fill-cancel;
          -webkit-animation-duration: 10ms;
          animation-duration: 10ms;
  
          outline: none;
      }
  
  
      .TaP-button {
          width: 100%;
          max-width: 300px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #1A1A1A;
          outline: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 24px;
  
          letter-spacing: 0.4px;
  
          color: rgba(26, 26, 26, 0.9);
  
          margin-bottom: 12px;
      }
  
      body div .btn-static {
          background-color: #FFAC30;
          color: #1A1A1A;
      }
  
      .btn-white {
          background-color: #FFFFFF;
          border: 2px solid rgba(26, 26, 26, 0.42);
      } 

      div .approve-btn {
        color: rgba(26, 26, 26, 0.38);
        font-size: 15px;
      }

      .error-message {
          color: #F44336;
          font-size: 12px;
      }

      .notifications {
        position: fixed;
        bottom: 50px;
        left: 50px;
        z-index: 100000000;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        align-items: flex-start;
      }
      .notifications > div {
        width: 300px;
        padding: 30px;
        position: relative;
        border-radius: 15px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        align-items: flex-start;
        color: white;
        font-size: 20px;
        animation: goIn 1s ease-out forwards, goOut 1s ease-out forwards 5s;
        box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.25);
        margin-top: 20px;
      }
      .fading_out {
        opacity: 0 !important;
        transform: translateX(-300px) !important;
        transition: all 1s ease-out !important;
      }
      .notifications > div.green {
        background-color: #80e76f;
      }
      .notifications > div.red {
        background-color: #e7816f;
      }
      .notifications > div.normal {
        background-color: #f2f4ff;
        color: black;
      }
      @keyframes goIn {
        0% {
          opacity: 0;
          transform: translateX(-300px);
        }
        100% {
          opacity: 1;
          transform: translateX(0px);
        }
      }
      @keyframes goOut {
        0% {
          opacity: 1;
          transform: translateX(0px);
        }
        100% {
          opacity: 0;
          transform: translateX(-300px);
        }
      }
      .notifications > div > div {
        position: absolute;
        width: 30px;
        height: 30px;
        top: 5px;
        right: 5px;
        border-radius: 50%;
        padding: 0px 2.5px;
        cursor: pointer;
      }
      .notifications > div > div:active {
        background-color: #bababa;
      }
      .notifications > div > div div {
        height: 2.5px;
        width: 15px;
        background-color: white;
        margin: 5px;
        border-radius: 1.25px;
        position: relative;
        transform: rotate(45deg);
      }
      .notifications > div.normal > div div {
        background-color: black;
      }
      .notifications > div > div div:first-child {
        transform: rotate(-45deg);
        top: 7.5px;
      }

      .d-none {
        display: none !important;
      }
      
  `;
  
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);


  let link1 = document.createElement('link');
  link1.rel = 'preconnect';
  link1.href = 'https://fonts.googleapis.com';
  let link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossorigin = "anonymous|use-credentials"
  let link3 = document.createElement('link');
  link3.rel = 'stylesheet';
  link3.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap';

  head.appendChild(link1);
  head.appendChild(link2);
  head.appendChild(link3);
  
  style.type = 'text/css';
  if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
//   **************** CSS
  



  const notificationDiv = document.createElement('div');
  notificationDiv.classList.add('notifications');
  document.body.appendChild(notificationDiv);

  var notificationEls_container = notificationDiv;
  var pushNotification = function (message, color) {
    var notificationEl = document.createElement("div");
    x_close = document.createElement("div");
    x_close.appendChild(document.createElement("div"));
    x_close.appendChild(document.createElement("div"));
    notificationEl.appendChild(x_close);
    notificationEl.appendChild(
      document.createElement("p").appendChild(document.createTextNode(message))
    );
    notificationEl.classList.add(color);
    notificationEls_container.appendChild(notificationEl);
    notificationEl.firstChild.addEventListener("click", function () {
      this.parentNode.classList.add("fading_out");
      setTimeout(function () {
        notificationEl?.parentNode.removeChild(notificationEl);
      }, 1000);
    });
    setTimeout(function () {
      notificationEl.parentNode.removeChild(notificationEl);
    }, 5000);
  };

  currentInputElement.parentNode.style.position = 'relative';
  
  currentInputElement.parentNode.appendChild(makeContainerElement);
  
  
  const receiverElement = document.getElementById('receiverElement');
  const receiverElementLabel = document.getElementById('receiverElementLabel');
  
  const phoneElement = document.getElementById('phoneElement');
  const phoneElementLabel = document.getElementById('phoneElementLabel');

  const senderElement = document.getElementById('senderElement');
  const senderElementLabel = document.getElementById('senderElementLabel');
  
  const amountElement = document.getElementById('amountElement');
  const amountElementLabel = document.getElementById('amountElementLabel');
  
  const passcodeElement = document.getElementById('passcodeElement');
  const passcodeElementLabel = document.getElementById('passcodeElementLabel');
  

//   receiver
  receiverElement.addEventListener('input', function() {
    state.receiver = receiverElement.value;

    if (receiverElement.value.length) {
      receiverElementLabel.parentNode.classList.remove('input-error');
      receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

      receiverElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        receiverElementLabel.parentNode.classList.add('input-error');
        receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        receiverElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
  });
  receiverElement.addEventListener('focus', function(event) { 
      receiverElementLabel.classList.add('label-focus');
      receiverElementLabel.parentNode.classList.add('input-focused');
        
    });
  receiverElement.addEventListener('blur', function(event) {
    if (!state.receiver.length) {
      receiverElementLabel.classList.remove('label-focus');
    }
    receiverElementLabel.parentNode.classList.remove('input-focused');
    state.receiver = event.target.value;

    if (event.target.value.length) {
        receiverElementLabel.parentNode.classList.remove('input-error');
        receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

        receiverElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        receiverElementLabel.parentNode.classList.add('input-error');
        receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        receiverElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }

  });
//   receiver end
  
//   phone
  phoneElement.addEventListener('input', function() { 
    state.phone = phoneElement.value;

    if (phoneElement.value.length) {
      phoneElementLabel.parentNode.classList.remove('input-error');
      phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

      phoneElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        phoneElementLabel.parentNode.classList.add('input-error');
        phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        phoneElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
  });
  phoneElement.addEventListener('focus', function() {
      phoneElementLabel.classList.add('label-focus')
      phoneElementLabel.parentNode.classList.add('input-focused');
    });
  phoneElement.addEventListener('blur', function(event) {
    if (!state.phone.length) {
      phoneElementLabel.classList.remove('label-focus')
    }
    phoneElementLabel.parentNode.classList.remove('input-focused');

    state.phone = event.target.value;

    if (event.target.value.length) {
        phoneElementLabel.parentNode.classList.remove('input-error');
        phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

        phoneElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        phoneElementLabel.parentNode.classList.add('input-error');
        phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        phoneElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
  });
// phone end

//   sender
senderElement.addEventListener('input', function() { 
  state.sender = senderElement.value; 
  if (senderElement.value.length) {
    senderElementLabel.parentNode.classList.remove('input-error');
    senderElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

    senderElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
  } else {
    senderElementLabel.parentNode.classList.add('input-error');
    senderElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

    senderElement.parentNode.querySelector('.check-icon').classList.add('d-none');
  }
});
senderElement.addEventListener('focus', function() {
    senderElementLabel.classList.add('label-focus')
    senderElementLabel.parentNode.classList.add('input-focused');
  });
  senderElement.addEventListener('blur', function(event) {
  if (!state.sender.length) {
    senderElementLabel.classList.remove('label-focus')
  }
  senderElementLabel.parentNode.classList.remove('input-focused');

  state.sender = event.target.value;

  if (event.target.value.length) {
    senderElementLabel.parentNode.classList.remove('input-error');
    senderElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

    senderElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
  } else {
    senderElementLabel.parentNode.classList.add('input-error');
    senderElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

    senderElement.parentNode.querySelector('.check-icon').classList.add('d-none');
  }
});
// sender end
  
// amount    
  amountElement.addEventListener('input', function() { 
    state.amount = amountElement.value;

    if (amountElement.value.length) {
      amountElementLabel.parentNode.classList.remove('input-error');
      amountElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

      amountElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        amountElementLabel.parentNode.classList.add('input-error');
        amountElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        amountElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
   });
  amountElement.addEventListener('focus', function() {
      amountElementLabel.classList.add('label-focus');
      amountElementLabel.parentNode.classList.add('input-focused');
    });
  amountElement.addEventListener('blur', function(event) {
    if (!state.amount.length) {
      amountElementLabel.classList.remove('label-focus')
    }
    amountElementLabel.parentNode.classList.remove('input-focused');
    state.amount = event.target.value;

    if (event.target.value.length) {
        amountElementLabel.parentNode.classList.remove('input-error');
        amountElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

        amountElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        amountElementLabel.parentNode.classList.add('input-error');
        amountElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        amountElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
  });
  // amount end   
  
  const approveBtn = document.getElementsByClassName('approve-btn')[0];
  const receiptBtn = document.getElementsByClassName('receipt-btn')[0];
  const logingenerateBtn = document.getElementsByClassName('logingenerate-btn')[0];

  passcodeElement.addEventListener('input', function() { 
    state.passcode = passcodeElement.value
    if (passcodeElement.value.length) {
      approveBtn.classList.add('btn-static');
      logingenerateBtn.classList.add('btn-static');

      passcodeElementLabel.parentNode.classList.remove('input-error');
      passcodeElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

      passcodeElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
      approveBtn.classList.remove('btn-static');
      logingenerateBtn.classList.remove('btn-static');

      passcodeElementLabel.parentNode.classList.add('input-error');
      passcodeElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

      passcodeElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
   });
  passcodeElement.addEventListener('focus', function() {
      passcodeElementLabel.classList.add('label-focus');
      passcodeElementLabel.parentNode.classList.add('input-focused');
    });
  passcodeElement.addEventListener('blur', function(event) {
    if (!state.passcode.length) {
      passcodeElementLabel.classList.remove('label-focus');
    }
    passcodeElementLabel.parentNode.classList.remove('input-focused');

    state.passcode = event.target.value;

    if (event.target.value.length) {
        passcodeElementLabel.parentNode.classList.remove('input-error');
        passcodeElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

        passcodeElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
        passcodeElementLabel.parentNode.classList.add('input-error');
        passcodeElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        passcodeElement.parentNode.querySelector('.check-icon').classList.add('d-none');
    }
  });  
  
  const tapFormContainer = document.getElementsByClassName('TaP-form-container')[0];
  const tapButton = document.getElementById('TaP-button');
  const tapButtonYellow = document.getElementById('TaP-button-yellow');
  const formBtn = document.getElementsByClassName('form-btn')[1];
  
  formBtn.addEventListener('click', function() {
    if (state.open) {
      tapButton.classList.remove('hidden-img');
      tapButtonYellow.classList.add('hidden-img');
  
      tapFormContainer.classList.add("hidden-form");
      tapFormContainer.classList.remove("visible-form");
  
      state.open = false;
    } else {
      tapButton.classList.add('hidden-img');
      tapButtonYellow.classList.remove('hidden-img');
  
      tapFormContainer.classList.remove("hidden-form");
      tapFormContainer.classList.add("visible-form");
  
      state.open = true;
    }
  });
  
  const sendBtn = document.getElementsByClassName('send-btn')[0];
  const formStepOneItems = document.getElementsByClassName('formstep-1');
  const formStepTwoItems = document.getElementsByClassName('formstep-2');
  
  sendBtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (!state.receiver.length || !state.phone.length || !state.amount.length) {
      pushNotification('Please fill all fields!', 'normal');
      return;
    }
  
    Array.prototype.forEach.call(formStepOneItems, element => {
      element.style.display = 'none';
    });
  
    Array.prototype.forEach.call(formStepTwoItems, element => {
      element.style.display = 'inline-flex';
    });

    logingenerateBtn.classList.add('d-none');
  });

  const generateBtn = document.getElementsByClassName('generate-btn')[0];

  generateBtn.addEventListener('click', function(event) {
    event.preventDefault();

    if (!state.receiver.length || !state.phone.length || !state.amount.length) {
      pushNotification('Please fill all fields!', 'normal');
      return;
    }

    Array.prototype.forEach.call(formStepOneItems, element => {
      element.style.display = 'none';
    });
  
    Array.prototype.forEach.call(formStepTwoItems, element => {
      element.style.display = 'inline-flex';
    });

    approveBtn.style.display = 'none';
    
  });

  logingenerateBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      body: JSON.stringify({
        phone: state.sender,
        password: state.passcode
      }),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    }

    fetch(`${state.appUrl}users/login`, options)
    .then(res => res.json())
    .then(loginData => {
      if (loginData.success) {
        console.log(loginData);
        state.authtoken = loginData?.data?.tokens.accessToken;

        const url = `${"https://link.textnpay.co/"}magic-link?sender=${encodeURIComponent(state.sender)}&receiver=${encodeURIComponent(state.phone)}&amount=${state.amount}&token=${state.authtoken}`;
        navigator.clipboard.writeText(url);
        logingenerateBtn.style.pointerEvents = 'none';
        pushNotification('Magic link was generated and copied', 'green');

        state = {
          open: false,
          receiver: '',
          phone: '',
          amount: '',
          sender: '',
          authtoken: '',
          passcode: '',
          formStep: 1,
          error: {
              type: '',
              message: ''
          },
          loginError: null
        }
      } else {
        pushNotification(loginData.error, 'red');
      }
    })
    .catch(err => {
      pushNotification(err, 'red');
    })
  });

  receiptBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const receiptUrl = `${state.receiptUrl}`;
    navigator.clipboard.writeText(receiptUrl);
    pushNotification(`Receipt URL was copied`, 'green');
  });


  receiverElement.addEventListener('keypress', function(event) {

    if (event.key === "Enter") {
      event.preventDefault();
      console.log(event.target.value);
      const options = {
        method: 'PATCH',
        body: JSON.stringify({
          name: event.target.value,
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
      }

      fetch(`${state.appUrl}users/existsname`, options)
      .then(res => res.json())
      .then(userData => { 
        if (userData.success && userData.data) {
          state.phone = userData.data.phone;
          state.receiver = userData.data.name;

          receiverElement.value = userData.data.name;
          phoneElement.value = userData.data.phone;
          phoneElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
          phoneElementLabel.classList.add('label-focus');
        } else {
          pushNotification('Contact dose not exist', 'normal');
        }
      })
      }
  });

  approveBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const options = {
      method: 'POST',
      body: JSON.stringify({
        phone: state.sender,
        password: state.passcode
      }),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    }

    fetch(`${state.appUrl}users/login`, options)
    .then(res => res.json())
    .then(loginData => {
      if (loginData.success) {
        console.log(loginData);
        state.authtoken = loginData?.data?.tokens.accessToken
       
  
        const trOptions = {
          method: 'POST',
          body: JSON.stringify({
            text: 'send',
            receiver: state.phone,
            card_id: '',
            amount: 5000,
          }),
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.authtoken}`
          })
        }
  
        fetch(`${state.appUrl}transactions`, trOptions)
          .then(res => res.json())
          .then(transactionData => {
            if (transactionData.success) {
              console.log(transactionData, 'transactionData');

              const approveTransactionOptions = {
                method: 'POST',
                body: JSON.stringify({
                  sticker: true
                }),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${state.authtoken}`
                })
              }

              const transactionId = transactionData.data.id;

              fetch(`${state.appUrl}transactions/${transactionId}/approve`, approveTransactionOptions)
                .then(res => res.json())
                .then(approvedTransactionData => {
                  if (approvedTransactionData.success) {

                    console.log(approvedTransactionData, 'approvedTransactionData');
                    approveBtn.innerHTML = "Approved and sent &nbsp; <img src='https://storage.cloud.google.com/textnpayme_files/checkicon.png?authuser=6' style={width: 17px} />";
                    approveBtn.style.pointerEvents = 'none';
                    receiptBtn.classList.remove('d-none');
                    
                    state.receiptUrl = approvedTransactionData.data.url;
                    pushNotification(`Transaction ${approvedTransactionData.data.transaction.id} successfully completed!`, 'green');
                  } else {
                    pushNotification(approvedTransactionData.error, 'red')
                  }
                }).catch(err => {
                  pushNotification(err, 'red')
                });
              

            } else {
              pushNotification(loginData.error, 'red');
            }
          }).catch(err => {
            console.log(err, 'err');
          })
      } else {
        state.loginError = loginData.error
        pushNotification(loginData.error, 'red');
      }

      console.log(state);

    }).catch(err => {
      console.log(err);

    })
  });