import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { signUp } from "../../utils/authFunctions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PestoBackground from "../../assets/Test.png";
import Logo from "../../assets/Logo.png";

interface Credentials {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(credentials.email, credentials.password); // Register user
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: `linear-gradient(135deg, #FAF7E2 50%, #FFF4C2 50%)`,
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `url(${PestoBackground}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 3,
            padding: "10px",
          }}
        >
          <img
            src={require("../../assets/Logo.png")}
            alt="Logo"
            style={{
              width: "50px",
              height: "auto",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex", // Enables Flexbox
            alignItems: "center", // Vertically centers content
            justifyContent: "center", // Horizontally centers content
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
              zIndex: 1,
            }}
          />

          {/* Text Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              color: "#faf7e2",
              textAlign: "center",
              p: 4,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Subtle text shadow
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start", // Align items to the top
              alignItems: "center", // Horizontally center the text
              height: "50%", // Take only the top half of the overlay
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Join <span style={{ color: "#17765f" }}>Pesto</span> to grow your
              business!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="#2E3A3F"
          >
            Create Your Account
          </Typography>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="#2E3A3F">
              Register Below
            </Typography>
          </Divider>

          {/* Register Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={credentials.confirmPassword}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {/* Register Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#2A765F",
                color: "#FAF7E2",
                "&:hover": { backgroundColor: "#1E5E49" },
              }}
            >
              Register
            </Button>
          </form>

          {/* Login Link */}
          <Typography
            variant="body2"
            sx={{
              mt: 2,
            }}
            color="#2E3A3F"
          >
            Already have an account?{" "}
            <Typography
              variant="body2"
              component="span"
              color="primary"
              sx={{
                cursor: "pointer",
                color: "#2A765F",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
