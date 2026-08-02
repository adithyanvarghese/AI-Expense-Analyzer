import { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Alert,
  MenuItem,
  Stack,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DashboardLayout from "../layouts/DashboardLayout";
import { scanReceipt } from "../services/receiptService";
import { createExpense } from "../services/expenseService";

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

export default function ReceiptScanner() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [saved, setSaved] = useState(false);

  function handleFileSelect(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setReceipt(null);
      setSaved(false);
    }
  }

  async function handleScan() {
    if (!image) return;
    try {
      setLoading(true);
      const data = await scanReceipt(image);
      setReceipt({
        date: data.receipt?.date || new Date().toISOString().split("T")[0],
        category: data.receipt?.category || "Others",
        description: data.receipt?.description || "Receipt Item",
        amount: data.receipt?.amount || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!receipt) return;
    try {
      await createExpense({
        date: receipt.date,
        category: receipt.category,
        amount: receipt.amount,
        description: receipt.description,
      });
      setSaved(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          AI Receipt OCR Scanner
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload a receipt image. Gemini AI automatically extracts the store, date, category, and total amount.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Upload Box */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className="glass-card" sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
            <Box
              sx={{
                border: "2px dashed rgba(99, 102, 241, 0.4)",
                borderRadius: 3,
                p: 4,
                bgcolor: "rgba(15, 23, 42, 0.4)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#6366F1", bgcolor: "rgba(99, 102, 241, 0.05)" },
              }}
              component="label"
            >
              <input hidden type="file" accept="image/*" onChange={handleFileSelect} />

              {imagePreview ? (
                <Box sx={{ maxHeight: 240, overflow: "hidden", borderRadius: 2 }}>
                  <img src={imagePreview} alt="Receipt preview" style={{ maxWidth: "100%", maxHeight: 240, objectFit: "contain" }} />
                </Box>
              ) : (
                <Box>
                  <CameraAltIcon sx={{ fontSize: 56, color: "#818CF8", mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Click or Drag Receipt Image Here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports JPG, PNG, WEBP receipts
                  </Typography>
                </Box>
              )}
            </Box>

            {image && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                Selected: {image.name}
              </Typography>
            )}

            <Button
              variant="contained"
              size="large"
              onClick={handleScan}
              disabled={!image || loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CameraAltIcon />}
              sx={{ mt: 3, width: "100%", py: 1.5 }}
            >
              {loading ? "Scanning & Extracting with AI..." : "Scan & Extract Receipt"}
            </Button>
          </Paper>
        </Grid>

        {/* Right Extracted Results */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className="glass-card" sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Extracted Receipt Details
            </Typography>

            {!receipt ? (
              <Box sx={{ textCenter: "center", textAlign: "center", py: 6 }}>
                <ImageIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Upload a receipt image and click "Scan & Extract" to preview transactions.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2.5}>
                <TextField
                  label="Date"
                  type="date"
                  value={receipt.date}
                  onChange={(e) => setReceipt({ ...receipt, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />

                <TextField
                  label="Merchant / Description"
                  value={receipt.description}
                  onChange={(e) => setReceipt({ ...receipt, description: e.target.value })}
                  fullWidth
                />

                <TextField
                  select
                  label="Category"
                  value={receipt.category}
                  onChange={(e) => setReceipt({ ...receipt, category: e.target.value })}
                  fullWidth
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Amount (₹)"
                  type="number"
                  value={receipt.amount}
                  onChange={(e) => setReceipt({ ...receipt, amount: e.target.value })}
                  fullWidth
                />

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={saved}
                  sx={{ py: 1.5, mt: 1 }}
                >
                  {saved ? "Saved to Expenses!" : "Save to Expenses Table"}
                </Button>

                {saved && (
                  <Alert severity="success" icon={<CheckCircleIcon fontSize="inherit" />} sx={{ borderRadius: 3 }}>
                    Expense saved successfully to your database!
                  </Alert>
                )}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}