import { CiTrophy } from "react-icons/ci";
import { IoIosTrophy } from "react-icons/io";
import { FaTrophy } from "react-icons/fa";



/* export const medatada = {
    title: "Logros",
    description: "Información general",
}; */

export default function PorfilePage() {
    return (
        <div className="text-black">
            <h1 className="mt-2 text-3xl">Logros</h1>

            

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div>
    <CiTrophy size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <IoIosTrophy  size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <FaTrophy size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <CiTrophy size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <IoIosTrophy  size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <FaTrophy size={150}/>
    <h2>Logro 1</h2>
    </div>    <div>
    <CiTrophy size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <IoIosTrophy  size={150}/>
    <h2>Logro 1</h2>
    </div>
    <div>
    <FaTrophy size={150}/>
    <h2>Logro 1</h2>
    </div>
</div>

        </div>
    );
}