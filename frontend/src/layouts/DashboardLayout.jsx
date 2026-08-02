import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0B0F19" }}>
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          width: { md: `calc(100% - 260px)` },
          bgcolor: "#0B0F19",
        }}
      >
        <Navbar onMenuClick={handleDrawerToggle} />

        <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flexGrow: 1, width: "100%", overflowX: "hidden" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}