import {useState, useEffect, forwardRef} from 'react';
import { makeStyles } from '@mui/styles';
import { JSEncrypt } from "jsencrypt";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './App.css';
import Login from './Login';
import SvgCheckIcon from './Vector.svg'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


var jsencryptConf = {
  "publicKey": "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB-----END PUBLIC KEY-----",
  "privateKey": "-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQABAoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fvxTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeHm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAFz/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIMV7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATeaTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5AzilpsLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Ozuku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876-----END RSA PRIVATE KEY-----"
}
// 'https://d-api.textnpay.co/',
// const appUrl = 'http://localhost:3000/';
const appUrl = 'https://d-api.textnpay.co/';

const initState = {
  phone: '',
  receiver: '',
  amount: '',
  login: '',
  password: '',
  showPassword: false,
  firstStep: true,
  isGenerateMagic: false,
  makeNewPayment: false,
  receptLink: null,
  receptLinkDisable: false,
  errors: {},
  blur: {},
}

const focusedColor = "orange";
const useStyles = makeStyles({
  root: {
    // input label when focused
    "& label.Mui-focused": {
      color: focusedColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: focusedColor
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: focusedColor
      }
    }
  }
});

function App() {
  const classes = useStyles();
  var encrypt = new JSEncrypt();
  var decrypt = new JSEncrypt();

  encrypt.setPublicKey(jsencryptConf.publicKey);
  decrypt.setPrivateKey(jsencryptConf.privateKey);


  const [mainState, setMainState] = useState(initState);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [paymentFinished, setPaymentFinished] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    type: 'error'
  });


  const handleChange = (event) => {
      setMainState({
        ...mainState,
        [event.target.name]: event.target.value,
        errors: {
          ...mainState.errors,
          [`err${event.target.name}`]: !event.target.value.length,
        }
      });

  }

  const handleClickShowPassword = () => {
    setMainState({
      ...mainState,
      showPassword: !mainState.showPassword,
    });
  };

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const checkUserExist = (event) => {
    console.log(event, 'event');
    if (event.key === "Enter") {

      var options = {
        method: 'PATCH',
        body: JSON.stringify({
          name: event.target.value,
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
      }

      fetch(`${appUrl}users/existsname`, options)
      .then(res => res.json())
      .then(userData => {
        if (userData.success && Object.keys(userData.data).length) {
          setMainState({
            ...mainState,
            receiver: userData.data.name,
            phone: userData.data.phone,
            blur: {
              blphone: true
            }
          })
        } else {
          setNotification({
            ...notification,
            open: true,
            message: 'User not found!',
            type: 'error',
          });
        }
      })
    }

  }

  const handleSubmitPayment = () => {
    const { login, password } = mainState;
    if (!login || !password) {
      setNotification({
        ...notification,
        open: true,
        message: 'Please fill all fields!',
        type: 'warning',
      });
      return
    }


    let loginHash = encrypt.encrypt(mainState.login);
    let passwordHash = encrypt.encrypt(mainState.password);

    var options = {
      method: 'POST',
      body: JSON.stringify({
        phone: loginHash || mainState.login,
        password: passwordHash || mainState.password
      }),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    }

    fetch(`${appUrl}users/login`, options)
    .then(res => res.json())
    .then(loginData => {
      if (loginData.success) {
        let authtoken = loginData?.data?.tokens.accessToken

        encrypt.setPublicKey(jsencryptConf.publicKey);
        var text = encrypt.encrypt('send');
        var receiver = encrypt.encrypt(mainState.phone);
        var amount = encrypt.encrypt(mainState.amount);

        var trOptions = {
          method: 'POST',
          body: JSON.stringify({
            text: text || 'send',
            receiver: receiver || mainState.phone,
            card_id: '',
            amount: amount || mainState.amount,
          }),
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authtoken}`
          })
        }

        fetch(`${appUrl}transactions`, trOptions)
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
                  'Authorization': `Bearer ${authtoken}`
                })
              }

              var transactionId = transactionData.data.id;

              fetch(`${appUrl}transactions/${transactionId}/approve`, approveTransactionOptions)
                .then(res => res.json())
                .then(approvedTransactionData => {
                  if (approvedTransactionData.success) {
                    setPaymentFinished(true)
                    setNotification({
                      ...notification,
                      open: true,
                      message: 'Transaction successfully completed!',
                      type: 'success'
                    });
                    setMainState({
                      ...mainState,
                      receptLink: approvedTransactionData.data.url
                    })
                  } else {
                    setNotification({
                      ...notification,
                      open: true,
                      message: approvedTransactionData.error,
                      type: 'error'
                    });
                  }
                })
                .catch(err => {
                  console.log(err, 'err');
                })
              } else {
                setNotification({
                  ...notification,
                  open: true,
                  message: transactionData.error,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              console.log(err, 'errrr');
            })
          } else {
            setNotification({
              ...notification,
              open: true,
              message: 'Wrong password!',
              type: 'error'
            });
          }
        })
        .catch(err => {
          console.log(err, 'errrrrr');
        })


  }

  const handleLoginAndGenerate = (shouldGenerateLink = false) => {
    const { login, password } = mainState;
    if (!login || !password) {
      setNotification({
        ...notification,
        open: true,
        message: 'Please fill all fields!',
        type: 'warning',
      });
      return
    }

    encrypt.setPublicKey(jsencryptConf.publicKey);
    let loginHash = encrypt.encrypt(mainState.login);
    let passwordHash = encrypt.encrypt(mainState.password);

    let options = {
      method: 'POST',
      body: JSON.stringify({
        phone: loginHash || mainState.login,
        password: passwordHash || mainState.password
      }),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    }

    fetch(`${appUrl}users/login`, options)
      .then(res => res.json())
      .then(loginData => {
        let authtoken = loginData?.data?.tokens.accessToken
        if (loginData.success) {
          // localStorage.setItem('TpM-user', JSON.stringify({
          //     ...loginData.data.user,
          //     authtoken: loginData.data.tokens.accessToken
          // }));
          const encryptedLocalData = encrypt.encrypt(loginData.data.user.phone)
          localStorage.setItem('TpM-user', JSON.stringify({
            user: encryptedLocalData
          }))

          setMainState({
            ...mainState,
            login: '',
            password: '',
            blur: {}
          })

          if (shouldGenerateLink) {
            var url = `${"https://link.textnpay.co/"}magic-link?token=${authtoken}&sender=${encodeURIComponent(mainState.phone)}&receiver=${encodeURIComponent(mainState.login)}&amount=${mainState.amount}&user=${loginData?.data?.user.id}`;
            navigator.clipboard.writeText(url);

            setNotification({
              ...notification,
              open: true,
              message: 'Magic link was generated and copied!',
              type: 'success'
            });
            setPaymentFinished(true);
          } else {
            setNotification({
              ...notification,
              open: true,
              message: "You are successfully logged in!",
              type: 'success'
            });

            setCurrentUser(loginData.data.user);

            setOpenLoginForm(false);
          }

        }  else {
          setNotification({
            ...notification,
            open: true,
            message: 'Wrong password!',
            type: 'error'
          });
        }
      })
      .catch(err => {
        console.log(err, 'err');
        setNotification({
          ...notification,
          open: true,
          message: 'Something went wrong!',
          type: 'error',
        });
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('TpM-user');
    setCurrentUser(null);
    setPaymentFinished(false);
    setMainState(initState)
    setOpenLoginForm(false)
  }

  const changeStepAndValidate = (event) => {
    event.preventDefault();
    const { phone, receiver, amount, loggedIn } = mainState;
    if (!phone || !receiver || !amount) {
      setNotification({
        ...notification,
        open: true,
        message: 'Please fill all fields!',
        type: 'warning',
      });

      return
    }

    if (loggedIn) {
      return
    }

    setMainState({
      ...mainState,
      firstStep: false
    });
  }

  const changeStepGenAndValidate = (event) => {
    event.preventDefault();

    const { amount } = mainState;
    if (!amount) {
      setNotification({
        ...notification,
        open: true,
        message: 'Please fill amount for the next step!',
        type: 'warning',
      });

      return
    }

    setMainState({
      ...mainState,
      firstStep: false,
      isGenerateMagic: true,
    })
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('TpM-user'));
    if (items) {
      setCurrentUser(items);
    }

    return () => {
      setMainState(initState);
    }
  }, []);

  const handleMakePaymentBtn = () => {
    setMainState({
      ...mainState,
      makeNewPayment: !mainState.makeNewPayment,
    })
    
  }

  const handleCopyReceiptLink = (event) => {
    event.preventDefault();
    var receiptUrl = `${mainState.receptLink}`;
    navigator.clipboard.writeText(receiptUrl);
    setNotification({
      ...notification,
      open: true,
      message: 'Receipt URL was copied!',
      type: 'success',
    });
    setMainState({
      ...mainState,
      receptLinkDisable: true
    })
  }

  const handleMakeNewPayment = () => {
    setMainState(initState);
    setPaymentFinished(false)
  }

  const { phone, receiver, amount, login, password, showPassword, firstStep, isGenerateMagic, makeNewPayment, receptLink, receptLinkDisable } = mainState;

  const { errphone, errreceiver, erramount, errlogin, errpassword } = mainState.errors;
  const { blphone, blreceiver, blamount, bllogin, blpassword } = mainState.blur;
  const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

  const onBlur = (event) => {
    setMainState({
      ...mainState,
      blur: {
        ...mainState.blur,
        [`bl${event.target.name}`]: Boolean(event.target.value.length)
      }
    });
  }

  return (
    <div className="App">
          <Box
            component="div"
            noValidate
            autoComplete="off"
            className="form-container"
          >
            {
              currentUser ? (
                <>
                  <div className="form-container-logged-in">
                    { (currentUser.name && currentUser.surname) ? `${currentUser.name} ${currentUser.surname}` : "You're logged in" }
                    <a href='#' onClick={handleLogout}>Logout</a>
                  </div>
                  {
                    makeNewPayment ? (
                      <a href='#' onClick={handleMakePaymentBtn} align="center">Close Payment Form</a>
                    ) : (
                      <Button
                        variant="contained"
                        className="btn-base"
                        onClick={handleMakePaymentBtn}
                      >
                        Make a Payment
                      </Button>
                    )
                  }
                  
                </>
              ) : (
                <>
                  <div>You are not logged in!</div>
                  <a href="https://textnpay.co/signup" target="_blank" className="register-btn">
                    <Button
                        variant="contained"
                        className="btn-base"
                    >
                      Register
                    </Button>
                  </a>

                  {
                    openLoginForm ? (
                      <a href="#" onClick={() => setOpenLoginForm(false)} align="center">
                        Close
                      </a>
                    ) : (
                      <Button
                        variant="contained"
                        className="btn-base"
                        onClick={() => {
                          setOpenLoginForm(true)
                        }}
                      >
                        Login
                      </Button>
                    )
                  }

                  
                </>
              )
            }

            {
              openLoginForm ? (
                    <>
                      <TextField
                          className={classes.root}
                          name="login"
                          id="standard-basic"
                          label="Username"
                          variant="standard"
                          error={errlogin}
                          value={login}
                          helperText={errlogin && "Please Enter login."}
                          onChange={handleChange}
                          onBlur={onBlur}
                          InputProps={{
                            endAdornment: bllogin && (
                              <InputAdornment position="start">
                                <img src={SvgCheckIcon} />
                              </InputAdornment>
                            ),
                          }}
                      />

                      <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            className={classes.root}
                            name="password"
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange}
                            onBlur={onBlur}
                            endAdornment={
                              <>
                                <InputAdornment position="end">
                                  <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      // onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                               {blpassword && (
                                  <InputAdornment position="start">
                                    <img src={SvgCheckIcon} />
                                  </InputAdornment>
                                )}
                              </>
                            }
                        />
                        {errpassword && <FormHelperText id="component-error-text">Please Enter password.</FormHelperText>}
                      </FormControl>

                      <Button
                          variant="contained"
                          className={`${login.length && password.length ? 'btn-base' : 'btn-white'} upper`}
                          onClick={() => handleLoginAndGenerate()}
                      >
                        Login
                      </Button>
                    </>
              ) : null
            }

            {
              makeNewPayment ? (
                <>
                  {
                    firstStep ? (
                      <>
                        <TextField
                          className={classes.root}
                          name="receiver"
                          id="standard-basic"
                          label="Receiver Name"
                          variant="standard"
                          error={errreceiver}
                          value={receiver}
                          helperText={errreceiver && "Please Enter receiver name."}
                          onChange={handleChange}
                          onKeyDown={checkUserExist}
                          onBlur={onBlur}
                          InputProps={{
                            endAdornment: blreceiver && (
                              <InputAdornment position="start">
                                <img src={SvgCheckIcon} />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          className={classes.root}
                          name="phone"
                          id="standard-basic"
                          label="Phone"
                          variant="standard"
                          error={errphone}
                          value={phone}
                          helperText={errphone && "Please Enter receiver phone."}
                          onChange={handleChange}
                          onBlur={onBlur}
                          InputProps={{
                            endAdornment: blphone && (
                              <InputAdornment position="start">
                                <img src={SvgCheckIcon} />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <TextField
                          className={classes.root}
                          name="amount"
                          id="standard-basic"
                          label="Amount"
                          type="number"
                          variant="standard"
                          error={erramount}
                          value={amount}
                          helperText={erramount && "Please Enter amount."}
                          onChange={handleChange}
                          onBlur={onBlur}
                          InputProps={{
                            endAdornment: blamount && (
                              <InputAdornment position="start">
                                <img src={SvgCheckIcon} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Button variant="contained" className="btn-base" onClick={changeStepAndValidate}>Send</Button>
                        <Button variant="contained" className="btn-white" onClick={changeStepGenAndValidate}>Generate a magic link</Button>
                      </>
                    ) : null
                  }

                  {/* Login part */}
                  {
                    !firstStep ? (
                      <>
                        <TextField
                          className={classes.root}
                          name="login"
                          id="standard-basic"
                          label="Username"
                          variant="standard"
                          error={errlogin}
                          value={login}
                          helperText={errlogin && "Please Enter login."}
                          onChange={handleChange}
                          onBlur={onBlur}
                          InputProps={{
                            endAdornment: bllogin && (
                              <InputAdornment position="start">
                                <img src={SvgCheckIcon} />
                              </InputAdornment>
                            ),
                          }}
                        />

                        <FormControl variant="standard">
                          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                          <Input
                            name="password"
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleChange}
                            onBlur={onBlur}
                            endAdornment={
                              <>
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                                {blpassword && (
                                  <InputAdornment position="start">
                                    <img src={SvgCheckIcon} />
                                  </InputAdornment>
                                )}
                              </>

                            }
                          />
                          {errpassword && <FormHelperText id="component-error-text">Please Enter password.</FormHelperText>}
                        </FormControl>
                        {
                          isGenerateMagic ? (
                            <Button
                              disabled={paymentFinished}
                              variant="contained"
                              className={`${login.length && password.length ? 'btn-base' : 'btn-white'} upper generate-btn`}
                              onClick={() => handleLoginAndGenerate(true)}
                            >
                              Login and generate a magic link
                              {paymentFinished && <img src={SvgCheckIcon} />}
                            </Button>
                          ) : (
                            <Button
                              disabled={paymentFinished}
                              variant="contained"
                              className={`${login.length && password.length ? 'btn-base' : 'btn-white'} d-flex-jc`}
                              onClick={handleSubmitPayment}
                            >
                              Approve the payment
                              {paymentFinished && <img src={SvgCheckIcon} />}
                            </Button>
                          )

                        }

                        {
                          paymentFinished ? (
                            <>
                              {
                                !isGenerateMagic ? (
                                  <Button
                                    variant="contained"
                                    className={'btn-white d-flex-jc'}
                                    onClick={handleCopyReceiptLink}
                                  >
                                    Copy the payment receipt link
                                    {Boolean(receptLinkDisable) && <img src={SvgCheckIcon} />}
                                  </Button>
                                ) : null
                              }
                              <Button
                                variant="contained"
                                className={'btn-white'}
                                onClick={handleMakeNewPayment}
                              >
                                Make a new payment
                              </Button>
                            </>
              
                          ) : null
                        }

                      </>
                    ) : null
                  }
                </>
              ) : null
            }


          </Box>


        <Snackbar
          anchorOrigin={{ vertical: notification.vertical, horizontal: notification.horizontal }}
          open={notification.open}
          onClose={handleClose}
          message={notification.message}
          key={notification.vertical + notification.horizontal}
        >
          <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
    </div>
  );
}

export default App;
