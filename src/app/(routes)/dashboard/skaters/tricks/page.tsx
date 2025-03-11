
import ArcadeGameLevels from "@/components/levels";
import { highScore } from "../../../../../../data";
import { Button } from "@nextui-org/react";
import YouTubePlayer from "@/components/youtube";
/* export const medatada = {
    title: "tricks",
    description: "Información general",
}; */

export default function PorfilePage() {
    return (
        
        <div className="text-black">
            <ArcadeGameLevels />
            <YouTubePlayer />
        </div>
    );
}