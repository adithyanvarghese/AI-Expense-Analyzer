import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import { useState, useEffect } from "react";

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

export default function ExpenseDialog({
  open,
  onClose,
  onSave,
  expense,
}) {
  const [form, setForm] = useState({
    date: "",
    description: "",
    category: "Others",
    amount: "",
  });

  useEffect(() => {
    if (expense) {
      setForm(expense);
    } else {
      setForm({
        date: "",
        description: "",
        category: "Others",
        amount: "",
      });
    }
  }, [expense]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    onSave(form);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {expense ? "Edit Expense" : "Add Expense"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={2}>

          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
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
              <MenuItem
                key={item}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
          />

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}