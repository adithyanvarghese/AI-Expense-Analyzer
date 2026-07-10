import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../layouts/DashboardLayout";

import ExpenseDialog from "../components/expenses/ExpenseDialog";
import ExpenseTable from "../components/expenses/ExpenseTable";
import DeleteDialog from "../components/expenses/DeleteDialog";

import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
} from "../services/expenseService";

export default function Expenses() {

    const [expenses, setExpenses] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedExpense, setSelectedExpense] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [snackbar, setSnackbar] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {
        loadExpenses();
    }, []);

    async function loadExpenses() {

        try {

            const data = await getExpenses();

            setExpenses(data);

        } catch (error) {

            console.log(error);

        }

    }

    async function handleSave(expense) {

        try {

            if (expense.id) {

                await updateExpense(expense.id, expense);

                setMessage("Expense Updated Successfully");

            }

            else {

                await createExpense(expense);

                setMessage("Expense Added Successfully");

            }

            setDialogOpen(false);

            setSelectedExpense(null);

            loadExpenses();

            setSnackbar(true);

        }

        catch (error) {

            console.log(error);

        }

    }

    function handleAdd() {

        setSelectedExpense(null);

        setDialogOpen(true);

    }

    function handleEdit(expense) {

        setSelectedExpense(expense);

        setDialogOpen(true);

    }

    function handleDelete(expense) {

        setSelectedExpense(expense);

        setDeleteOpen(true);

    }

    async function confirmDelete() {

        try {

            await deleteExpense(selectedExpense.id);

            setDeleteOpen(false);

            setSelectedExpense(null);

            loadExpenses();

            setMessage("Expense Deleted Successfully");

            setSnackbar(true);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <DashboardLayout>

            <Box

                display="flex"

                justifyContent="space-between"

                alignItems="center"

                mb={3}

            >

                <Typography

                    variant="h4"

                    fontWeight="bold"

                >

                    Expenses

                </Typography>

                <Button

                    variant="contained"

                    startIcon={<AddIcon />}

                    onClick={handleAdd}

                >

                    Add Expense

                </Button>

            </Box>

            <ExpenseTable

                expenses={expenses}

                onEdit={handleEdit}

                onDelete={handleDelete}

            />

            <ExpenseDialog

                open={dialogOpen}

                expense={selectedExpense}

                onClose={() => {

                    setDialogOpen(false);

                    setSelectedExpense(null);

                }}

                onSave={handleSave}

            />

            <DeleteDialog

                open={deleteOpen}

                onClose={() => setDeleteOpen(false)}

                onConfirm={confirmDelete}

            />

            <Snackbar

                open={snackbar}

                autoHideDuration={3000}

                onClose={() => setSnackbar(false)}

            >

                <Alert

                    severity="success"

                    variant="filled"

                >

                    {message}

                </Alert>

            </Snackbar>

        </DashboardLayout>

    );

}