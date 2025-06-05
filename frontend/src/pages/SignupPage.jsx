import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/svg/Background.svg";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName: name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigate("/confirm");
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.errors && err.errors.length > 0) {
        alert(err.errors[0].message);
      } else {
        alert("An unexpected error occurred during sign-up.");
      }
    }
  };


  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "#fdf4ff",
          p: 4,
          border: "1px solid #9D00FF",
          borderRadius: 4,
          boxShadow: "inset 0 0 15px rgba(180, 81, 255, 0.55)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create an account
        </Typography>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email Address"
          fullWidth
          margin="normal"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            backgroundColor: "#9D00FF",
            color: "white",
            fontWeight: "bold",
            borderRadius: 99,
            boxShadow: "0 5px 20px rgba(157, 0, 255, 0.5)",
            "&:hover": { backgroundColor: "#8500d6" },
          }}
          onClick={handleSignUp}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
