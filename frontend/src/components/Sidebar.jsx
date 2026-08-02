import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LogoutIcon from "@mui/icons-material/Logout";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function Sidebar({ mobileOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Expenses",
      icon: <ReceiptLongIcon />,
      path: "/expenses",
    },
    {
      text: "Budget Goals",
      icon: <AccountBalanceWalletIcon />,
      path: "/budget",
    },
    {
      text: "Statement Upload",
      icon: <UploadFileIcon />,
      path: "/statement-upload",
    },
    {
      text: "Receipt OCR",
      icon: <CameraAltIcon />,
      path: "/receipt-scanner",
    },
    {
      text: "AI Advisor",
      icon: <PsychologyIcon />,
      path: "/ai",
      badge: "AI",
    },
  ];

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              background: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
            }}
          >
            <AutoAwesomeIcon sx={{ color: "#FFF", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, leading: 1 }}>
              FinSight AI
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
              Expense Analyzer
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={isSelected}
              onClick={onClose}
              sx={{
                borderRadius: 3,
                mb: 0.8,
                py: 1.2,
                px: 2,
                position: "relative",
                transition: "all 0.2s ease",
                backgroundColor: isSelected ? "rgba(99, 102, 241, 0.15)" : "transparent",
                color: isSelected ? "#818CF8" : "#9CA3AF",
                "&.Mui-selected": {
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "#818CF8",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    bottom: "20%",
                    width: 4,
                    borderRadius: 4,
                    backgroundColor: "#6366F1",
                    boxShadow: "0 0 10px #6366F1",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#F3F4F6",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isSelected ? "#6366F1" : "#9CA3AF",
                  minWidth: 38,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.92rem",
                  fontWeight: isSelected ? 700 : 500,
                }}
              />

              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                    color: "#FFF",
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

      {/* Profile Card & Logout */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #6366F1 0%, #10B981 100%)",
              fontSize: "0.9rem",
              fontWeight: 700,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="body2" sx={{ fontWeight: 700, textOverflow: "ellipsis", overflow: "hidden" }}>
              {username}
            </Typography>
            <Typography variant="caption" sx={{ color: "#10B981", display: "flex", alignItems: "center", gap: 0.5 }}>
              ● Pro Account
            </Typography>
          </Box>
        </Box>

        <ListItemButton
          onClick={logout}
          sx={{
            borderRadius: 3,
            color: "#F43F5E",
            py: 1,
            "&:hover": {
              backgroundColor: "rgba(244, 63, 94, 0.12)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#F43F5E", minWidth: 38 }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 600 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#0F172A",
            color: "white",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#0F172A",
            color: "white",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}