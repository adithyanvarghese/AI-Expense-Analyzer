import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Box, Typography } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "rgba(15, 23, 42, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          p: 1.5,
          borderRadius: 2,
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        }}
      >
        <Typography variant="body2" sx={{ color: "#9CA3AF", fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#818CF8", fontWeight: 700 }}>
          Expense: ₹{payload[0].value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function ExpenseChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
            <stop offset="100%" stopColor="#A855F7" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" vertical={false} />
        <XAxis
          dataKey="month"
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={{ stroke: "rgba(255, 255, 255, 0.08)" }}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}
        />
        <YAxis
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="expense"
          fill="url(#barGradient)"
          radius={[8, 8, 0, 0]}
          barSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}