import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

const COLORS = [

    "#1976d2",

    "#ef5350",

    "#4caf50",

    "#ff9800",

    "#9c27b0"

];

export default function CategoryChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <PieChart>

                <Pie

                    data={data}

                    dataKey="value"

                    nameKey="name"

                    outerRadius={100}

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

            </PieChart>

        </ResponsiveContainer>

    );

}