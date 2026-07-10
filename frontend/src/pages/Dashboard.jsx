import { useEffect, useState } from "react";

import { Box, Typography, Paper } from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

import ExpenseChart from "../components/dashboard/ExpenseChart";
import CategoryChart from "../components/dashboard/CategoryChart";

import {
    getDashboardSummary,
    getChartData
} from "../services/dashboardService";

export default function Dashboard() {

    const [summary, setSummary] = useState(null);

    const [chartData, setChartData] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const summaryData = await getDashboardSummary();

            const charts = await getChartData();

            setSummary(summaryData);

            setChartData(charts);

        }

        catch (err) {

            console.log(err);

        }

    }

    if (!summary || !chartData) {

        return (

            <DashboardLayout>

                <Typography>

                    Loading Dashboard...

                </Typography>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >

                Financial Dashboard

            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(4,1fr)"
                    },
                    gap: 3
                }}
            >

                <DashboardCard

                    title="Total Expense"

                    value={`₹${summary.total_expense}`}

                    color="#f44336"

                />

                <DashboardCard

                    title="Highest Expense"

                    value={`₹${summary.highest_expense}`}

                    color="#ff9800"

                />

                <DashboardCard

                    title="Categories"

                    value={summary.total_categories}

                    color="#4caf50"

                />

                <DashboardCard

                    title="This Month"

                    value={`₹${summary.monthly_expense}`}

                    color="#1976d2"

                />

            </Box>

            <Box

                sx={{

                    display: "grid",

                    gridTemplateColumns: {

                        xs: "1fr",

                        md: "2fr 1fr"

                    },

                    gap: 3,

                    mt: 4

                }}

            >

                <Paper sx={{ p: 3 }}>

                    <Typography
                        variant="h6"
                        mb={2}
                    >

                        Monthly Expenses

                    </Typography>

                    <ExpenseChart

                        data={chartData.bar_chart}

                    />

                </Paper>

                <Paper sx={{ p: 3 }}>

                    <Typography
                        variant="h6"
                        mb={2}
                    >

                        Categories

                    </Typography>

                    <CategoryChart

                        data={chartData.pie_chart}

                    />

                </Paper>

            </Box>

        </DashboardLayout>

    );

}