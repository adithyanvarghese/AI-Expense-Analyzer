import { useState } from "react";
import {
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case "food":
      return { bg: "rgba(245, 158, 11, 0.15)", color: "#F59E0B" };
    case "travel":
      return { bg: "rgba(59, 130, 246, 0.15)", color: "#3B82F6" };
    case "shopping":
      return { bg: "rgba(168, 85, 247, 0.15)", color: "#A855F7" };
    case "bills":
      return { bg: "rgba(244, 63, 94, 0.15)", color: "#F43F5E" };
    case "entertainment":
      return { bg: "rgba(236, 72, 153, 0.15)", color: "#EC4899" };
    case "healthcare":
      return { bg: "rgba(16, 185, 129, 0.15)", color: "#10B981" };
    case "investment":
      return { bg: "rgba(99, 102, 241, 0.15)", color: "#6366F1" };
    default:
      return { bg: "rgba(156, 163, 175, 0.15)", color: "#9CA3AF" };
  }
};

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description?.toLowerCase().includes(search.toLowerCase()) ||
      expense.category?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#F9FAFB" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => {
        const style = getCategoryColor(params.value);
        return (
          <Chip
            label={params.value}
            size="small"
            sx={{
              bgcolor: style.bg,
              color: style.color,
              fontWeight: 700,
              border: `1px solid ${style.color}40`,
            }}
          />
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body1" sx={{ fontWeight: 800, color: "#10B981" }}>
          ₹{Number(params.value).toLocaleString()}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            sx={{
              color: "#818CF8",
              bgcolor: "rgba(99, 102, 241, 0.1)",
              "&:hover": { bgcolor: "rgba(99, 102, 241, 0.2)" },
            }}
            onClick={() => onEdit?.(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: "#F43F5E",
              bgcolor: "rgba(244, 63, 94, 0.1)",
              "&:hover": { bgcolor: "rgba(244, 63, 94, 0.2)" },
            }}
            onClick={() => onDelete?.(params.row)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Paper className="glass-card" sx={{ p: 3, borderRadius: 4 }}>
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search by category or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={filteredExpenses}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderColor: "rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "rgba(15, 23, 42, 0.8)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: 2,
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: "rgba(255, 255, 255, 0.03)",
            },
            "& .MuiTablePagination-root": {
              color: "#9CA3AF",
            },
          }}
        />
      </Box>
    </Paper>
  );
}