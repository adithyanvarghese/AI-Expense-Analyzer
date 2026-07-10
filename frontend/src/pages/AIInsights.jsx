import { useEffect, useState } from "react";

import {
    Grid,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Button,
    Box
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import RefreshIcon from "@mui/icons-material/Refresh";

import DashboardLayout from "../layouts/DashboardLayout";

import { getAIInsights } from "../services/aiService";

export default function AIInsights() {

    const [loading, setLoading] = useState(true);

    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        loadAnalysis();
    }, []);

    async function loadAnalysis() {

        try {

            setLoading(true);

            const data = await getAIInsights();

            setAnalysis(data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <DashboardLayout>

                <Box
                    display="flex"
                    justifyContent="center"
                    mt={10}
                >

                    <CircularProgress />

                </Box>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <Box
                display="flex"
                justifyContent="space-between"
                mb={3}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >

                    AI Financial Advisor

                </Typography>

                <Button

                    variant="contained"

                    startIcon={<RefreshIcon />}

                    onClick={loadAnalysis}

                >

                    Refresh

                </Button>

            </Box>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Total Expense

                            </Typography>

                            <Typography
                                variant="h4"
                                color="error"
                            >

                                ₹{analysis.total_expense}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Highest Category

                            </Typography>

                            <Typography
                                variant="h4"
                                color="primary"
                            >

                                {analysis.highest_category}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography variant="h6">

                                Potential Savings

                            </Typography>

                            <Typography
                                variant="h4"
                                color="success.main"
                            >

                                ₹{analysis.potential_savings}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <Card>

                        <CardContent>

                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={2}
                            >

                                <PsychologyIcon
                                    color="primary"
                                />

                                <Typography
                                    variant="h5"
                                >

                                    AI Financial Analysis

                                </Typography>

                            </Box>

                            <Typography
                                sx={{
                                    whiteSpace: "pre-line",
                                    lineHeight: 1.8
                                }}
                            >

                                {analysis.analysis}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </DashboardLayout>

    );

}