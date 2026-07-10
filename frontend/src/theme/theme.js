import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "dark",

        primary: {
            main: "#6366F1",
        },

        secondary: {
            main: "#10B981",
        },

        background: {

            default: "#0F172A",

            paper: "#1E293B",

        },

    },

    typography: {

        fontFamily: "Poppins, sans-serif",

        h4: {

            fontWeight: 700,

        },

        h5: {

            fontWeight: 600,

        },

    },

    shape: {

        borderRadius: 12,

    }

});

export default theme;