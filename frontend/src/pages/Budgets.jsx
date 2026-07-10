import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
} from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import BudgetCard from "../components/BudgetCard";

import {
  getBudgetStatus,
} from "../services/budgetService";

export default function Budgets() {

  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    loadBudgets();
  }, []);

  async function loadBudgets() {
    try {
      const data = await getBudgetStatus();
      setBudgets(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <DashboardLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Budget Manager
      </Typography>

      <Grid container spacing={3}>

        {budgets.map((budget) => (

          <Grid
            size={{ xs: 12, md: 6, lg: 4 }}
            key={budget.category}
          >

            <BudgetCard budget={budget} />

          </Grid>

        ))}

      </Grid>

    </DashboardLayout>

  );

}