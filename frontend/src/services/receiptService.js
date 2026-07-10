import privateApi from "./privateApi";

export const scanReceipt = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await privateApi.post(

        "expenses/scan-receipt/",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

};