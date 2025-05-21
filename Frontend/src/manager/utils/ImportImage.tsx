import { useEffect } from "react";

interface ImportImageProps {
  imageURLs: string[];
  setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ImportImage = ({
  imageURLs,
  setImageURLs,
  setFiles,
}: ImportImageProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy các file ảnh từ input (thông qua e.target.files)
    const newFiles = event.target.files;

    if (newFiles) {
      // Thêm các ảnh mới vào files, để truyền files ảnh này về backend
      const filesArray = Array.from(newFiles);
      setFiles((prev) => [...prev, ...filesArray]);

      // Thêm URL mới vào, mục đích để hiển thị tạm thời các ô ảnh vuông bên dưới Popup
      const newUrls = Array.from(newFiles).map((newFile) =>
        URL.createObjectURL(newFile)
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
        onChange={(e) => handleImageChange(e)}
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
    </div>
  );
};

export default ImportImage;
