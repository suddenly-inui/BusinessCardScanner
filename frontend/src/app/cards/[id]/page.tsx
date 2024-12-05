//cards/[id]

"use client"

import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { fetchCard } from '@/api/fetchCard';
import Image from 'next/image';
import "@/app/cards/[id]/id.css"
import { cardMetadata } from '@/types/cards';
import { updateMetadata } from '@/api/updateMetadata';
import CardModal from '@/components/layouts/cardModal/cardModal';
import { deleteCard } from '@/api/deleteCard';


export default function Cards() {
    const router = useRouter()
    const username = "prod"
    const pathname = usePathname().split("/")[2]

    const [card, setCard] = useState<cardMetadata>({
        "user_id": "prod",
        "card_id": pathname,
        "name": "",
        "company": "",
        "jobtitle": "",
        "post": "",
        "tel": "",
        "email": "",
        "image_url": ""
    })
    const [editData, setEditData] = useState<cardMetadata>({
        "user_id": card.user_id,
        "card_id": card.card_id,
        "name": card.name,
        "company": card.company,
        "jobtitle": card.jobtitle,
        "post": card.post,
        "tel": card.tel,
        "email": card.email,
        "image_url": card.image_url
    })
    const [edit, setEdit] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [isImageLoaded, setisImageLoaded] = useState(false)

    const fetchData = async () => {
        const res = await fetchCard(username, pathname)
        const metadata = JSON.parse(res.metadata)

        setCard({
            "user_id": "prod",
            "card_id": pathname,
            "name": metadata["name"],
            "company": metadata["company"],
            "jobtitle": metadata["jobtitle"],
            "post": metadata["post"],
            "tel": metadata["tel"],
            "email": metadata["email"],
            "image_url": res["image_url"]
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const zoomImage = (e: any) => {
        //ズームしたいね
        console.log(e)
        setModalOpen(true)
    }

    const handleReturn = () => {
        router.push(`/cards`)
    }

    const handoleEdit = async () => {

        setEditData({
            "user_id": card.user_id,
            "card_id": card.card_id,
            "name": card.name,
            "company": card.company,
            "jobtitle": card.jobtitle,
            "post": card.post,
            "tel": card.tel,
            "email": card.email,
            "image_url": card.image_url
        })

        setEdit(!edit)
    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const nameattr = e.target.name
        //バリデーション
        if (nameattr == "tel") {
            const regex = /[^0-9-()]/
            if (regex.test(e.target.value)) {
                return
            }
        }

        setEditData({ ...editData, [nameattr]: e.target.value })
    }

    const sendMetadata = async () => {
        try {
            const res = await updateMetadata({ ...editData, image_url: "" })

            if (typeof res !== "string") {
                console.log(res)
                setCard({ ...res, image_url: card.image_url })
            } else {
                //エラー処理
                console.log("変なエラー")
            }

            setEdit(!edit)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async() => {
        await deleteCard(card.user_id, card.card_id)
        router.push("/cards")
    }

    const handleImageLoad = () => {
        setisImageLoaded(true)
    }

    return (
        <div>
            {card.image_url &&
                <>
                    <Image
                        className="one-card"
                        title={pathname}
                        src={card.image_url}
                        alt={pathname}
                        fill
                        onClick={zoomImage}
                        style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                        priority
                        onLoad={handleImageLoad}
                    />

                    {modalOpen &&
                        <CardModal isOpenModal={modalOpen} setIsOpenModal={setModalOpen} image={card.image_url} />
                    }

                    {edit ? (
                        <>
                            <form action="">
                                <input type="text" value={editData.name} onChange={changeValue} name="name" placeholder='名前' />
                                <input type="text" value={editData.company} onChange={changeValue} name="company" placeholder='勤め先' />
                                <input type="text" value={editData.jobtitle} onChange={changeValue} name="jobtitle" placeholder='部署' />
                                <input type="text" value={editData.post} onChange={changeValue} name="post" placeholder='役職' />
                                <input type="text" value={editData.tel} onChange={changeValue} name="tel" placeholder='電話番号' />
                                <input type="text" value={editData.email} onChange={changeValue} name="email" placeholder='メールアドレス' />
                            </form>
                        </>
                    ) : (
                        <>
                            <p>{card.name}</p>
                            <p>{card.company}</p>
                            <p>{card.jobtitle}</p>
                            <p>{card.post}</p>
                            <p>{card.tel}</p>
                            <p>{card.email}</p>
                        </>
                    )
                    }
                </>
            }
            <button onClick={handleReturn}>戻る</button>
            {
                edit ? (
                    <>
                        <button onClick={handoleEdit}>編集をやめる</button>
                        <button onClick={sendMetadata}>変更確定</button>
                    </>
                ) : (
                    <button onClick={handoleEdit}>編集</button>
                )
            }
            <button onClick={handleDelete}>名刺を削除</button>
        </div>
    );
}