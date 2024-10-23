// app/member/page.js
"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const MemberPage = () => {
    const { data: session } = useSession();

    return (
        <div>
            <p>Email: {session?.user?.email}</p>
            <p>Username: {session?.user?.username}</p>
            <p>Role: {session?.user?.role}</p>
        </div>
    );
};

export default MemberPage;
