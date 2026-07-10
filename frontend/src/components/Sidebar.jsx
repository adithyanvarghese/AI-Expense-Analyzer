import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 250;

export default function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/dashboard"
        },
        {
            text: "Expenses",
            icon: <ReceiptLongIcon />,
            path: "/expenses"
        },
        {
            text: "Budget",
            icon: <AccountBalanceWalletIcon />,
            path: "/budget"
        },
        {
            text: "Statement Upload",
            icon: <UploadFileIcon />,
            path: "/statement-upload"
        },
        {
            text: "Receipt Scanner",
            icon: <CameraAltIcon />,
            path: "/receipt-scanner"
        },
        {
            text: "AI Insights",
            icon: <PsychologyIcon />,
            path: "/ai"
        }
    ];

    function logout() {

        localStorage.clear();

        navigate("/login");

    }

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "#0f172a",
                    color: "white"
                }
            }}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    FinSight AI
                </Typography>

            </Toolbar>

            <Divider sx={{ background: "#334155" }} />

            <List>

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        selected={location.pathname === item.path}
                        sx={{
                            mx: 1,
                            mb: 1,
                            borderRadius: 2,
                            color: "white",

                            "&.Mui-selected": {
                                backgroundColor: "#2563eb",
                            },

                            "&.Mui-selected:hover": {
                                backgroundColor: "#2563eb",
                            },

                            "&:hover": {
                                backgroundColor: "#1e293b",
                            }
                        }}
                    >

                        <ListItemIcon
                            sx={{
                                color: "white",
                                minWidth: 40
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText primary={item.text} />

                    </ListItemButton>

                ))}

            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider sx={{ background: "#334155" }} />

            <List>

                <ListItemButton
                    onClick={logout}
                    sx={{
                        color: "white",
                        mx: 1,
                        mb: 2,
                        borderRadius: 2,

                        "&:hover": {
                            backgroundColor: "#dc2626"
                        }
                    }}
                >

                    <ListItemIcon
                        sx={{
                            color: "white",
                            minWidth: 40
                        }}
                    >
                        <LogoutIcon />
                    </ListItemIcon>

                    <ListItemText primary="Logout" />

                </ListItemButton>

            </List>

        </Drawer>

    );

}