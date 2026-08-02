import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#F43F5E",
    },
    warning: {
      main: "#F59E0B",
    },
    info: {
      main: "#3B82F6",
    },
    success: {
      main: "#10B981",
    },
    background: {
      default: "#0B0F19",
      paper: "rgba(17, 24, 39, 0.75)",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#9CA3AF",
    },
    divider: "rgba(255, 255, 255, 0.08)",
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 600, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0B0F19",
          color: "#F9FAFB",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(17, 24, 39, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(17, 24, 39, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 8px 20px -6px rgba(99, 102, 241, 0.5)",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(99, 102, 241, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6366F1",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        },
        head: {
          fontWeight: 700,
          color: "#9CA3AF",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;