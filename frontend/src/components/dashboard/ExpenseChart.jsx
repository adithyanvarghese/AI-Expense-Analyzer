import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid

} from "recharts";

export default function ExpenseChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart
                data={data}
            >

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="month"/>

                <YAxis/>

                <Tooltip/>

                <Bar
                    dataKey="expense"
                    radius={[8,8,0,0]}
                />

            </BarChart>

        </ResponsiveContainer>

    );

}