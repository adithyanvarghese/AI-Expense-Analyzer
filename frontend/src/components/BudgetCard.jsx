import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";

export default function BudgetCard({ budget }) {

  const progress = Math.min(budget.percentage, 100);

  const color =
    progress < 60
      ? "success"
      : progress < 90
      ? "warning"
      : "error";

  return (

    <Card>

      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          {budget.category}
        </Typography>

        <Typography>
          Budget : ₹{budget.budget}
        </Typography>

        <Typography>
          Spent : ₹{budget.spent}
        </Typography>

        <Typography>
          Remaining : ₹{budget.remaining}
        </Typography>

        <Box mt={2}>

          <LinearProgress

            variant="determinate"

            value={progress}

            color={color}

            sx={{
              height: 10,
              borderRadius: 5,
            }}

          />

        </Box>

        <Box mt={2}>

          <Chip

            label={budget.status}

            color={color}

          />

        </Box>

      </CardContent>

    </Card>

  );

}