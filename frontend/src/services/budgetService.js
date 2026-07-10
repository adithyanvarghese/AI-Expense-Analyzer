import privateApi from "./privateApi";

// Get all budgets
export const getBudgets = async () => {
    const response = await privateApi.get("expenses/budgets/");
    return response.data;
};

// Create budget
export const createBudget = async (budget) => {
    const response = await privateApi.post("expenses/budgets/", budget);
    return response.data;
};

// Update budget
export const updateBudget = async (id, budget) => {
    const response = await privateApi.put(`expenses/budgets/${id}/`, budget);
    return response.data;
};

// Delete budget
export const deleteBudget = async (id) => {
    await privateApi.delete(`expenses/budgets/${id}/`);
};

// Budget status
export const getBudgetStatus = async () => {
    const response = await privateApi.get("expenses/budget-status/");
    return response.data;
};