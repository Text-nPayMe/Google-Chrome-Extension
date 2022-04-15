let currentInputElement = document.getElementsByTagName('input')[0];

let isExist = document.querySelector('[aria-label="Message"]');

var svgCheckIcon = `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"  class='check-icon d-none'>
<path d="M6.00016 11.1701L1.83016 7.00009L0.410156 8.41009L6.00016 14.0001L18.0002 2.00009L16.5902 0.590088L6.00016 11.1701Z" fill="#4CAF50"/>
</svg>
`

var passShow = `<svg id="TaP-passShowElem" class="hidden-img MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityIcon"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>`
var passHidden = `<svg id="TaP-passHiddenElem" class="  MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityOffIcon"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>`

if (isExist) {
  currentInputElement = isExist
}


var notificationDiv = document.createElement('div');
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



document.addEventListener('focusin', onFocusIn);



function onFocusIn(event) {
    var el = event.target;
    // console.log(el.getAttribute('aria-label'));
    // document.body.innerHTML = el
    if ( 
          (el.matches('div') && el.getAttribute('aria-label') === 'Message')
          || (el.matches('input') && el.getAttribute('aria-label') === 'Message')
          || (el.matches('input') && el.getAttribute('aria-label') === 'Search' && el.type.match(/email|number|search|text|url/))
          || (el.matches('input') && el.id == 'input')
          || (el.matches('div') && (el.getAttribute('title') === 'Type a message' || el.getAttribute('title') ===  'Введите сообщение'))
      
          // || el.matches('input, textarea') && el.type.match(/email|number|search|text|url/)
      // ||  el.matches('input, textarea') && el.type.match(/email|number|search|text|url/)
      )
    {
      currentInputElement = el
      console.log(currentInputElement, 'currentInputElement');

      var hasGrammerlyElement = currentInputElement.parentNode.getElementsByTagName('grammarly-extension');
      // var a = children.filter(el => el.tagName === 'GRAMMARLY-EXTENSION')

      // changeable DIV element change event lister
      if (currentInputElement.tagName === 'DIV') {
        // var hasChild = document.querySelectorAll('#xyz div')
        
        currentInputElement.addEventListener('keyup', function (event) {
          if (/((send) ([1-9][0-9]+|[1-9])( |)(dram|amd|֏) (to))|((ուղարկել|փոխանցել|ղրգել|ղարգել) ([1-9][0-9]+|[1-9])( |)(դրամ|֏))|((отправить) ([1-9][0-9]+|[1-9])( |)(драм|֏|драммов))/.test(event.target.textContent)) {


            
                // makeContainerElement.style.display = 'block';
                appendButton(el);
                var exist = document.getElementsByClassName('TaP-current-button-container')[0];
                   
                if (hasGrammerlyElement && hasGrammerlyElement[0]) {
                  exist.style.right = '20px';
                }

                exist.style.display = 'block'

                domRect = exist.getBoundingClientRect();
                var formContainer = document.getElementsByClassName('TaP-container')[0]
                var formFormContainer = document.getElementsByClassName('TaP-container ')[0]
                
                var tapButtonYellow = document.getElementById('TaP-buttonevent-yellow');

                if (domRect) {
                  var sidearrow = document.getElementById('sidearrow');

                  if (domRect.top < 200) {
                    if (sidearrow) {
                      sidearrow.classList.remove('_1oFOe');
                      sidearrow.classList.add('_1oFOa');
                    }

                    formContainer.style.top = `${domRect.top + 7}px`;
                    formContainer.style.left = `${domRect.left + 25}px`;
                    formContainer.style.right = 'initial'
                  }
                  else if (domRect.top > 200) {
                    if (sidearrow) {
                      sidearrow.classList.add('_1oFOe');
                      sidearrow.classList.remove('_1oFOa');
                    }
            

                    formContainer.style.transform = 'translate(-100%, -100%)';

                    // formContainer.style.top = `${domRect.top - (formFormContainer.firstElementChild.clientHeight + 20)}px`;
                    // formContainer.style.left = `${domRect.left - (formContainer.firstElementChild.offsetWidth + 50)}px`;

                    formContainer.style.top = `${domRect.top + 14}px`
                    formContainer.style.left = `${domRect.left + 7}px`
                    formContainer.style.right = 'initial'
                  }
                  // else if (domRect.bottom < 200) {
                  //   formContainer.style.top = `${domRect.top - formContainer.offsetHeight}px`;
                  //   formContainer.style.left = `${domRect.left}px`;
                  // }
                }


          }   else {
            var exist = document.getElementsByClassName('TaP-current-button-container')[0];

            if (exist) {
              exist.style.display = 'none'
            }
            // console.log('display none');
            // makeContainerElement.style.display = 'none';
          }
        });
      }

      // changeable INPUT element change event lister
      if (currentInputElement.tagName === 'INPUT') {
        // console.log('input tag changes');
        currentInputElement.addEventListener('input', function(event) {
          // console.log(event.target.value, 'event');
          // console.log(event.target.value, 'event');
          if (/((send) ([1-9][0-9]+|[1-9])( |)(dram|amd|֏) (to))|((ուղարկել|փոխանցել|ղրգել|ղարգել) ([1-9][0-9]+|[1-9])( |)(դրամ|֏))|((отправить) ([1-9][0-9]+|[1-9])( |)(драм|֏|драммов))/.test(event.target.value)) {
          // if (true) {
              appendButton(el);

              var str = event.target.value;
              var getAmount = str.split(/ուղարկել|փոխանցել|ղրգել|ղարգել|send/)[1]
              if (getAmount) {


                var amountElement = document.getElementById('amountElement');
                var amountElementLabel = document.getElementById('amountElementLabel');

                getAmount = getAmount.replace(/\D/g, "");

                if (amountElement) {
                  state.amount = getAmount;
                  amountElement.value = getAmount;
                  amountElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
                  amountElementLabel.classList.add('label-focus');
      
                  amountElementLabel.parentNode.classList.remove('input-error');
                  amountElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';
                }
              }

              

              var getReceiver = str.split(/to|դեպի/)[1]

              if (getReceiver) {
                var receiverElement = document.getElementById('receiverElement');
                var receiverElementLabel = document.getElementById('receiverElementLabel');  

                var phoneElement = document.getElementById('phoneElement');
                var phoneElementLabel = document.getElementById('phoneElementLabel');


                // if (phoneElement) {
                //   phoneElement.value = getAmount;
                //   phoneElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
                //   phoneElementLabel.classList.add('label-focus');
      
                //   phoneElementLabel.parentNode.classList.remove('input-error');
                //   phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';
                // }

                if (receiverElement) {
                  receiverElement.value = getReceiver;
                  receiverElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
                  receiverElementLabel.classList.add('label-focus');
      
                  receiverElementLabel.parentNode.classList.remove('input-error');
                  receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';
                }
              }

              var exist = document.getElementsByClassName('TaP-current-button-container')[0];
              exist.style.display = 'block'
      
              domRect = exist.getBoundingClientRect();
              var formContainer = document.getElementsByClassName('TaP-container')[0]

              if (domRect) {
                var sidearrow = document.getElementById('sidearrow');
                if (domRect.top < 200) {
                  if (sidearrow) {
                    sidearrow.classList.remove('_1oFOe');
                    sidearrow.classList.add('_1oFOa');
                  }
      
                  formContainer.style.top = `${domRect.top + 7}px`;
                  formContainer.style.left = `${domRect.left + 25}px`;
                  formContainer.style.right = 'initial'
                }
                else if (domRect.top > 200) {
                  if (sidearrow) {
                    sidearrow.classList.add('_1oFOe');
                    sidearrow.classList.remove('_1oFOa');
                  }
        
      
                  formContainer.style.transform = 'translate(-100%, -100%)';
      
                  formContainer.style.top = `${domRect.top + 14}px`
                  formContainer.style.left = `${domRect.left + 7}px`
                  formContainer.style.right = 'initial'
                }
              }
          } else {
            var exist = document.getElementsByClassName('TaP-current-button-container')[0];

            if (exist) {
              exist.style.display = 'none'
            }
          }
        });
      }
        
    }
}


function appendButton(textElement) {
    var exist = document.getElementById('TaP-container');

    if (!exist) {
      textElement.parentNode.style.position = 'relative';
      textElement.parentNode.style.overflow = 'initial';

      var isExistFormButton = document.getElementById('TaP-button-yellow');
      if (isExistFormButton) return false

      textElement.parentNode.appendChild(createFormAndMainButton());
      
      addMainFunctionality()
    }
}


// State and main

  var state = {
      open: false,
      cloudImagesUrl: `https://i.ibb.co/`,
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
      loginError: null,
      passcodeVisible: false
  }
    
function createFormAndMainButton() {
    var makeContainerElement = document.createElement('div');
    makeContainerElement.classList.add('TaP-container');
    makeContainerElement.classList.add('hidden-form');
    makeContainerElement.setAttribute('id', 'TaP-container')
    
    
  // **************** HTML
    // h
    makeContainerElement.innerHTML = `
        <div class="_1oFOe" id="sidearrow">▲</div>
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
                    ${svgCheckIcon}
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
                    ${svgCheckIcon}
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
                    ${svgCheckIcon}
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
                    ${svgCheckIcon}
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
                    <div class="TaP-passcode-button-container" id="TaP-passCodeVisibleBtn">
                      ${passShow}
                      ${passHidden}
                    </div>
                    ${svgCheckIcon}
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

            <button class="TaP-button btn-white reset-btn formstep-2 d-none">
              Make a new payment
            </button>
        </form>
    `

    var curElemBtn = document.createElement('div')
    curElemBtn.classList.add('TaP-current-button-container')
    curElemBtn.innerHTML = `
      <img src="https://i.ibb.co/FqfmmKT/white-logo.png" alt="logo" id="TaP-button" class="TaP-form-btn" style="width: 100%; height: 100%" />
      <img src="https://i.ibb.co/BKJ6y4M/yello-logo.png" alt="logo" id="TaP-button-yellow" class="TaP-form-btn hidden-img" style="width: 100%; height: 100%"/>
  `
    // **************** END HTML
    // makeContainerElement.style.display = 'none';

 
 // **************** CSS
  var css = `
        .TaP-container {
            height: min-content;
            position: absolute;
            right: 0;
            top: -5px;
            z-index: 1110;
        }

        ._1oFOe {
          position: absolute;
          left: 333px;
          bottom: 15px;
          transform: rotate(-30deg) scale(1.7);
          color: #fff;
          display: none;
        }

        ._1oFOa {
          position: absolute;
          left: -14px;
          top: 14px;
          transform: rotate(-90deg) scale(1.7);
          color: #fff;
          opacity: 0;
        }

        .TaP-current-button-container {
          right: 0;
          top: 0px;
          z-index: 1110;
          position: absolute;
          width: 30px;
          height: 30px;
          z-index: 1112;

          cursor: pointer;
        }

        .TaP-current-button-container img{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .TaP-passcode-button-container {
          position: absolute;
          right: 25px;
          width: 22px;
          height: 100%;
          top: 5px;
        }

        .TaP-passcode-button-container svg {
          position: absolute;
          top: 0;
          left: 0;
        }

        .check-icon {
          width: 17px;
          position: absolute;
          right: 0;
        }

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px white inset !important;
        }

        .MuiSvgIcon-root {
          user-select: none;
          width: 1em !important;
          height: 1em !important;
          display: inline-block;
          fill: currentcolor;
          flex-shrink: 0;
          transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          font-size: 1.5rem;
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
    
        .TaP-container {
            position: absolute;
            ${currentInputElement.getBoundingClientRect().top <= 357 
              ? 'top: 18px;'
              : 'bottom: 18px;' 
            }
            left: 15px;
    
            box-sizing: border-box;
            width: 340px;
            min-height: 170px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding: 25px 35px 15px 35px;
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
            width: 100%;
            margin-bottom: 9px;
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

        .reset-btn {
          font-size: 15px !important;
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

            border: 0;
        }

        body div .btn-static:hover {
          background: linear-gradient(0deg, rgba(241, 241, 241, 0.16), rgba(241, 241, 241, 0.16)), #FFAC30;
        }
    
        .btn-white {
            background-color: #FFFFFF;
            border: 1px solid rgba(26, 26, 26, 0.42);
        }
        .btn-white:hover {
          background-color: #1a1a1a0d;
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
    
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
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
  link3.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap';

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
  

  // document.body.appendChild(makeContainerElement)
  document.body.appendChild(makeContainerElement)


  return curElemBtn
}
    

    
  function addMainFunctionality () {
    var specifiedElement = document.getElementById('TaP-container');

    var receiverElement = document.getElementById('receiverElement');
    var receiverElementLabel = document.getElementById('receiverElementLabel');
    
    var phoneElement = document.getElementById('phoneElement');
    var phoneElementLabel = document.getElementById('phoneElementLabel');

    var senderElement = document.getElementById('senderElement');
    var senderElementLabel = document.getElementById('senderElementLabel');
    
    var amountElement = document.getElementById('amountElement');
    var amountElementLabel = document.getElementById('amountElementLabel');
    
    var passcodeElement = document.getElementById('passcodeElement');
    var passcodeElementLabel = document.getElementById('passcodeElementLabel');
    

  //   receiver
    receiverElement.addEventListener('input', function() {
      state.receiver = receiverElement.value;

      if (receiverElement.value.length) {
        receiverElementLabel.parentNode.classList.remove('input-error');
        receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

        // receiverElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
      } else {
          receiverElementLabel.parentNode.classList.add('input-error');
          receiverElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

          // receiverElement.parentNode.querySelector('.check-icon').classList.add('d-none');
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

        // phoneElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
      } else {
          phoneElementLabel.parentNode.classList.add('input-error');
          phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

          // phoneElement.parentNode.querySelector('.check-icon').classList.add('d-none');
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

      // senderElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
    } else {
      senderElementLabel.parentNode.classList.add('input-error');
      senderElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

      // senderElement.parentNode.querySelector('.check-icon').classList.add('d-none');
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

        // amountElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
      } else {
          amountElementLabel.parentNode.classList.add('input-error');
          amountElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

          // amountElement.parentNode.querySelector('.check-icon').classList.add('d-none');
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
    
    var approveBtn = document.getElementsByClassName('approve-btn')[0];
    var receiptBtn = document.getElementsByClassName('receipt-btn')[0];
    var resetBtn = document.getElementsByClassName('reset-btn')[0];
    var logingenerateBtn = document.getElementsByClassName('logingenerate-btn')[0];

    passcodeElement.addEventListener('input', function() { 
      state.passcode = passcodeElement.value
      if (passcodeElement.value.length) {
        approveBtn.classList.add('btn-static');
        logingenerateBtn.classList.add('btn-static');

        passcodeElementLabel.parentNode.classList.remove('input-error');
        passcodeElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';

        // passcodeElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
      } else {
        approveBtn.classList.remove('btn-static');
        logingenerateBtn.classList.remove('btn-static');

        passcodeElementLabel.parentNode.classList.add('input-error');
        passcodeElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '1';

        // passcodeElement.parentNode.querySelector('.check-icon').classList.add('d-none');
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


    
    var tapFormContainer = document.getElementsByClassName('TaP-container')[0];
    var tapButton = document.getElementById('TaP-button');
    var tapButtonYellow = document.getElementById('TaP-button-yellow');



    // var formBtn = document.getElementsByClassName('TaP-form-btn')[1];
    // console.log(tapButtonYellow, 'tapButtonYellow');
    tapButtonYellow.parentNode.addEventListener('click', function() {
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

    var passCodeVisibleBtn = document.getElementById('TaP-passCodeVisibleBtn');
    var passShowElem = document.getElementById('TaP-passShowElem');
    var passHiddenElem = document.getElementById('TaP-passHiddenElem');

    passCodeVisibleBtn.addEventListener('click', function() {
      if (state.passcodeVisible) {
        passShowElem.classList.remove('hidden-img');
        passHiddenElem.classList.add('hidden-img');
        passcodeElement.setAttribute('type', 'text');
        state.passcodeVisible = false;
      } else {
        passShowElem.classList.add('hidden-img');
        passHiddenElem.classList.remove('hidden-img');
        passcodeElement.setAttribute('type', 'password');
        state.passcodeVisible = true;
      }
    });

    
    var sendBtn = document.getElementsByClassName('send-btn')[0];
    var formStepOneItems = document.getElementsByClassName('formstep-1');
    var formStepTwoItems = document.getElementsByClassName('formstep-2');
    
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

    var generateBtn = document.getElementsByClassName('generate-btn')[0];

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
      var options = {
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

          var url = `${"https://link.textnpay.co/"}magic-link?sender=${encodeURIComponent(state.sender)}&receiver=${encodeURIComponent(state.phone)}&amount=${state.amount}&token=${state.authtoken}`;
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
        console.error(err);
        // pushNotification(err, 'red');
      })
    });

    receiptBtn.addEventListener('click', function(event) {
      event.preventDefault();
      var receiptUrl = `${state.receiptUrl}`;
      navigator.clipboard.writeText(receiptUrl);
      receiptBtn.innerHTML = "Copy the payment receipt link&nbsp; <img src='https://i.ibb.co/xsnnDCr/check.png' style={width: 17px} />"

      pushNotification(`Receipt URL was copied`, 'green');
    });


    receiverElement.addEventListener('keypress', function(event) {

      if (event.key === "Enter") {
        event.preventDefault();
        console.log(event.target.value);
        var options = {
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
          if (userData.success && Object.keys(userData.data).length) {
            state.phone = userData.data.phone;
            state.receiver = userData.data.name;

            receiverElement.value = userData.data.name;
            phoneElement.value = userData.data.phone;
            phoneElement.parentNode.querySelector('.check-icon').classList.remove('d-none');
            phoneElementLabel.classList.add('label-focus');

            phoneElementLabel.parentNode.classList.remove('input-error');
            phoneElementLabel.parentNode.getElementsByClassName('error-message')[0].style.opacity = '0';
          } else {
            pushNotification('Contact dose not exist', 'normal');
          }
        })
        }
    });

    approveBtn.addEventListener('click', function(event) {
      event.preventDefault();

      var options = {
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
        
    
          var trOptions = {
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

                var approveTransactionOptions = {
                  method: 'POST',
                  body: JSON.stringify({
                    sticker: true
                  }),
                  headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.authtoken}`
                  })
                }

                var transactionId = transactionData.data.id;

                fetch(`${state.appUrl}transactions/${transactionId}/approve`, approveTransactionOptions)
                  .then(res => res.json())
                  .then(approvedTransactionData => {
                    if (approvedTransactionData.success) {

                      console.log(approvedTransactionData, 'approvedTransactionData');
                      approveBtn.innerHTML = "Approved and sent &nbsp; <img src='https://i.ibb.co/xsnnDCr/check.png' style={width: 17px} />";
                      approveBtn.style.pointerEvents = 'none';
                      receiptBtn.classList.remove('d-none');
                      resetBtn.classList.remove('d-none');
                      
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



    // handle clock outside

    var exist = document.getElementsByClassName('TaP-current-button-container')[0];

    //I'm using "click" but it works with any event
    document.addEventListener('click', function(event) {
      var isClickInside = specifiedElement.contains(event.target);
      var isClickInsideBtn = exist.contains(event.target);
      if (!isClickInside && !isClickInsideBtn) {
        if (specifiedElement.classList.contains('visible-form')) {
          tapButtonYellow.click()
        }
      }
    });

    }

