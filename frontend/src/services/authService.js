import publicApi from "./publicApi";

export const loginUser = async (data) => {

    const response = await publicApi.post(
        "accounts/login/",
        data
    );

    return response.data;

};

export const registerUser = async (data) => {

    const response = await publicApi.post(
        "accounts/register/",
        data
    );

    return response.data;

};