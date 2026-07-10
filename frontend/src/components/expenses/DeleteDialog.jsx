import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Expense
      </DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this expense?
        </Typography>
      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
}