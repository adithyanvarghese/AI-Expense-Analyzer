import { Card, CardContent, Typography } from "@mui/material";

export default function DashboardCard({
    title,
    value,
    color
}) {
    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8
                }
            }}
        >
            <CardContent>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        mt: 1,
                        fontWeight: 700,
                        color
                    }}
                >
                    {value}
                </Typography>

            </CardContent>
        </Card>
    );
}