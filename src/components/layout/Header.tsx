"use client"
import Providers from "../../providers/Providers";
import MotionTransition from "../utils/transition-component";
import Appbar from "./Appbar";


const Header = () => {
    return (
        <MotionTransition position="bottom" className="absolute z-40 inline-block w-full top-5 md:top-10">
            <header className="flex gap-4 p-4 bg-gradient-to-b shadow">
                <Providers>
                    <Appbar />
                </Providers>
            </header>
        </MotionTransition>
    );
}

export default Header;