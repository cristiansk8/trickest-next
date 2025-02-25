'use client'
import { useState } from "react";
import RegistrationModal from "./RegistrationModal";

interface PageProps {
    isRegistered: boolean;
}
const UserProfileSection = ({ isRegistered }: PageProps) => {

    const [openModal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!openModal)
    }

    return (
        <div className="flex flex-col md:flex-row items-center gap-4">
            {
                isRegistered ? null :
                    (
                        <div>
                            <button
                                type="button"
                                className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                                onClick={handleModal}
                            >
                                Completar registro
                            </button>
                            <RegistrationModal openModal={openModal} handleModal={handleModal} />
                        </div>
                    )
            }
        </div>
    );
};

export default UserProfileSection;