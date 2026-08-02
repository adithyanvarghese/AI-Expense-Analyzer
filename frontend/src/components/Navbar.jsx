import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  Chip,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLocation } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const username = localStorage.getItem("username") || "User";
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/expenses":
        return "Expenses";
      case "/budget":
        return "Budget Goals";
      case "/statement-upload":
      case "/statement":
        return "Statement Import";
      case "/receipt-scanner":
      case "/receipt":
        return "Receipt OCR";
      case "/ai":
        return "AI Advisor";
      default:
        return "FinSight AI";
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(11, 15, 25, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
        {/* Mobile Menu Toggle Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 1.5, display: { md: "none" } }}
        >
          <MenuIcon sx={{ color: "#818CF8" }} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
            {getPageTitle()}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
            Welcome back, {username}!
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
          <Chip
            icon={<CalendarTodayIcon sx={{ fontSize: "0.9rem !important", color: "#6366F1" }} />}
            label={formattedDate}
            size="small"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              px: 1,
              py: 0.5,
              fontWeight: 600,
              display: { xs: "none", sm: "flex" },
            }}
          />

          <IconButton
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.08)" },
            }}
          >
            <Badge color="error" variant="dot">
              <NotificationsNoneIcon sx={{ color: "#9CA3AF" }} />
            </Badge>
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pl: { xs: 0.5, sm: 1 },
              borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
                fontWeight: 700,
                fontSize: "0.9rem",
                boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}