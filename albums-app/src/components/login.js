import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";

function LoginPopup({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Email" type="email" variant="outlined" />
        <TextField fullWidth margin="dense" label="Password" type="password" variant="outlined" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="black">Cancel</Button>
        <Button variant="contained" color="red">Login</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginPopup;
