import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@mui/material";

function LoginPopup({ open, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when typing
  };

  // Handle login request
  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError("Both fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8082/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      console.log("Token:", data.token);

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);

      handleClose(); // Close popup on success
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Username"
          name="username"
          type="username"
          variant="outlined"
          value={formData.username}
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
          sx={{ backgroundColor: "red", color: "white" }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginPopup;
