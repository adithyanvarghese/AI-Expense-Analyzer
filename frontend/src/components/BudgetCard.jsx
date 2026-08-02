import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function BudgetCard({ budget, onDelete }) {
  const percentage = budget.percentage || 0;
  const progress = Math.min(percentage, 100);

  const getStatusConfig = () => {
    if (budget.status === "Over Budget" || percentage > 100) {
      return { color: "#F43F5E", bg: "rgba(244, 63, 94, 0.15)", label: "Over Budget", iconColor: "error" };
    } else if (budget.status === "Near Limit" || percentage >= 80) {
      return { color: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)", label: "Near Limit", iconColor: "warning" };
    } else {
      return { color: "#10B981", bg: "rgba(16, 185, 129, 0.15)", label: "Within Budget", iconColor: "success" };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Card
      className="glass-card glass-card-hover"
      sx={{
        borderRadius: 4,
        position: "relative",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2.5,
                bgcolor: "rgba(99, 102, 241, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: "#818CF8", fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#F9FAFB" }}>
              {budget.category}
            </Typography>
          </Box>

          <Chip
            label={statusConfig.label}
            size="small"
            sx={{
              bgcolor: statusConfig.bg,
              color: statusConfig.color,
              fontWeight: 700,
              border: `1px solid ${statusConfig.color}40`,
            }}
          />
        </Box>

        <Box sx={{ my: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Spent: <strong style={{ color: "#F9FAFB" }}>₹{Number(budget.spent || 0).toLocaleString()}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Limit: <strong style={{ color: "#F9FAFB" }}>₹{Number(budget.budget || budget.monthly_budget || 0).toLocaleString()}</strong>
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "rgba(255, 255, 255, 0.08)",
              "& .MuiLinearProgress-bar": {
                bgcolor: statusConfig.color,
                borderRadius: 5,
              },
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {percentage}% Used
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: budget.remaining < 0 ? "#F43F5E" : "#10B981",
              }}
            >
              {budget.remaining < 0
                ? `Exceeded by ₹${Math.abs(budget.remaining).toLocaleString()}`
                : `₹${Number(budget.remaining || 0).toLocaleString()} Remaining`}
            </Typography>
          </Box>
        </Box>

        {onDelete && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <IconButton
              size="small"
              sx={{ color: "#F43F5E", "&:hover": { bgcolor: "rgba(244, 63, 94, 0.15)" } }}
              onClick={() => onDelete(budget.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}