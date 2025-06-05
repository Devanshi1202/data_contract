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
import bg from "../assets/svg/Background.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("✅ Logged in!");
        navigate("/dashboard");
      } else {
        console.warn("⏳ Sign-in requires further steps:", result);
      }
    } catch (err) {
      console.error("❌ Sign-in failed:", err.errors);
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
        backgroundPosition: "center",
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
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Login to your account
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email address"
          margin="normal"
          variant="outlined"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
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
          onClick={handleSignIn}
        >
          Login
        </Button>

        {/* Login Text */}
        <Typography mt={2} variant="body2">
          Don't have an account?{" "}
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            <Typography
              component="span"
              sx={{ color: "#7b1fa2", cursor: "pointer", fontWeight: 500 }}
            >
              Sign Up
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LogInPage;
