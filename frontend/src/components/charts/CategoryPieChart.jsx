import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A855F7",
    "#EF4444",
    "#14B8A6",
    "#6366F1"
];

function CategoryPieChart({ data }) {

    return (

        <div
            style={{
                width: "100%",
                height: 400,
                background: "#fff",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
        >

            <h2>Category-wise Spending</h2>

            <ResponsiveContainer width="100%" height="90%">

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={130}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default CategoryPieChart;