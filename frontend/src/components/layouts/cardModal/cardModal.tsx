import React, { useEffect, useRef } from "react";
import Image from 'next/image';

import "@/components/layouts/cardModal/cardModal.css"

export default function Modal({ isOpenModal, setIsOpenModal, image }: { isOpenModal: boolean, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>, image: string }) {

    // ---------------------------------------------
    // モーダル外をクリックした時の処理
    // ---------------------------------------------
    const modalRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpenModal(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, setIsOpenModal]);


    // ---------------------------------------------
    // モーダル表示中: 背面のスクロールを禁止
    // ---------------------------------------------
    useEffect(() => {
        if (isOpenModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isOpenModal]);

    return (
        <>
            {isOpenModal &&
                <div className="modal-container" ref={modalRef}>
                    <Image
                        className="modal-card"
                        title={""}
                        src={image}
                        alt={"a"}
                        fill />
                </div>
            }
        </>

    );
}