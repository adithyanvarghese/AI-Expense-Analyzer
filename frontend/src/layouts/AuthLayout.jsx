import { Box, Paper, Typography, Container } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsightsIcon from "@mui/icons-material/Insights";
import SecurityIcon from "@mui/icons-material/Security";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      className="mesh-bg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justify: "center",
        py: 6,
        px: 2,
        position: "relative",
      }}
    >
      <div className="mesh-blob-1" />
      <div className="mesh-blob-2" />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* Left Hero Branding Section */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 3,
              pr: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)",
                }}
              >
                <AutoAwesomeIcon sx={{ color: "#FFF", fontSize: 28 }} />
              </Box>
              <Typography variant="h4" className="gradient-text">
                FinSight AI
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 800, leading: 1.2 }}>
              Smart Financial Intelligence Powered by AI
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
              Take full control of your personal finances with real-time tracking, AI receipt OCR scanning, and personalized budget recommendations.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: "rgba(99, 102, 241, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <InsightsIcon sx={{ color: "#6366F1", fontSize: 20 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Automated Category Predictions & ML Insights
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: "rgba(16, 185, 129, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ReceiptIcon sx={{ color: "#10B981", fontSize: 20 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Instant Receipt & Bank Statement Scanner
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    bgcolor: "rgba(168, 85, 247, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SecurityIcon sx={{ color: "#A855F7", fontSize: 20 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Secure JWT Token Authentication & Encrypted Storage
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Form Container */}
          <Paper
            className="glass-card"
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              maxWidth: 460,
              width: "100%",
              mx: "auto",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1.5,
                mb: 3,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  background: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AutoAwesomeIcon sx={{ color: "#FFF", fontSize: 22 }} />
              </Box>
              <Typography variant="h5" className="gradient-text">
                FinSight AI
              </Typography>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              {subtitle}
            </Typography>

            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}