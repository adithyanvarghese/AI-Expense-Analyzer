import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Box,
    IconButton
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Navbar() {

    const username = localStorage.getItem("username") || "User";

    return (

        <AppBar
            position="static"
            color="inherit"
            elevation={1}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    sx={{ flexGrow: 1, fontWeight: "bold" }}
                >
                    Dashboard
                </Typography>

                <IconButton>

                    <NotificationsIcon />

                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        ml: 2,
                    }}
                >

                    <Typography>

                        {username}

                    </Typography>

                    <Avatar>

                        {username.charAt(0).toUpperCase()}

                    </Avatar>

                </Box>

            </Toolbar>

        </AppBar>

    );

}