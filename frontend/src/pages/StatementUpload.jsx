import { useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  LinearProgress,
  Stack,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";

import DashboardLayout from "../layouts/DashboardLayout";
import privateApi from "../services/privateApi";

export default function StatementUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setErrorMsg("");
    }
  }

  async function handleUpload() {
    if (!file) {
      setErrorMsg("Please choose a statement CSV or PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setErrorMsg("");

      const response = await privateApi.post(
        "expenses/upload-statement/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      let msg = "Failed to process statement. Please check the file format.";
      if (typeof data === "string") {
        msg = data;
      } else if (data?.error) {
        msg = data.error;
      } else if (data?.detail) {
        msg = data.detail;
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Bank Statement Import
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload your bank or credit card CSV/PDF statement. Transactions will be parsed and auto-categorized by AI.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className="glass-card" sx={{ p: 4, borderRadius: 4 }}>
            <Box
              sx={{
                border: "2px dashed rgba(99, 102, 241, 0.4)",
                borderRadius: 3,
                p: 5,
                bgcolor: "rgba(15, 23, 42, 0.4)",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": { borderColor: "#6366F1", bgcolor: "rgba(99, 102, 241, 0.05)" },
              }}
              component="label"
            >
              <input hidden type="file" accept=".csv,.pdf" onChange={handleFileChange} />

              <UploadFileIcon sx={{ fontSize: 56, color: "#818CF8", mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {file ? file.name : "Select Bank Statement (CSV or PDF)"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Supports statements from HDFC, SBI, ICICI, Axis, Chase, BoA & all major banks
              </Typography>
            </Box>

            {errorMsg && (
              <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
                {errorMsg}
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              onClick={handleUpload}
              disabled={!file || loading}
              startIcon={<UploadFileIcon />}
              sx={{ mt: 3, width: "100%", py: 1.5 }}
            >
              {loading ? "Processing Statement..." : "Import Bank Statement"}
            </Button>

            {loading && (
              <Box sx={{ width: "100%", mt: 3 }}>
                <LinearProgress sx={{ borderRadius: 2, height: 6 }} />
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper className="glass-card" sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Import Summary
            </Typography>

            {!result ? (
              <Box sx={{ textCenter: "center", textAlign: "center", py: 5 }}>
                <DescriptionIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Uploaded statement results and imported transactions will appear here.
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2}>
                <Alert severity="success" icon={<CheckCircleIcon fontSize="inherit" />} sx={{ borderRadius: 3 }}>
                  Statement Processed Successfully!
                </Alert>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Paper sx={{ p: 2, bgcolor: "rgba(255, 255, 255, 0.03)", borderRadius: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Transactions Imported
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#10B981" }}>
                        {result.transactions_imported || 0}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid size={{ xs: 6 }}>
                    <Paper sx={{ p: 2, bgcolor: "rgba(255, 255, 255, 0.03)", borderRadius: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Duplicates Skipped
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#F59E0B" }}>
                        {result.duplicates_skipped || 0}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {result.preview && result.preview.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                      Imported Preview
                    </Typography>
                    <TableContainer component={Paper} sx={{ bgcolor: "rgba(255, 255, 255, 0.02)", borderRadius: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {result.preview.map((tx, i) => (
                            <TableRow key={i}>
                              <TableCell sx={{ fontSize: "0.8rem" }}>{tx.date}</TableCell>
                              <TableCell sx={{ fontSize: "0.8rem" }}>{tx.description}</TableCell>
                              <TableCell>
                                <Chip label={tx.category} size="small" color="primary" variant="outlined" />
                              </TableCell>
                              <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.8rem" }}>
                                ₹{tx.amount}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}