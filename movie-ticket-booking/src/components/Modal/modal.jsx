const Modal = ({ isOpen, onClose, trailerURL }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-800 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
  
            {/* YouTube Trailer */}
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailerURL}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };
export default Modal;  