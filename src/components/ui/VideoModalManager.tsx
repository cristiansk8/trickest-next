// app/components/VideoModalManager.tsx
"use client";

import { useState } from "react";
import HowToPlayButton from "./HowToPlayButton";
import VideoModal from "./VideoModal";

export default function VideoModalManager() {
    // Estado para controlar la visibilidad del modal
    const [openVideoModal, setOpenVideoModal] = useState(false);

    // Función para abrir/cerrar el modal
    const handleVideoModal = () => setOpenVideoModal(!openVideoModal);

    return (
        <>
            {/* Botón "Cómo jugar" */}
            <HowToPlayButton handleVideoModal={handleVideoModal} />

            {/* Modal del video */}
            <VideoModal openVideoModal={openVideoModal} handleVideoModal={handleVideoModal} />
        </>
    );
}