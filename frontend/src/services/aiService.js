import privateApi from "./privateApi";

export const getAIInsights = async () => {
    const response = await privateApi.get("expenses/ai-analysis/");
    return response.data;
};