import privateApi from "./privateApi";

export const getDashboardSummary = async () => {
    const response = await privateApi.get("expenses/dashboard/");
    return response.data;
};

export const getChartData = async () => {
    const response = await privateApi.get("expenses/chart-data/");
    return response.data;
};

export const getAIAnalysis = async () => {
    const response = await privateApi.get("expenses/ai-analysis/");
    return response.data;
};