import privateApi from "./privateApi";

// Get all expenses
export const getExpenses = async () => {
    const response = await privateApi.get("expenses/");
    return response.data;
};

// Create expense
export const createExpense = async (expense) => {
    const response = await privateApi.post("expenses/", expense);
    return response.data;
};

// Update expense
export const updateExpense = async (id, expense) => {
    const response = await privateApi.put(`expenses/${id}/`, expense);
    return response.data;
};

// Delete expense
export const deleteExpense = async (id) => {
    await privateApi.delete(`expenses/${id}/`);
};

// Dashboard
export const getDashboardSummary = async () => {
    const response = await privateApi.get("expenses/dashboard/");
    return response.data;
};

// Charts
export const getChartData = async () => {
    const response = await privateApi.get("expenses/chart-data/");
    return response.data;
};