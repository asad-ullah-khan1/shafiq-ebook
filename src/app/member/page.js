// app/member/page.js
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookReader from "../components/AsadBook";

const MemberPage = () => {
    const { data: session } = useSession();

    return (
        <div>
            <BookReader />
        </div>
    );
};

export default MemberPage;
