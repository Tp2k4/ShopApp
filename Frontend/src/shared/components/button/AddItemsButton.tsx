import { useState } from "react";

interface AddItemsButtonProps {
  productId: string;
  price: number;
  className?: string;
}

function AddItemsButton({
  productId,
  price,
  className = "",
}: AddItemsButtonProps) {
  const token = localStorage.getItem("token") || "";
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);

      const cartItem = {
        product_id: productId,
        price: price,
        quantity: 1,
      };

      const response = await fetch(
        "http://localhost:8020/api/v1/gmshop/cart/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (response.ok) {
        alert("Đã thêm sản phẩm vào giỏ hàng!");
      } else {
        alert("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <button
      type="button"
      className={`bg-[var(--primary-color)] text-white hover:bg-blue-600 ${className}`}
      onClick={handleAddToCart}
      disabled={isAddingToCart}
    >
      {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
    </button>
  );
}

export default AddItemsButton;
