import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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

export default function ExpenseDialog({ open, onClose, onSave, expense }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "Others",
    amount: "",
  });

  useEffect(() => {
    if (expense) {
      setForm(expense);
    } else {
      setForm({
        date: new Date().toISOString().split("T")[0],
        description: "",
        category: "Others",
        amount: "",
      });
    }
  }, [expense, open]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date) return;
    onSave(form);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "#111827",
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 4,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: "#6366F1" }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {expense ? "Edit Expense" : "Add New Expense"}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2.5} mt={1}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />

            <TextField
              label="Description"
              name="description"
              placeholder="e.g. Starbucks Coffee or Amazon Purchase"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Amount (₹)"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0, step: "any" }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" color="primary">
            {expense ? "Update Expense" : "Save Expense"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}