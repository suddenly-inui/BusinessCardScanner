import "@/api/setting.ts"
import axios from 'axios';
import { cardMetadata } from '@/types/cards';

type updateMetadataPayload = {
    "data": {
        "statusCode": number
        "body": cardMetadata
    }
}


export const updateMetadata = async (data: cardMetadata): Promise<cardMetadata | string> => {
    try {
        const response: updateMetadataPayload = await axios.post('https://ubd8awc3rb.execute-api.ap-northeast-1.amazonaws.com/prod/update-metadata', JSON.stringify(data));
        console.log({...response.data.body, image: ""})
        return {...response.data.body, image: ""}
    } catch (error) {
        console.log(error);
        return ""
    }
};

