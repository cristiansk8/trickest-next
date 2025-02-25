const VideoModal = ({ openVideoModal, handleVideoModal }) => {
    return (
        openVideoModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={handleVideoModal}
            >
                <div className="p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
                    <button
                        onClick={handleVideoModal}
                        className="absolute top-2 right-2 text-red-600 font-bold text-lg"
                    >
                        ✖
                    </button>

                    <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                        <video
                            className="w-full rounded-lg"
                            src="/demo.mp4"
                            autoPlay
                            controls
                            onEnded={handleVideoModal}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default VideoModal;