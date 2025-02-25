const HowToPlayButton: React.FC<{ handleVideoModal: () => void }> = ({ handleVideoModal }) => {//+
    return (
        <button
            onClick={handleVideoModal}
            className="bg-blue-600 text-white font-bold p-2 text-lg rounded-xl border-2hover:scale-110 transition-transform duration-300"
        >
            <div className="bg-blue-600 rounded-xl p-3 md:p-5 md:py-6 border-blue-700 border shadow-lg shadow-blue-800">
                Como jugar?
            </div>
        </button>
    );
};

export default HowToPlayButton;