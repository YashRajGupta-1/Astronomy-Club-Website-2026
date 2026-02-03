import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

function Gallery({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const closeOnOverlayClick = (e) => {
    if (e.currentTarget.id === "default-modal") {
      closeModal();
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom Star Cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
          zIndex: 1000,
        }}
      >
        <img src={"/star.png"} alt="Star Cursor" width={30} height={30} />
      </div>

      <div
        className="bg-black container px-5 py-10 mx-auto"
        style={{ cursor: "none" }}
      >
        <div className="flex flex-col text-center text-white w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 mt-4">
            Our camera roll
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed">
            This gallery contains pictures from our victories at Inter-IIT and
            different colleges, Alumni meets, parties, orientations,
            workshops, and Astrophotography.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className="p-2">
              <button onClick={() => openModal(index)}>
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        <div
          id="default-modal"
          className={`${
            isModalOpen ? "fixed" : "hidden"
          } inset-0 z-50 flex items-center justify-center`}
          onClick={closeOnOverlayClick}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          {selectedImageIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-10">
              <button
                className="absolute left-5 text-white"
                onClick={prevImage}
              >
                <ChevronLeft size={80} />
              </button>

              <img
                src={images[selectedImageIndex]}
                alt={`Image ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              <button
                className="absolute right-5 text-white"
                onClick={nextImage}
              >
                <ChevronRight size={80} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Gallery;
