import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    bgcolor: "#f4f6f9"
                }}
            >

                <Navbar />

                <Box sx={{ p: 3 }}>

                    {children}

                </Box>

            </Box>

        </Box>

    );

}