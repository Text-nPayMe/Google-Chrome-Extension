import {useState, useEffect} from 'react';
import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './App.css';

const initState = {
  phone: null,
  errors: {}
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

  const [mainState, setMainState] = useState(initState);

  // const useStyles = makeStyles({
  //   root: {
  //     // input label when focused
  //     "& label.Mui-focused": {
  //       color: focusedColor
  //     },
  //     // focused color for input with variant='standard'
  //     "& .MuiInput-underline:after": {
  //       borderBottomColor: focusedColor
  //     },
  //     // focused color for input with variant='filled'
  //     "& .MuiFilledInput-underline:after": {
  //       borderBottomColor: focusedColor
  //     },
  //     // focused color for input with variant='outlined'
  //     "& .MuiOutlinedInput-root": {
  //       "&.Mui-focused fieldset": {
  //         borderColor: focusedColor
  //       }
  //     }
  //   }
  // });

  const handleChange = (event) => {
    if (!event.target.value.length) {
      setMainState({
        ...mainState,
        [event.target.name]: event.target.value,
        errors: {
          ...mainState.errors,
          [`err${event.target.name}`]: true,
        }
      })
    } else {
      setMainState({
        ...mainState,
        [event.target.name]: event.target.value,
        errors: {
          ...mainState.errors,
          [`err${event.target.name}`]: false,
        }
      });
    }

  }
  // useEffect(() => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   // encrypt.setPublicKey($('#pub-key').val());
  //   // var phone = encrypt.encrypt("+37491142700");
  //   // var password = encrypt.encrypt("654321");
  //   var phone = "+37491142700";
  //   var password = "654321";
  //   var raw = JSON.stringify({"phone": phone,"password":password});

  //   var requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: 'follow'
  //   };

  //   fetch("http://localhost:3000/users/login", requestOptions)
  //   .then(response => response.text())
  //   .then(result => {
  //       if (result.success) {
  //           localStorage.setItem('TpM-user', result.data)
  //       }
  //       console.log(result.data)
  //       console.log(result.data.user)
  //   })
  //   .catch(error => console.log('error', error));

  //   return () => {
  //     console.log('unmount');
  //   }
  // }, [])

  const { phone } = mainState;

  const { errphone } = mainState.errors;

  return (
    <div className="App">
      <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            className={classes.root}
            name="phone"
            id="standard-basic" 
            label="Standard" 
            variant="standard"
            error={errphone}
            value={phone}
            helperText={errphone && "Incorrect entry."}
            onChange={handleChange} 
          />
        </Box>
    </div>
  );
}

export default App;
