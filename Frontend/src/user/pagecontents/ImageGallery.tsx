import { useState } from "react";
import Icon from "../../shared/components/ui/DynamicIcon";

interface ImageGalleryProps {
  imagesSource: Array<{ productId: number; imageUrl: string }>;
}

function ImageGallery({ imagesSource }: ImageGalleryProps) {
  const images =
    imagesSource?.map(
      (item) => item.imageUrl
    ) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full bg-gray-100 rounded-lg aspect-video">
        <span className="text-gray-500">Không có ảnh</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full max-w-xl gap-4 mx-auto">
      {/* Ảnh chính */}
      <div className="relative w-full overflow-hidden bg-white rounded-lg aspect-video">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-shrink-0 w-full h-full"
              style={{ minWidth: "100%" }}
            >
              <img
                src={img}
                alt={`Ảnh ${index + 1}`}
                className="object-contain max-w-full max-h-full"
                style={{
                  display: "block",
                  margin: "0 auto",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={prevImage}
          className="absolute left-0 flex items-center justify-center w-8 h-16 transition-all duration-300 -translate-y-1/2 rounded-r-full bg-[var(--background-color)]/60 top-1/2 hover:bg-[var(--background-color)]/80"
        >
          <span className="font-bold text-black">
            <Icon name="BiChevronLeft" size="24" />
          </span>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 flex items-center justify-center w-8 h-16 transition-all duration-300 -translate-y-1/2 bg-[var(--background-color)]/60 rounded-l-full  top-1/2 hover:bg-[var(--background-color)]/80"
        >
          <span className="font-bold text-black">
            <Icon name="BiChevronRight" size="24" />
          </span>
        </button>
      </div>{" "}
      {/* Thumbnail */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 aspect-square rounded overflow-hidden transition-all duration-300 ease-in-out border-2 hover:scale-105 ${
                index === currentIndex
                  ? "border-[var(--primary-color)] opacity-100 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`thumb-${index}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
