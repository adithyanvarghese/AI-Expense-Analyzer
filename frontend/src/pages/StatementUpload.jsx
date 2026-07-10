import { useState } from "react";

import {
    Button,
    Card,
    CardContent,
    Typography,
    Box,
    Alert,
    LinearProgress
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import DashboardLayout from "../layouts/DashboardLayout";

import privateApi from "../services/privateApi";

export default function StatementUpload() {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    function handleFileChange(e) {

        setFile(e.target.files[0]);

    }

    async function handleUpload() {

        if (!file) {

            setMessage("Please select a file");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);

            const response = await privateApi.post(

                "expenses/upload-statement/",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            setMessage(

    `✅ Statement Imported Successfully

    Transactions Imported : ${response.data.transactions_imported}

    Duplicates Skipped : ${response.data.duplicates_skipped}

    Your Dashboard has been updated.`

            );

        }

        catch (err) {

            console.log(err);

            setMessage("Upload Failed");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <DashboardLayout>

            <Typography

                variant="h4"

                fontWeight="bold"

                mb={3}

            >

                Upload Bank Statement

            </Typography>

            <Card>

                <CardContent>

                    <Typography mb={2}>

                        Upload your CSV or PDF bank statement.

                    </Typography>

                    <Button

                        component="label"

                        variant="outlined"

                        startIcon={<UploadFileIcon />}

                    >

                        Choose File

                        <input

                            hidden

                            type="file"

                            accept=".csv,.pdf"

                            onChange={handleFileChange}

                        />

                    </Button>

                    {file && (

                        <Typography mt={2}>

                            {file.name}

                        </Typography>

                    )}

                    <Box mt={3}>

                        <Button

                            variant="contained"

                            onClick={handleUpload}

                        >

                            Upload Statement

                        </Button>

                    </Box>

                    {loading && (

                        <Box mt={3}>

                            <LinearProgress />

                        </Box>

                    )}

                    {message && (

                        <Alert
                            severity="success"
                            sx={{ mt: 3 }}
                        >

                        <Typography
                            sx={{
                                whiteSpace: "pre-line"
                            }}
                        >

                        {message}

                        </Typography>

                        </Alert>

                    )}

                </CardContent>

            </Card>

        </DashboardLayout>

    );

}