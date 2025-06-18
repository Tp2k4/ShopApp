import CheckBox from "./CheckBox";
import { useEffect, useState } from "react";

interface CartItemsBarProps {
  setListCartItemsChecked: React.Dispatch<React.SetStateAction<any[]>>;
  index?: number;
  CartItemInfos: any;
  setCartItemsInfos: React.Dispatch<React.SetStateAction<any[]>>;
}

function CartItemsBar({
  setListCartItemsChecked,
  index,
  CartItemInfos,
  setCartItemsInfos,
}: CartItemsBarProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState<number>(CartItemInfos.quantity || 1);

  const handleCheck = () => {
    if (isChecked) {
      setIsChecked(false);
      setListCartItemsChecked((prev: any[]) =>
        prev.filter((item) => item.productId !== CartItemInfos.productId)
      );
      return;
    }
    setListCartItemsChecked((prev: any[]) => [
      ...prev,
      { ...CartItemInfos, quantity },
    ]);
    setIsChecked(true);
  };

  useEffect(() => {
    if (isChecked) {
      setListCartItemsChecked((prev: any[]) =>
        prev.map((item: any) => {
          if (item.productId === CartItemInfos.productId) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    }
  }, [quantity, isChecked]);

  return (
    <div className="flex flex-col p-[var(--medium-gap)] gap-[var(--small-gap)]">
      <div className="flex justify-start w-full gap-[var(--small-gap)]">
        <div className="w-[1/5] h-full">
          <div className="body-text">{index}.</div>
          <div className="flex flex-col items-center ">
            <div className="w-[100px] aspect-square rounded-md overflow-hidden ">
              <img
                src={CartItemInfos.productImageUrl}
                alt="product image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="body-text">{CartItemInfos.productName}</div>
        </div>

        <CheckBox
          checked={isChecked}
          onChange={handleCheck}
          className="w-full pl-[50px]"
        />
        <div className="flex flex-col w-[1/5]">
          <div className="text-right text-red-500 heading3">
            {CartItemInfos.sellPrice.toLocaleString("vi-VN")}đ
          </div>
          {CartItemInfos.sellPrice < CartItemInfos.price && (
            <div className="text-black opacity-[var(--caption-opacity)] body-text text-right line-through decoration-[1px]">
              {CartItemInfos.price.toLocaleString("vi-VN")}đ
            </div>
          )}
          {/* Thanh tăng giảm số lượng */}
          <div className="flex items-center justify-end gap-1 mt-2">
            <button
              onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => {
                const v = parseInt(e.target.value);
                if (!isNaN(v) && v > 0) setQuantity(v);
              }}
              className="w-12 h-8 text-center border border-gray-300 rounded outline-none"
            />
            <button
              onClick={() => setQuantity((q: number) => q + 1)}
              className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="pl-14 opacity-[var(--caption-opacity)] hover:underline hover:opacity-100 w-fit"
        onClick={async () => {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `https://gm-12tk.onrender.com/api/v1/gmshop/cart/user/${CartItemInfos.id}`,
            { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.ok) {
            setListCartItemsChecked((prev: any[]) =>
              prev.filter((item) => item.productId !== CartItemInfos.productId)
            );
            setCartItemsInfos((prev: any[]) =>
              prev.filter((item) => item.productId !== CartItemInfos.productId)
            );
            alert("Xoá sản phẩm thành công!");
          } else {
            alert("Xoá sản phẩm thất bại!");
          }
        }}
      >
        Xoá
      </button>
    </div>
  );
}

export default CartItemsBar;
