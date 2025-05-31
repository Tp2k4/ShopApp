import { useState } from "react";
import sample from "../../assets/avatar/sample.jpg";
import sample2 from "../../assets/avatar/sample2.jpg";
import sample3 from "../../assets/avatar/sample3.jpg";
import sample4 from "../../assets/avatar/sample4.jpg";
import Icon from "../../shared/components/ui/DynamicIcon";

const images = [sample, sample2, sample3, sample4];

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="flex flex-col w-full max-w-xl gap-4 mx-auto">
      {/* Ảnh chính */}
      <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg aspect-video">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Ảnh ${index}`}
              className="flex-shrink-0 object-cover w-full h-full"
            />
          ))}
        </div>{" "}
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
    </div>
  );
}
