import Providers from "../../providers/Providers";
import Appbar from "./Appbar";


import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import SignoutButton from "../ui/SignoutButton";



export default async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <header className="flex gap-4 p-4 bg-gradient-to-b shadow">
            <div className="w-full flex flex-row justify-between">
                <Appbar />
                {session?.user ? <SignoutButton /> : null}
            </div>
        </header>
    );
}
