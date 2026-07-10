import { useEffect, useState } from "react";
import api from "../services/api";

function AIInsights() {

    const [analysis, setAnalysis] = useState("Loading AI analysis...");

    useEffect(() => {

        const fetchAnalysis = async () => {

            try {

                const response = await api.get("expenses/ai-analysis/");

                setAnalysis(response.data.analysis);

            } catch (error) {

                console.log(error);

                setAnalysis("Unable to generate AI insights.");

            }

        };

        fetchAnalysis();

    }, []);

    return (

        <div
            style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fafafa",
            }}
        >

            <h2>🤖 AI Financial Advisor</h2>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "inherit",
                    lineHeight: "1.7",
                }}
            >
                {analysis}
            </pre>

        </div>

    );

}

export default AIInsights;