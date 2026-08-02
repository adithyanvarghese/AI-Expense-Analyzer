import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald
  "#A855F7", // Purple
  "#F59E0B", // Amber
  "#F43F5E", // Rose
  "#3B82F6", // Blue
  "#EC4899", // Pink
];

const CustomTooltip = ({ active, payload }) => {
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
          {payload[0].name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: payload[0].color || "#6366F1", fontWeight: 700 }}>
          ₹{payload[0].value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function CategoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={100}
          paddingAngle={4}
          cornerRadius={6}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="transparent"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span style={{ color: "#D1D5DB", fontSize: "0.85rem", fontWeight: 500 }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}