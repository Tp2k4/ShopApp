import { useState } from "react";
import { Button } from "./";
import { useNavigate } from "react-router-dom";

interface AddItemsButtonProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  link?: string;
  productId: string;
  price: number;
  className?: string;
  text: string;
  [key: string]: any;
}

function AddItemsButton({
  setShowPopup,
  link,
  productId,
  price,
  text,
  className = "",
  ...rest
}: AddItemsButtonProps) {
  const token = localStorage.getItem("token") || "";
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const isLogin = token === "" ? false : true;

    if (!isLogin) {
      setShowPopup(true);
      return;
    }

    try {
      setIsAddingToCart(true);

      const cartItem = {
        product_id: productId,
        price: price,
        quantity: 1,
      };

      const response = await fetch(
        "https://gm-12tk.onrender.com/api/v1/gmshop/cart/user",
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

    if (link) {
      navigate(link);
    }
  };

  return (
    <Button
      type="button"
      text={text}
      onClick={handleAddToCart}
      disabled={isAddingToCart}
      {...rest}
    ></Button>
  );
}

export default AddItemsButton;
