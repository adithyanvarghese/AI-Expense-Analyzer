import { useEffect, useState } from "react";
import api from "../services/api";

function BudgetManager() {

    const [budgets, setBudgets] = useState([]);

    const [category, setCategory] = useState("");

    const [limit, setLimit] = useState("");

    const fetchBudgets = async () => {

        try {

            const response = await api.get("expenses/budgets/");

            setBudgets(response.data);

        }

        catch (error) {

            console.log(error.response?.data || error.message);

        }

    };

    useEffect(() => {

        fetchBudgets();

    }, []);

    const addBudget = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "expenses/budgets/",
                {
                category,
                monthly_budget: limit,
            }
        );

            setCategory("");

            setLimit("");

            fetchBudgets();

        }

        catch (error) {

            console.log(error.response?.data || error.message);

        }

    };

    const deleteBudget = async (id) => {

        await api.delete(`expenses/budgets/${id}/`);

        fetchBudgets();

    };

    return (

        <div
            style={{
                marginTop: "30px",
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
            }}
        >

            <h2>Monthly Budget</h2>

            <form onSubmit={addBudget}>

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Budget Limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    required
                    style={{ marginLeft: "10px" }}
                />

                <button
                    type="submit"
                    style={{ marginLeft: "10px" }}
                >
                    Save Budget
                </button>

            </form>

            <br />

            {

                budgets.length === 0 ?

                    (

                        <p>No budgets added.</p>

                    )

                    :

                    (

                        budgets.map((budget) => (

                            <div
                                key={budget.id}
                                style={{
                                    padding: "10px",
                                    marginBottom: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                }}
                            >

                                <strong>

                                    {budget.category}

                                </strong>

                                {" : ₹"}

                                {budget.monthly_budget}

                                <button

                                    style={{
                                        float: "right"
                                    }}

                                    onClick={() => deleteBudget(budget.id)}

                                >

                                    Delete

                                </button>

                            </div>

                        ))

                    )

            }

        </div>

    );

}

export default BudgetManager;