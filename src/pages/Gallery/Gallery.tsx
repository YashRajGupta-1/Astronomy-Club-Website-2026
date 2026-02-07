import StarField from "@/components/common/StarField";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

const images: string[] = []
for (let i = 1; i <= 105; i++) {
  images.push(`/images/gallery/Photos/jpg/Image${i}.JPG`);
}
for (let i = 106; i <= 114; i++) {
  images.push(`/images/gallery/Photos/jpg/Image${i}.jpg`);
}
for (let i = 115; i <= 122; i++) {
  images.push(`/images/gallery/Photos/png/Image${i}.PNG`);
}
for (let i = 123; i <= 126; i++) {
  images.push(`/images/gallery/Photos/jpg/Image${i}.jpg`);
}


function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);


  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const closeOnOverlayClick = (e: React.MouseEvent) => {
    if (e.currentTarget.id === "default-modal") {
      closeModal();
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev !== null ? prev + 1 : 0) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev !== null ? prev - 1 : images.length - 1) % images.length
    );
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : 0
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : images.length - 1
        );
      }

      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);




  return (
    <div className="relative">
      <img src="/bg/bg_gallery.png" alt="bg_gallery" className="w-full h-screen fixed top-0 left-0 -z-10" />
      <StarField count={500} />
      <div
        className="relative container px-5 py-10 mx-auto"
      >

        <div className="flex flex-col text-center text-white w-full mb-10">
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-medium title-font mb-4 mt-4">
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
            <div key={index} className="p-2 hover:scale-105 transition-transform duration-300">
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
          className={`${isModalOpen ? "fixed" : "hidden"
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

              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                {selectedImageIndex + 1} / {images.length}
              </div>

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
    </div>
  );
}

export default Gallery;
