import React, { useState, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import bg from "../assets/svg/Background.svg";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const { signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); 
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });
      if (result.status === "complete") {
        await setActive({ session: signUp.createdSessionId });
        navigate("/dashboard");
        console.log("✅ User signed up and logged in!");
      } else {
        console.warn("⚠️ Verification not complete:", result);
      }
    } catch (err) {
      console.error("❌ Error verifying code:", err.errors);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 500,
          bgcolor: "#fdf4ff",
          p: 4,
          border: "1px solid #9D00FF",
          borderRadius: 4,
          boxShadow: "inset 0 0 15px rgba(180, 81, 255, 0.55)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Enter OTP
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value.slice(0, 1), index)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontSize: "20px" },
              }}
              sx={{
                width: 55,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          ))}
        </Box>
        <Button
          type="submit"
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
          Verify OTP
        </Button>
      </Box>
    </Box>
  );
};

export default OtpPage;
