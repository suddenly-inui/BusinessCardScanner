//root

"use client"

import "@/app/cards/cards.css"
import React, { useState } from 'react';
import { uploadCards } from "@/api/uploadCards";
import { cardMetadata } from "@/types/cards";


export default function Home() {

    const [selectedImages, setSelectedImages] = useState<object[]>([]);
    const [fileLoaded, setFileLaded] = useState(false)
    const [fileUploaded, setFileUpLaded] = useState("yet")



    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof window !== "undefined") {

            const files: FileList | null = event.target.files
            if (files === null) {
                //ファイルがない場合
                console.log("no files")
                return
            }
            const jpgfiles: File[] = []

            for (let file of files) {
                console.log(file.name)

                // .heicファイル
                if (file["name"].endsWith(".heic")) {
                    const heic2any = require("heic2any");
                    const output = await heic2any({
                        blob: file,
                        toType: "image/jpeg",
                        quality: 0.7,
                    });

                    const newName = file.name.replace(/\.(heic|heif)$/i, "") + ".jpg";
                    jpgfiles.push(new File([output], newName, {
                        type: "image/jpeg",
                    }))

                    //.jpgファイル
                } else if (file["name"].endsWith(".jpg")) {
                    jpgfiles.push(file)
                }

                console.log(jpgfiles)
            }
            setSelectedImages(jpgfiles);
            setFileLaded(true)
        } else {
            console.log("cannot convert heic to jpg")
        }
    };

    // 画像をBase64に変換する関数
    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // 選択された画像をBase64に変換し、状態を更新
    const handleImageUpload = async () => {
        setFileUpLaded("pushed")
        const base64Images: string | any = await Promise.all(selectedImages.map(convertToBase64));
        for (let base64image of base64Images) {
            const uuid = crypto.randomUUID()
            const data: cardMetadata = {
                "user_id": "prod",
                "card_id": uuid,
                "name": "名前",
                "company": "企業名",
                "jobtitle": "部署名",
                "post": "役職",
                "email": "sample@email.com",
                "tel": "080-1234-5678",
                "image_url": base64image
            }
            console.log(data)
            await uploadCards(data)
            console.log("gawe")

            setTimeout(() => {
                setFileUpLaded("fin")
            }, 3000);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleImageChange} />

            {fileLoaded &&
                <>
                    <button onClick={handleImageUpload}>アップロード</button>
                    {fileUploaded==="pushed" &&
                        <>
                            <p>アップロード中</p>
                        </>
                    }
                    {fileUploaded==="fin" &&
                        <>
                            <p>アップロード完了</p>
                        </>
                    }
                </>
            }
        </div>
    );

}
