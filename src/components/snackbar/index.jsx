import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({open ,toggle ,severity , eror}) {

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

   toggle()
  };

  return (
    <div>
     
      <Snackbar open={open} autoHideDuration={3000} onClose={toggle}>
        <Alert
          onClose={toggle}  
          severity={severity}
          variant="filled"
          sx={{width: '100%' }}
          anchorOrigin={{vertical:'top' , horizontal:'center'}}
        >
          {eror}
          This is a success Alert inside a Snackbar!

        </Alert>
      </Snackbar>
    </div>
  );
}
