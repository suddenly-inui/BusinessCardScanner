//cards

"use client"

import "@/app/cards/cards.css"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { fetchCards } from "@/api/fetchCards";
import { getCardKeys } from "@/api/getCardKeys";
import Image from "next/image";

export default function Cards() {
    const router = useRouter();

    const [cards, setCards] = useState([])
    const [keys, setKeys] = useState([])
    const [loadedImageIndex, setLoadedImageIndex] = useState<number[]>([])

    const fetchData = async () => {
        const data = await fetchCards()
        setCards(data)
    }

    useEffect(() => {
        fetchData()
        console.log(cards)
    }, [])

    const handleOnClick = (id: string) => {
        console.log(id)

        router.push(`/cards/${id}`)
    }

    const handleImageLoaded = (index: number) => {
        setLoadedImageIndex([...loadedImageIndex, index])
    }

    return (
        <>
            <div className="cards">
                {cards.map((image, index) => (
                    <div className="card-container" key={index}>
                        <Image
                            className="card"
                            title={`${image["id"]}`}
                            src={image["url"]}
                            alt={`${image["id"]}`}
                            fill
                            style={{ opacity: loadedImageIndex.includes(index) ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                            onClick={() => handleOnClick(image["id"])}
                            priority
                            onLoad={() => handleImageLoaded(index)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}