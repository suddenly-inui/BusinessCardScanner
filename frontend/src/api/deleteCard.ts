import "@/api/setting.ts"
import axios from "axios";


export const deleteCard = async (user_id: string, card_id: string) => {
    try {
        const response = await axios.delete(`https://ubd8awc3rb.execute-api.ap-northeast-1.amazonaws.com/prod/delete-card?user_id=${user_id}&card_id=${card_id}`);
        return response.data["body"]
    } catch (error) {
        console.error(error);
        return error
    }
};