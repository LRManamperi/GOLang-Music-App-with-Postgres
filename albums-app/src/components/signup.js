import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";

function SignupPopup({ open, handleClose }) {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  // Submit form data to backend
  const handleSubmit = async () => {
    if (!formData.userName || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8082/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      console.log("Token:", data.token);

      handleClose(); // Close popup on success
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Username"
          name="userName"
          type="text"
          variant="outlined"
          value={formData.userName}
          onChange={handleChange}
          error={!!error}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={!!error}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "black" }}>Cancel</Button>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: "black", color: "white" }} 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignupPopup;
