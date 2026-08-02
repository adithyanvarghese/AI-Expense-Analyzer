import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function DashboardCard({ title, value, color, iconType, trend }) {
  const getIcon = () => {
    switch (iconType) {
      case "total":
        return <AccountBalanceWalletIcon sx={{ color }} />;
      case "highest":
        return <LocalAtmIcon sx={{ color }} />;
      case "categories":
        return <CategoryIcon sx={{ color }} />;
      case "monthly":
        return <CalendarMonthIcon sx={{ color }} />;
      default:
        return <TrendingUpIcon sx={{ color }} />;
    }
  };

  return (
    <Card
      className="glass-card glass-card-hover"
      sx={{
        borderRadius: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: color || "linear-gradient(90deg, #6366F1, #A855F7)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
            {title}
          </Typography>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {getIcon()}
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, color: "#F9FAFB", mb: 1 }}>
          {value}
        </Typography>

        {trend && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <TrendingUpIcon sx={{ fontSize: "0.9rem", color: "#10B981" }} />
            <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 700 }}>
              {trend}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}