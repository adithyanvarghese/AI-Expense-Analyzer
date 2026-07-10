import { Box, Paper, Typography } from "@mui/material";

export default function AuthLayout({ title, subtitle, children }) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f4f6f9",
                p: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: 420,
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    color="primary"
                    gutterBottom
                >
                    FinSight AI
                </Typography>

                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    AI Powered Expense Analyzer
                </Typography>

                <Typography
                    variant="h5"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    {subtitle}
                </Typography>

                {children}

            </Paper>
        </Box>
    );
}