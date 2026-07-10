import { useState, useEffect } from "react";
import api from "../services/api";

function AddExpense({
    onExpenseAdded,
    expenseToEdit,
    onUpdateComplete
}) {

    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [predicting, setPredicting] = useState(false);

    // Fill the form when editing
    useEffect(() => {

        if (expenseToEdit) {

            setDate(expenseToEdit.date);
            setCategory(expenseToEdit.category);
            setAmount(expenseToEdit.amount);
            setDescription(expenseToEdit.description);

        }

    }, [expenseToEdit]);

    const predictCategory = async () => {

        if (!description.trim()) {

            alert("Please enter a description first.");

            return;

        }

        try {

            setPredicting(true);

            const response = await api.post(
                "expenses/predict-category/",
                {
                    description: description
                }
            );

            setCategory(response.data.category);

        }

        catch (error) {

            console.log(error.response?.data || error.message);

            alert("Unable to predict category.");

        }

        finally {

            setPredicting(false);

        }

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // EDIT MODE
            if (expenseToEdit) {

                await api.put(
                    `expenses/${expenseToEdit.id}/`,
                    {
                        date,
                        category,
                        amount,
                        description,
                    }
                );

                alert("Expense Updated Successfully!");

                if (onUpdateComplete) {
                    onUpdateComplete();
                }

            }

            // ADD MODE
            else {

                await api.post(
                    "expenses/",
                    {
                        date,
                        category,
                        amount,
                        description,
                    }
                );

                alert("Expense Added Successfully!");

                if (onExpenseAdded) {
                    onExpenseAdded();
                }

            }

            // Clear form
            setDate("");
            setCategory("");
            setAmount("");
            setDescription("");

        }

        catch (error) {

            console.log(error.response?.data || error.message);

            alert("Operation Failed");

        }

    };

    return (

        <div
            style={{
                border: "1px solid gray",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
            }}
        >

            <h2>

                {expenseToEdit ?

                    "Edit Expense"

                    :

                    "Add Expense"

                }

            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <button
                    type="button"
                    onClick={predictCategory}
                    disabled={predicting}
                >

                    {

                        predicting

                            ?

                            "Predicting..."

                            :

                            "Predict Category"

                    }

                </button>

                <br /><br />

                <br /><br />

                <button type="submit">

                    {

                        expenseToEdit

                            ?

                            "Update Expense"

                            :

                            "Add Expense"

                    }

                </button>

            </form>

        </div>

    );

}

export default AddExpense;