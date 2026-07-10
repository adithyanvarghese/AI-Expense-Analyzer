import { useState } from "react";

import {
    Typography,
    Card,
    CardContent,
    Button,
    Box,
    CircularProgress,
    Grid,
    TextField,
    Alert
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from "@mui/icons-material/Save";

import DashboardLayout from "../layouts/DashboardLayout";

import { scanReceipt } from "../services/receiptService";
import { createExpense } from "../services/expenseService";

export default function ReceiptScanner() {

    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    const [receipt, setReceipt] = useState(null);

    const [saved, setSaved] = useState(false);

    async function handleScan() {

        if (!image) return;

        try {

            setLoading(true);

            const data = await scanReceipt(image);

            setReceipt(data.receipt);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function handleSave() {

        try {

            await createExpense({
                date: receipt.date,
                category: receipt.category,
                amount: receipt.amount,
                description: receipt.description
            });

            setSaved(true);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >

                Receipt Scanner

            </Typography>

            <Card>

                <CardContent>

                    <Button

                        component="label"

                        variant="outlined"

                        startIcon={<CameraAltIcon />}

                    >

                        Select Receipt

                        <input

                            hidden

                            type="file"

                            accept="image/*"

                            onChange={(e) =>

                                setImage(e.target.files[0])

                            }

                        />

                    </Button>

                    {image && (

                        <Typography mt={2}>

                            {image.name}

                        </Typography>

                    )}

                    <Box mt={3}>

                        <Button

                            variant="contained"

                            onClick={handleScan}

                        >

                            Scan Receipt

                        </Button>

                    </Box>

                    {loading && (

                        <Box mt={3}>

                            <CircularProgress />

                        </Box>

                    )}

                </CardContent>

            </Card>

            {receipt && (

                <Card sx={{ mt:4 }}>

                    <CardContent>

                        <Typography
                            variant="h5"
                            mb={3}
                        >

                            Receipt Details

                        </Typography>

                        <Grid container spacing={2}>

                            <Grid size={{ xs:12, md:6 }}>

                                <TextField

                                    fullWidth

                                    label="Date"

                                    value={receipt.date || ""}

                                />

                            </Grid>

                            <Grid size={{ xs:12, md:6 }}>

                                <TextField

                                    fullWidth

                                    label="Category"

                                    value={receipt.category || ""}

                                />

                            </Grid>

                            <Grid size={{ xs:12 }}>

                                <TextField

                                    fullWidth

                                    label="Description"

                                    value={receipt.description || ""}

                                />

                            </Grid>

                            <Grid size={{ xs:12 }}>

                                <TextField

                                    fullWidth

                                    label="Amount"

                                    value={receipt.amount || ""}

                                />

                            </Grid>

                        </Grid>

                        <Box mt={3}>

                            <Button

                                variant="contained"

                                startIcon={<SaveIcon />}

                                onClick={handleSave}

                            >

                                Save Expense

                            </Button>

                        </Box>

                        {saved && (

                            <Alert
                                severity="success"
                                sx={{ mt:3 }}
                            >

                                Expense Added Successfully

                            </Alert>

                        )}

                    </CardContent>

                </Card>

            )}

        </DashboardLayout>

    );

}