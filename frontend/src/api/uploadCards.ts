import "@/api/setting.ts"
import axios from 'axios';
import { cardMetadata } from '@/types/cards';


export const uploadCards = async (data: cardMetadata) => {
    try {
        const response = await axios.post('https://ubd8awc3rb.execute-api.ap-northeast-1.amazonaws.com/prod/upload-card', data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

