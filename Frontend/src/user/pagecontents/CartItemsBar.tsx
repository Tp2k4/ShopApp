import CheckBox from "./CheckBox";
import { useState } from "react";

interface CartItemsBarProps {
  index?: number;
  CartItemsInfos: any;
}

function CartItemsBar({ index, CartItemsInfos }: CartItemsBarProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState<number>(CartItemsInfos.quantity || 1);
  return (
    <div className="flex flex-col p-[var(--medium-gap)] gap-[var(--small-gap)]">
      <div className="flex justify-start w-full gap-[var(--small-gap)]">
        <div className="body-text">{index}.</div>
        <div className="flex flex-col items-center ">
          <div className="w-[100px] aspect-square rounded-md overflow-hidden ">
            <img
              src={`http://localhost:8020/images/${CartItemsInfos.productImageUrl}`}
              alt="product image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="body-text">{CartItemsInfos.productName}</div>
        <CheckBox
          checked={isChecked}
          onChange={setIsChecked}
          className="pl-50 pr-125"
        />
        <div className="flex flex-col ">
          <div className="text-right text-red-500 heading3">
            {CartItemsInfos.price.toLocaleString("vi-VN")}đ
          </div>
          <div className="text-black opacity-[var(--caption-opacity)] body-text text-right line-through decoration-[1px]">
            {CartItemsInfos.originalPrice.toLocaleString("vi-VN")}đ
          </div>
          {/* Thanh tăng giảm số lượng */}
          <div className="flex items-center justify-end gap-1 mt-2">
            <button
              onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={e => {
                const v = parseInt(e.target.value);
                if (!isNaN(v) && v > 0) setQuantity(v);
              }}
              className="w-12 h-8 text-center border border-gray-300 rounded outline-none"
            />
            <button
              onClick={() => setQuantity((q: number) => q + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="pl-14">Xoá</div>
    </div>
  );
}

export default CartItemsBar;
