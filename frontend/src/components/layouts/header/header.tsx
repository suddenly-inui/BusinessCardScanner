'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/components/layouts/header/header.css"


export default function Header() {

    return (
        <>
        <header>
            <Link href="/" as="/">
                Home
            </Link>
            <Link href="/cards" as="/cards">
                Cards
            </Link>
        </header>
        </>
    );
}



