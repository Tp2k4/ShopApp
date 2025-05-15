import { Button } from "../button";
import { useEffect } from "react";

interface ImportImageProps {
  imageURLs: string[];
  setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImportImage = ({ imageURLs, setImageURLs }: ImportImageProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Thêm URL mới vào danh sách URL cũ
      const newUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageURLs((prev) => [...prev, ...newUrls]);
    }
  };

  // Giải phóng khi component unmount
  useEffect(() => {
    return () => {
      imageURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageURLs]);

  return (
    <div className="flex flex-col gap-[var(--small-gap)]">
      <label
        htmlFor="file-upload"
        className="inline-block border border-[var(--secondary-color)] rounded px-2 py-1 cursor-pointer w-max"
      >
        Chọn ảnh
      </label>
      <input
        id="file-upload"
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div className="flex gap-[var(--small-gap)]">
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Ảnh ${index + 1}`}
            className="w-[100px] h-[100px] object-cover"
          />
        ))}
      </div>
      <div>
        <Button type="button" text="Thêm ảnh" />
      </div>
    </div>
  );
};

export default ImportImage;
