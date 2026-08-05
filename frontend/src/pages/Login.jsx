import { useState, useContext } from "react";
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
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = form.username.trim();
    if (!cleanUsername || !form.password) {
      setErrorMsg("Please enter username and password.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const payload = { username: cleanUsername, password: form.password };
      const tokens = await loginUser(payload);
      login(tokens, cleanUsername);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.code === "ERR_NETWORK") {
        setErrorMsg("Unable to connect to backend server. Please check your connection.");
      } else {
        setErrorMsg("Invalid username or password. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your dashboard"
    >
      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Username or Email"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
            slotProps={{
              htmlInput: {
                autoCapitalize: "none",
                autoCorrect: "off",
                spellCheck: "false",
                autoComplete: "username",
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              },
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
            slotProps={{
              input: {
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
              },
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
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/register"
                underline="hover"
                sx={{ color: "#6366F1", fontWeight: 700 }}
              >
                Create Account
              </Link>
            </Typography>
          </Box>
        </Stack>
      </form>
    </AuthLayout>
  );
}