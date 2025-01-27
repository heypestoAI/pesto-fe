import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
} from "@mui/material";
import { signIn } from "../../utils/authFunctions";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PestoBackground from "../../assets/test-food-image.jpg";
import Logo from "../../assets/Logo.png";

interface Credentials {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // await signIn(credentials.email, credentials.password); // Use the utility function
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
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
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              // style={{ color: "#" }}
            >
              Welcome Back! Login to continue growing your business with{" "}
              <span style={{ color: "#17765f" }}>Pesto</span>!
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
          <Typography variant="h5" gutterBottom>
            Login to <span style={{ color: "#17765f" }}>Pesto</span>
          </Typography>

          {/* Social Logins */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              mt: 2,
              mb: 1,
              color: "#2A765F",
              borderColor: "#2A765F",
              "&:hover": { backgroundColor: "#FDE891", borderColor: "#1E5E49" },
            }}
          >
            Login with Google
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="#2E3A3F">
              OR
            </Typography>
          </Divider>

          {/* Login Form */}
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
              InputProps={{
                startAdornment: (
                  <Typography sx={{ color: "gray", mr: 1 }} component="span">
                    📧
                  </Typography>
                ),
              }}
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
                startAdornment: (
                  <Typography sx={{ color: "gray", mr: 1 }} component="span">
                    🔑
                  </Typography>
                ),
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {/* Remember Me & Forgot Password */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <FormControlLabel
                control={<Checkbox sx={{ color: "#2A765F" }} />}
                label={
                  <Typography variant="body2" color="#2E3A3F">
                    Remember me
                  </Typography>
                }
              />
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", color: "#2A765F" }}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* Login Button */}
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
              Login
            </Button>
          </form>

          {/* Register Link */}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Typography
              variant="body2"
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
              style={{
                color: "#2A765F",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
