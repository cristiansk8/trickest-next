'use client'

import SkateProfileCompletionModal from "../sections/SkateProfileCompletionModal";


interface PageProps {
    openModal: boolean;
    handleModal: () => void;
}

const RegistrationModal = ({ openModal, handleModal }: PageProps) => {
    return (
        !openModal ? null : (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[9999]">
                Capa queda encima
                <SkateProfileCompletionModal openModal={openModal} handleModal={handleModal} />
            </div>
        )
    );
};

export default RegistrationModal;