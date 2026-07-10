import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function ExpenseBarChart({ data }) {

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

            <h2>Monthly Expenses</h2>

            <ResponsiveContainer width="100%" height="90%">

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="expense"
                        fill="#4F46E5"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ExpenseBarChart;