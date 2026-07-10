import { useEffect, useState } from "react";
import api from "../services/api";

function BudgetStatus() {

    const [budgets, setBudgets] = useState([]);

    useEffect(() => {

        fetchBudgetStatus();

    }, []);

    const fetchBudgetStatus = async () => {

        try {

            const response = await api.get("expenses/budget-status/");

            setBudgets(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div
            style={{
                marginTop: "40px"
            }}
        >

            <h2>Budget Status</h2>

            {

                budgets.length === 0 ?

                    (

                        <p>No Budgets Added.</p>

                    )

                    :

                    (

                        budgets.map((budget, index) => (

                            <div

                                key={index}

                                style={{

                                    border: "1px solid #ddd",

                                    padding: "20px",

                                    marginBottom: "20px",

                                    borderRadius: "10px"

                                }}

                            >

                                <h3>{budget.category}</h3>

                                <p>

                                    Budget : ₹ {budget.budget}

                                </p>

                                <p>

                                    Spent : ₹ {budget.spent}

                                </p>

                                <p>

                                    Remaining : ₹ {budget.remaining}

                                </p>

                                <p>

                                    Used : {budget.percentage} %

                                </p>

                                <div
                                    style={{
                                        background: "#ddd",
                                        height: "20px",
                                        borderRadius: "10px",
                                        overflow: "hidden"
                                    }}
                                >

                                    <div

                                        style={{

                                            width: `${Math.min(budget.percentage,100)}%`,

                                            height: "100%",

                                            background:

                                                budget.status === "Over Budget"

                                                    ? "red"

                                                    : budget.status === "Near Limit"

                                                        ? "orange"

                                                        : "green"

                                        }}

                                    />

                                </div>

                                <br />

                                <strong>

                                    {budget.status}

                                </strong>

                            </div>

                        ))

                    )

            }

        </div>

    );

}

export default BudgetStatus;