import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryChart from "../components/dashboard/CategoryChart";

import {
  getDashboardSummary,
  getChartData,
} from "../services/dashboardService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      const summaryData = await getDashboardSummary();
      const charts = await getChartData();
      setSummary(summaryData);
      setChartData(charts);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      {/* Quick Action Header Banner */}
      <Box
        className="glass-card"
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Overview & Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time insights on your spending habits and AI financial health score.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/expenses")}
          >
            Add Expense
          </Button>

          <Button
            variant="outlined"
            startIcon={<CameraAltIcon />}
            onClick={() => navigate("/receipt-scanner")}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "#F3F4F6",
              "&:hover": { borderColor: "#6366F1", bgcolor: "rgba(99, 102, 241, 0.1)" },
            }}
          >
            Scan Receipt
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<PsychologyIcon />}
            onClick={() => navigate("/ai")}
          >
            AI Advice
          </Button>
        </Box>
      </Box>

      {/* Metrics Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {loading ? (
          Array.from(new Array(4)).map((_, idx) => (
            <Skeleton key={idx} variant="rounded" height={130} sx={{ borderRadius: 4, bgcolor: "rgba(255, 255, 255, 0.05)" }} />
          ))
        ) : (
          <>
            <DashboardCard
              title="Total Expenses"
              value={`₹${summary?.total_expense?.toLocaleString() || 0}`}
              color="#6366F1"
              iconType="total"
              trend="+12% from last month"
            />

            <DashboardCard
              title="Highest Expense"
              value={`₹${summary?.highest_expense?.toLocaleString() || 0}`}
              color="#F43F5E"
              iconType="highest"
            />

            <DashboardCard
              title="Categories Tracked"
              value={summary?.total_categories || 0}
              color="#10B981"
              iconType="categories"
            />

            <DashboardCard
              title="This Month's Spent"
              value={`₹${summary?.monthly_expense?.toLocaleString() || 0}`}
              color="#A855F7"
              iconType="monthly"
            />
          </>
        )}
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        <Paper className="glass-card" sx={{ p: 3, borderRadius: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Monthly Expense Trend
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Current Year Breakdown
            </Typography>
          </Box>

          {loading ? (
            <Skeleton variant="rounded" height={320} sx={{ bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: 3 }} />
          ) : (
            <ExpenseChart data={chartData?.bar_chart || []} />
          )}
        </Paper>

        <Paper className="glass-card" sx={{ p: 3, borderRadius: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Category Breakdown
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Distribution
            </Typography>
          </Box>

          {loading ? (
            <Skeleton variant="rounded" height={320} sx={{ bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: 3 }} />
          ) : (
            <CategoryChart data={chartData?.pie_chart || []} />
          )}
        </Paper>
      </Box>
    </DashboardLayout>
  );
}