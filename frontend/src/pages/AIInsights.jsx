import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Chip,
  Skeleton,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import DashboardLayout from "../layouts/DashboardLayout";
import { getAIInsights } from "../services/aiService";

export default function AIInsights() {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    loadAnalysis();
  }, []);

  async function loadAnalysis() {
    try {
      setLoading(true);
      const data = await getAIInsights();
      setAnalysis(data);
    } catch (err) {
      console.error("AI Insights error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      {/* Header Banner */}
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
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
          border: "1px solid rgba(168, 85, 247, 0.2)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
            }}
          >
            <PsychologyIcon sx={{ color: "#FFF", fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              AI Financial Advisor
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Personalized money management advice powered by Gemini & Machine Learning.
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<RefreshIcon />}
          onClick={loadAnalysis}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Re-Analyze Finances"}
        </Button>
      </Box>

      {/* Metrics Row */}
      {loading ? (
        <Grid container spacing={3} mb={4}>
          {Array.from(new Array(3)).map((_, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Skeleton variant="rounded" height={120} sx={{ borderRadius: 4, bgcolor: "rgba(255, 255, 255, 0.05)" }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="glass-card glass-card-hover" sx={{ p: 3, borderRadius: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Total Tracked Expense
                </Typography>
                <AccountBalanceWalletIcon sx={{ color: "#F43F5E" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#F43F5E" }}>
                ₹{Number(analysis?.total_expense || 0).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="glass-card glass-card-hover" sx={{ p: 3, borderRadius: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Top Expense Category
                </Typography>
                <TrendingUpIcon sx={{ color: "#818CF8" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#818CF8" }}>
                {analysis?.highest_category || "N/A"}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper className="glass-card glass-card-hover" sx={{ p: 3, borderRadius: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Potential Monthly Savings
                </Typography>
                <SavingsIcon sx={{ color: "#10B981" }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#10B981" }}>
                ₹{Number(analysis?.potential_savings || 0).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Main Analysis Card */}
      <Paper className="glass-card" sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, borderBottom: "1px solid rgba(255, 255, 255, 0.08)", pb: 2 }}>
          <AutoAwesomeIcon sx={{ color: "#A855F7" }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Comprehensive Intelligence Report
          </Typography>
          <Chip label="Gemini AI" size="small" color="secondary" sx={{ ml: "auto" }} />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="text" height={30} width="60%" sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }} />
            <Skeleton variant="text" height={20} sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }} />
            <Skeleton variant="text" height={20} sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }} />
            <Skeleton variant="text" height={20} width="80%" sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }} />
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              fontSize: "1.05rem",
              color: "#E5E7EB",
            }}
          >
            {analysis?.analysis || "No expenses found to analyze. Add some expenses to get tailored AI financial insights."}
          </Typography>
        )}
      </Paper>
    </DashboardLayout>
  );
}