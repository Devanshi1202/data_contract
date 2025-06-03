import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import GitHubIcon from '@mui/icons-material/GitHub';
// import GoogleIcon from '@mui/icons-material/Google';

const getPasswordStrength = (password) => {
  let score = 0;
  if (!password)
    return { score: 0, label: "Weak", percentage: 0, color: "#f44336" };
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = ["#f44336", "#ff9800", "#ffc107", "#2196f3", "#4caf50"];

  return {
    score,
    label: labels[score],
    color: colors[score],
    percentage: (score / 4) * 100,
  };
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const strength = getPasswordStrength(password);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          Create an account
        </Typography>

        <TextField
          fullWidth
          label="Name"
          placeholder="Enter your name"
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Organization Name"
          placeholder=""
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email address"
          margin="normal"
          variant="outlined"
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Create your password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Password Strength Indicator */}
        {password && (
          <Box sx={{ width: "100%", mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={strength.percentage}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#eee",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: strength.color,
                },
              }}
            />
            <Typography variant="body2" sx={{ mt: 0.5, color: strength.color }}>
              {strength.label}
            </Typography>
          </Box>
        )}

        {/* Confirm Password */}
        <TextField
          fullWidth
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter confirm password"
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            backgroundColor: "#9D00FF",
            color: "white",
            fontWeight: "bold",
            borderRadius: 99,
            boxShadow: "0 5px 20px rgba(157, 0, 255, 0.5)",
            "&:hover": {
              backgroundColor: "#8500d6",
            },
          }}
        >
          Create an account
        </Button>

        {/* Login Text */}
        <Typography mt={2} variant="body2">
          Already have an account?{" "}
          <Typography
            component="span"
            sx={{ color: "#7b1fa2", cursor: "pointer", fontWeight: 500 }}
          >
            Login
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
