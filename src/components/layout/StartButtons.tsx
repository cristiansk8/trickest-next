// app/components/Appbar.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import SigninButton from "../ui/SigninButton";
import SignoutButton from "../ui/SignoutButton";
import VideoModalManager from '../ui/VideoModalManager';

export default async function StartButtons() {

    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            {/* Componentes Cliente: Reciben la sesión como prop */}
            {session?.user ? null : <SigninButton />}
        </div>
    );
}