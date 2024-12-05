import "@/api/setting.ts"
import axios from "axios";


export const fetchCards = async () => {
    try {
        const response = await axios.get('https://ubd8awc3rb.execute-api.ap-northeast-1.amazonaws.com/prod/fetch-cards');
        console.log(response.data);
        return response.data["body"]
    } catch (error) {
        console.error(error);
        return error
    }
};


