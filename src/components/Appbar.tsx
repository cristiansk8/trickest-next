import React from "react";
import SigninButton from "./SigninButton";
import Link from "next/link";
import { socialNetworks } from "../../data";



const Appbar = () => {
  return (
    <div className="flex items-center justify-center gap-7">
      <SigninButton />
      <div className="flex items-center justify-center gap-7">
                        {socialNetworks.map(({ logo, src, id }) => (
                            <Link
                                key={id}
                                href={src}
                                target="_blank"
                                className="transition-all duration-300 hover:text-watermelon"
                            >
                                {logo}
                            </Link>
                        ))}
                    </div>
    </div>
  );
};

export default Appbar;
