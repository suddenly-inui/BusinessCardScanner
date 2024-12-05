import "@/api/setting.ts"
import axios from "axios";


export const fetchCard = async (username: string, pathname: string) => {
    try {
        const response = await axios.get(`https://ubd8awc3rb.execute-api.ap-northeast-1.amazonaws.com/prod/fetch-card?username=${username}&pathname=${pathname}`);
        return response.data["body"]
    } catch (error) {
        console.error(error);
        return error
    }
};