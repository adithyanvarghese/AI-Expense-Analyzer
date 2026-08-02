import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "#111827",
          backgroundImage: "none",
          border: "1px solid rgba(244, 63, 94, 0.3)",
          borderRadius: 4,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: "#F43F5E" }}>
        Delete Expense Confirmation
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">
          Are you sure you want to delete this expense entry? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          Cancel
        </Button>

        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}