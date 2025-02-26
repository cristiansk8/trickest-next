import UserProfileSection from "../ui/UserProfileSection";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { checkUserRegistration, getSkateByEmail } from "@/actions";
import Link from "next/link";
import Image from "next/image";

const Appbar = async () => {
  const session = await getServerSession(authOptions);
  let isRegistered = false;
  let skate = null;


  if (session?.user?.email) {
    const email = session.user.email;
    const result = await checkUserRegistration(email);
    isRegistered = result.registered;
    isRegistered ? skate = await getSkateByEmail(email) : null;
    console.log(email)
    console.log(skate)
  }

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {
        session?.user ?
          <>
            {/* Menu */}

            <Image
              src={skate?.photo || '/images/skateboard.png'}
              width={48}
              height={48}
              alt={session.user.name}
              className="w-12 h-12 rounded-full"
            />

            {/* Nickname */}
            <Link
              target="_blank"
              href={`/skate/${skate?.nickname}`
              } passHref>
              {skate?.nickname}
            </Link>
            <UserProfileSection isRegistered={isRegistered} />
          </>
          :
          <></>
      }
    </div>
  );
};

export default Appbar;