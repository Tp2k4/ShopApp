import { useNavigate } from "react-router-dom";
interface ItemCardProps {
  productInfo: any;
}

const ItemCard = ({ productInfo }: ItemCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/user/home/${productInfo.category_id}/${productInfo.id}`);
  };
  return (
    <div
      className="items-center justify-start min-w-[200px] h-auto flex flex-col bg-white p-[var(--semi-medium-gap)] rounded-md border-[var(--line-color)] border shadow-sm hover:shadow-md transition-all duration-200 ease-in-out"
      onClick={handleClick}
    >
      <div className=" flex flex-col items-start justify-start w-full h-auto gap-[var(--small-gap)]">
        <img
          src={`http://localhost:8020/images/${productInfo.thumbnail}`}
          alt="Item"
          className="object-contain w-full aspect-[1/1] rounded-sm"
        />
        <div className="w-full min-h-[75px] overflow-visible font-semibold text-left break-words heading3">
          {productInfo.name}
        </div>

        <div className="flex items-end gap-[var(--small-gap)]">
          <div className="w-full font-semibold text-red-500 heading3">
            {productInfo.sellPrice.toLocaleString("vi-VN")}đ
          </div>
          <div className="w-full text-black opacity-[var(--caption-opacity)]  line-through decoration-[1px] body-text">
            {productInfo.price.toLocaleString("vi-VN")}
          </div>
        </div>

        {/* Tóm tắt mô tả kĩ thuật từng loại sản phẩm */}
        <div className="flex flex-wrap items-center justify-start bg-[var(--background-color)] rounded-md w-full gap-[var(--small-gap)] p-[var(--small-gap)] caption">
          {productInfo.category_id === "mouse" && (
            <div className="w-full opacity-[var(--caption-opacity)]">
              <div>
                <span className="font-bold">Max Dpi:</span>{" "}
                {productInfo.specs.maxDpi} dpi
              </div>
              <div>
                <span className="font-bold">Cân nặng:</span>{" "}
                {productInfo.specs.weight} g
              </div>
              <div>
                <span className="font-bold">Loại kết nối:</span>{" "}
                {productInfo.specs.connectionType}
              </div>
            </div>
          )}
          {productInfo.category_id === "keyboard" && (
            <div className="w-full opacity-[var(--caption-opacity)]">
              <div>
                <span className="font-bold">Loại switch:</span>{" "}
                {productInfo.specs.switchType}
              </div>
              <div>
                <span className="font-bold">Led:</span>{" "}
                {productInfo.specs.led ? "Có" : "Không"}
              </div>
              <div>
                <span className="font-bold">Loại kết nối:</span>{" "}
                {productInfo.specs.connectionType}
              </div>
            </div>
          )}
          {productInfo.category_id === "headphone" && (
            <div className="w-full opacity-[var(--caption-opacity)]">
              <div>
                <span className="font-bold">Có mic:</span>{" "}
                {productInfo.specs.hasMic ? "Có" : "Không"}
              </div>
              <div>
                <span className="font-bold">Khử tiếng ồn:</span>{" "}
                {productInfo.specs.noiseCancellation ? "Có" : "Không"}
              </div>
              <div>
                <span className="font-bold">Loại kết nối:</span>{" "}
                {productInfo.specs.connectionType}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
