import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Stack,
  Alert,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import DashboardLayout from "../layouts/DashboardLayout";
import BudgetCard from "../components/BudgetCard";
import { getBudgetStatus, getBudgets, createBudget, deleteBudget } from "../services/budgetService";

const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Investment",
  "Others",
];

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState({
    category: "Food",
    monthly_budget: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBudgets();
  }, []);

  async function loadBudgets() {
    try {
      setLoading(true);
      const data = await getBudgetStatus();
      setBudgets(data);
    } catch (error) {
      console.error("Budget status error:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.monthly_budget) return;

    try {
      await createBudget({
        category: form.category,
        monthly_budget: form.monthly_budget,
      });
      setMessage("Budget limit added successfully!");
      setForm({ category: "Food", monthly_budget: "" });
      setShowAddForm(false);
      loadBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await deleteBudget(id);
      setMessage("Budget target removed.");
      loadBudgets();
    } catch (err) {
      console.error(err);
    }
  };

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
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Category Budgets & Limits
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Set monthly spending caps to keep your expenses under control.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Set New Budget Target"}
        </Button>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }} onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}

      {/* Add Budget Form Card */}
      {showAddForm && (
        <Paper className="glass-card" sx={{ p: 3, borderRadius: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Configure New Monthly Budget
          </Typography>

          <form onSubmit={handleCreate}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                sx={{ minWidth: 200 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Monthly Budget Limit (₹)"
                type="number"
                value={form.monthly_budget}
                onChange={(e) => setForm({ ...form, monthly_budget: e.target.value })}
                fullWidth
                required
              />

              <Button type="submit" variant="contained" color="secondary" sx={{ minWidth: 160, py: 1.5 }}>
                Save Budget
              </Button>
            </Stack>
          </form>
        </Paper>
      )}

      {/* Budget Status Cards Grid */}
      {loading ? (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
          {Array.from(new Array(3)).map((_, idx) => (
            <Skeleton key={idx} variant="rounded" height={180} sx={{ borderRadius: 4, bgcolor: "rgba(255, 255, 255, 0.05)" }} />
          ))}
        </Box>
      ) : budgets.length === 0 ? (
        <Paper className="glass-card" sx={{ p: 5, textCenter: "center", textAlign: "center", borderRadius: 4 }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 56, color: "text.secondary", mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            No Budget Limits Configured
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Click "Set New Budget Target" above to define spending limits for categories like Food, Travel, etc.
          </Typography>
          <Button variant="contained" onClick={() => setShowAddForm(true)}>
            Add Budget Limit
          </Button>
        </Paper>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 3 }}>
          {budgets.map((budget) => (
            <BudgetCard key={budget.id || budget.category} budget={budget} onDelete={handleDelete} />
          ))}
        </Box>
      )}
    </DashboardLayout>
  );
}