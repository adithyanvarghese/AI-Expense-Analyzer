import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await registerUser(form);
      setSuccessMsg("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      const backendError = err.response?.data;
      if (typeof backendError === "object" && backendError !== null) {
        const firstKey = Object.keys(backendError)[0];
        const val = backendError[firstKey];
        setErrorMsg(`${firstKey}: ${Array.isArray(val) ? val.join(", ") : val}`);
      } else {
        setErrorMsg("Failed to register account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start tracking expenses smarter with AI"
    >
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errorMsg}
        </Alert>
      )}

      {successMsg && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {successMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            endIcon={!loading && <ArrowForwardIcon />}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              mt: 1,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
          </Button>

          <Box sx={{ textCenter: "center", textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{ color: "#6366F1", fontWeight: 700 }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </AuthLayout>
  );
}